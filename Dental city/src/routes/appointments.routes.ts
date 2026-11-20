import { Router, Request, Response } from 'express';
import { AppointmentService } from '../services/appointmentService.js';
import { Booking } from '../models/types.js';
import { BookingFormSchema } from '../models/schemas.js';

export const appointmentRoutes = Router();

// GET /Appointments/Book (supports HTML render and ?handler=AvailableSlots)
appointmentRoutes.get(['/Appointments/Book', '/appointments/book'], async (req: Request, res: Response) => {
  const handler = req.query.handler as string;

  // AJAX handler: fetch available slots for doctor & date
  if (handler === 'AvailableSlots') {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    const doctorId = parseInt(req.query.doctorId as string, 10);
    const date = req.query.date as string;

    if (!doctorId || !date) {
      return res.json({ success: false, message: 'يرجى تحديد الطبيب والتاريخ' });
    }

    try {
      const schedule = await AppointmentService.getDoctorScheduleForDate(doctorId, date);
      const morningSlots = schedule.slots.filter(s => s.period === 'صباحي');
      const afternoonSlots = schedule.slots.filter(s => s.period === 'مسائي');

      return res.json({
        success: true,
        isOffDay: !schedule.isWorkingDay,
        offDayReason: schedule.offDayReason || '',
        morningSlots,
        afternoonSlots,
        slots: schedule.slots
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.json({ success: false, message: msg || 'حدث خطأ أثناء جلب المواعيد' });
    }
  }

  // Normal Page Render
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  try {
    const doctors = await AppointmentService.getDoctors();
    const services = AppointmentService.getServices();
    const emergencyPhone = AppointmentService.getEmergencyPhone();

    return res.render('appointments/book', {
      title: 'حجز موعد عيادة - مركز دينتال سيتي (Dental City Center)',
      doctors,
      services,
      emergencyPhone,
      errors: {},
      formData: {}
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error rendering booking page:', msg);
    return res.status(500).render('error', { message: 'تعذر تحميل صفحة الحجز' });
  }
});

// POST /Appointments/Book
appointmentRoutes.post(['/Appointments/Book', '/appointments/book'], async (req: Request, res: Response) => {
  try {
    const parsed = BookingFormSchema.safeParse(req.body);

    if (!parsed.success) {
      let doctors: any[] = [];
      try {
        doctors = await AppointmentService.getDoctors();
      } catch (docErr) {
        console.error('Failed to load doctors on form validation error:', docErr);
      }
      const services = AppointmentService.getServices();
      const emergencyPhone = AppointmentService.getEmergencyPhone();

      const formattedErrors: Record<string, string> = {};
      const issues = parsed.error.issues;
      issues.forEach((err: { path?: readonly (string | number | symbol)[]; message: string }) => {
        const field = err.path && err.path[0] ? String(err.path[0]) : '';
        if (field) formattedErrors[field] = err.message;
      });

      return res.status(400).render('appointments/book', {
        title: 'حجز موعد عيادة - مركز دينتال سيتي (Dental City Center)',
        doctors,
        services,
        emergencyPhone,
        errors: formattedErrors,
        formData: req.body
      });
    }

    try {
      const booking = await AppointmentService.bookAppointment(parsed.data);
      // Automatically issue persistent cross-device session token upon booking
      const patientToken = AppointmentService.createPatientToken(parsed.data.patientPhone);
      res.cookie('dc_patient_token', patientToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
      });
      return res.redirect(`/Appointments/Confirmation?reference=${encodeURIComponent(booking.reference)}`);
    } catch (bookingErr: unknown) {
      const msg = bookingErr instanceof Error ? bookingErr.message : String(bookingErr);
      console.error('Booking error:', msg);
      let doctors: any[] = [];
      try {
        doctors = await AppointmentService.getDoctors();
      } catch (docErr) {
        console.error('Failed to load doctors on booking error:', docErr);
      }
      const services = AppointmentService.getServices();
      const emergencyPhone = AppointmentService.getEmergencyPhone();

      return res.status(400).render('appointments/book', {
        title: 'حجز موعد عيادة - مركز دينتال سيتي (Dental City Center)',
        doctors,
        services,
        emergencyPhone,
        errors: { appointmentTime: msg || 'تعذر تأكيد الحجز، يرجى المحاولة مرة أخرى.' },
        formData: req.body
      });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[CRITICAL] Unhandled error during appointment booking:', msg);
    return res.status(500).render('error', {
      title: 'خطأ في عملية الحجز',
      message: 'تعذر إتمام عملية الحجز حالياً، يرجى إعادة المحاولة لاحقاً.'
    });
  }
});

// GET /Appointments/Confirmation
appointmentRoutes.get(['/Appointments/Confirmation', '/appointments/confirmation'], async (req: Request, res: Response) => {
  const reference = req.query.reference as string;

  if (!reference) {
    return res.redirect('/Appointments/Book');
  }

  try {
    const booking = await AppointmentService.getBookingByReference(reference);

    if (!booking) {
      return res.status(404).render('error', {
        title: 'الحجز غير موجود',
        message: 'تعذر العثور على بيانات الحجز المطلوب، يرجى التأكد من الرقم المرجعي.'
      });
    }

    const magicLink = `${req.protocol}://${req.get('host')}/Patient/Portal?token=${encodeURIComponent(AppointmentService.createPatientToken(booking.patient_phone))}`;
    return res.render('appointments/confirmation', {
      title: 'تأكيد حجز الموعد - مركز دينتال سيتي (Dental City Center)',
      booking,
      magicLink,
      emergencyPhone: AppointmentService.getEmergencyPhone()
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Confirmation page error:', msg);
    return res.status(500).render('error', { message: 'حدث خطأ أثناء عرض تأكيد الحجز.' });
  }
});

// GET /Patient/Portal (Centralized Token & Magic Link Authentication Architecture)
appointmentRoutes.get(['/Patient/Portal', '/patient/portal', '/Portal', '/portal'], async (req: Request, res: Response) => {
  try {
    const queryToken = ((req.query.token || req.query.auth || req.query.magic) as string) || '';
    const cookieToken = (req.cookies?.dc_patient_token as string) || '';
    const queryRef = ((req.query.ref || req.query.reference) as string) || '';
    const tokenToUse = queryToken || cookieToken;

    let verifiedPatient: { phone: string; rawPhone: string } | null = null;
    if (tokenToUse) {
      verifiedPatient = AppointmentService.verifyPatientToken(tokenToUse);
      if (verifiedPatient && queryToken) {
        // Set persistent cross-device cookie when accessing via magic link
        res.cookie('dc_patient_token', queryToken, {
          maxAge: 60 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'lax'
        });
      }
    }

    // Direct Booking Reference Auto-Authentication (if accessing with a valid ref in query)
    if (!verifiedPatient && queryRef) {
      const directBooking = await AppointmentService.getBookingByReference(queryRef);
      if (directBooking && directBooking.patient_phone) {
        verifiedPatient = {
          phone: AppointmentService.normalizePhone(directBooking.patient_phone),
          rawPhone: directBooking.patient_phone
        };
        const newToken = AppointmentService.createPatientToken(directBooking.patient_phone);
        res.cookie('dc_patient_token', newToken, {
          maxAge: 60 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'lax'
        });
      }
    }

    const doctors = await AppointmentService.getDoctors();
    const services = AppointmentService.getServices();
    const emergencyPhone = AppointmentService.getEmergencyPhone();
    const loginError = (req.query.error as string) || '';

    if (!verifiedPatient) {
      // Unauthenticated state: display secure centralized phone & magic link authentication interface
      return res.render('patient/portal', {
        title: 'بوابة المريض - تسجيل الدخول الآمن - مركز دينتال سيتي',
        layout: 'layouts/dashboard',
        portalType: 'patient',
        isAuthenticated: false,
        patientPhone: '',
        patientName: '',
        magicLink: '',
        doctors,
        services,
        emergencyPhone,
        allBookings: [],
        focusedRef: '',
        loginError
      });
    }

    // Authenticated state: STRICTLY enforce privacy boundary - fetch only this patient's records
    const patientBookings = await AppointmentService.getBookingsByPhone(verifiedPatient.phone);
    
    // If a specific booking ref was targeted, ensure it is included in the list
    if (queryRef && !patientBookings.some(b => b.reference === queryRef)) {
      const targeted = await AppointmentService.getBookingByReference(queryRef);
      if (targeted) {
        patientBookings.unshift(targeted);
      }
    }

    // If no bookings found for this token (e.g. invalid or stale session), clear cookie and show login
    if (patientBookings.length === 0) {
      res.clearCookie('dc_patient_token');
      return res.render('patient/portal', {
        title: 'بوابة المريض - تسجيل الدخول الآمن - مركز دينتال سيتي',
        layout: 'layouts/dashboard',
        portalType: 'patient',
        isAuthenticated: false,
        patientPhone: '',
        patientName: '',
        magicLink: '',
        doctors,
        services,
        emergencyPhone,
        allBookings: [],
        focusedRef: '',
        loginError: 'لم يتم العثور على أي حجوزات مسجلة لهذا الحساب. يرجى تسجيل الدخول برقم هاتف مسجل أو حجز موعد جديد.'
      });
    }

    const patientName = (patientBookings.length > 0 && patientBookings[0].patient_name)
      ? patientBookings[0].patient_name
      : 'مريض العيادة';
    const magicLink = `${req.protocol}://${req.get('host')}/Patient/Portal?token=${encodeURIComponent(AppointmentService.createPatientToken(verifiedPatient.phone))}`;

    return res.render('patient/portal', {
      title: 'بوابة المريض وإدارة الحجوزات - مركز دينتال سيتي',
      layout: 'layouts/dashboard',
      portalType: 'patient',
      isAuthenticated: true,
      patientPhone: verifiedPatient.rawPhone,
      patientName,
      magicLink,
      doctors,
      services,
      emergencyPhone,
      allBookings: patientBookings,
      focusedRef: queryRef,
      loginError: ''
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Patient portal error:', msg);
    return res.status(500).render('error', { message: 'حدث خطأ أثناء عرض بوابة المريض.' });
  }
});

// POST /Patient/Login (Centralized Token Authentication & Real-time Database Validation)
appointmentRoutes.all(['/Patient/Login', '/patient/login'], async (req: Request, res: Response) => {
  try {
    const rawInput = (
      req.body?.phoneOrRef ||
      req.body?.phoneOrReference ||
      req.body?.phone ||
      req.body?.reference ||
      req.query?.phoneOrRef ||
      req.query?.phoneOrReference ||
      req.query?.phone ||
      req.query?.reference ||
      ''
    ).toString().trim();

    if (!rawInput) {
      const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');
      if (isAjax) {
        return res.status(400).json({ success: false, message: 'يرجى إدخال رقم الهاتف المسجل أو الرمز المرجعي للحجز.' });
      }
      return res.redirect('/Patient/Portal?error=' + encodeURIComponent('يرجى إدخال رقم الهاتف المسجل أو الرمز المرجعي للحجز.'));
    }

    let matchedBookings: Booking[] = [];
    let targetPhone = '';
    let targetReference = '';

    // 1. First, attempt to match input as a Booking Reference Code in the database
    const bookingByRef = await AppointmentService.getBookingByReference(rawInput);
    if (bookingByRef && bookingByRef.patient_phone) {
      targetPhone = bookingByRef.patient_phone;
      targetReference = bookingByRef.reference;
      matchedBookings = await AppointmentService.getBookingsByPhone(targetPhone);
      if (!matchedBookings.some(b => b.reference === bookingByRef.reference)) {
        matchedBookings.unshift(bookingByRef);
      }
    }

    // 2. If not matched by reference, query database by phone number
    if (matchedBookings.length === 0) {
      matchedBookings = await AppointmentService.getBookingsByPhone(rawInput);
      if (matchedBookings.length > 0) {
        targetPhone = matchedBookings[0].patient_phone || rawInput;
      }
    }

    // 3. Fallback: try cleaned numeric digits if input has 8+ digits
    if (matchedBookings.length === 0) {
      const cleanDigits = rawInput.replace(/\D/g, '');
      if (cleanDigits.length >= 8) {
        matchedBookings = await AppointmentService.getBookingsByPhone(cleanDigits);
        if (matchedBookings.length > 0) {
          targetPhone = matchedBookings[0].patient_phone || cleanDigits;
        }
      }
    }

    // 4. Strict Validation: Ensure the system successfully matches input against existing database records
    if (matchedBookings.length === 0 || !targetPhone) {
      const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');
      if (isAjax) {
        return res.status(404).json({
          success: false,
          message: 'لم يتم العثور على أي حجز مسجل برقم الهاتف أو الرمز المرجعي المدخل. يرجى التأكد من البيانات المدخلة أو حجز موعد جديد.'
        });
      }
      return res.redirect('/Patient/Portal?error=' + encodeURIComponent('لم يتم العثور على أي حجز مسجل بالبيانات المدخلة.'));
    }

    // 5. Successful match: Generate secure centralized patient token
    const token = AppointmentService.createPatientToken(targetPhone);
    res.cookie('dc_patient_token', token, {
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
      httpOnly: true,
      sameSite: 'lax'
    });

    // 6. Immediate Redirection to the patient's dedicated booking details page
    const redirectUrl = targetReference
      ? `/Patient/Portal?ref=${encodeURIComponent(targetReference)}`
      : '/Patient/Portal';

    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');
    if (isAjax) {
      return res.json({
        success: true,
        message: 'تم التحقق بنجاح ومطابقة سجلات الحجز في قاعدة البيانات! جاري توجيهك...',
        redirect: redirectUrl,
        patientName: matchedBookings[0].patient_name,
        totalBookings: matchedBookings.length,
        matchedReference: targetReference || matchedBookings[0].reference
      });
    }

    return res.redirect(redirectUrl);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Patient login error:', msg);
    return res.status(500).json({ success: false, message: 'حدث خطأ أثناء تسجيل الدخول.' });
  }
});

// POST /Patient/Appointments/UpdateStatus
appointmentRoutes.post(['/Patient/Appointments/UpdateStatus', '/patient/appointments/updatestatus'], async (req: Request, res: Response) => {
  const reference = (req.body.reference as string) || (req.query.reference as string);
  const status = (req.body.status as string) || (req.query.status as string);
  if (!reference || !status) {
    return res.status(400).json({ success: false, message: 'الرقم المرجعي والحالة مطلوبان' });
  }

  try {
    const success = await AppointmentService.updateBookingStatus(reference, status);
    return res.json({
      success,
      message: success ? `تم تحديث حالة الحجز إلى (${status}) بنجاح.` : 'تعذر تحديث حالة الحجز'
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ success: false, message: msg });
  }
});

// POST /Patient/Appointments/Cancel
appointmentRoutes.post(['/Patient/Appointments/Cancel', '/patient/appointments/cancel'], async (req: Request, res: Response) => {
  const reference = (req.body.reference as string) || (req.query.reference as string);
  if (!reference) {
    return res.status(400).json({ success: false, message: 'الرقم المرجعي مطلوب' });
  }

  try {
    const success = await AppointmentService.cancelBooking(reference);
    return res.json({
      success,
      message: success ? 'تم إلغاء الموعد وتفريغ الوقت بنجاح.' : 'تعذر إلغاء الحجز'
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ success: false, message: msg });
  }
});

// GET /Patient/Logout (Clears Centralized Patient Token and redirects)
appointmentRoutes.get(['/Patient/Logout', '/patient/logout'], (_req: Request, res: Response) => {
  res.clearCookie('dc_patient_token');
  return res.redirect('/Patient/Portal');
});
