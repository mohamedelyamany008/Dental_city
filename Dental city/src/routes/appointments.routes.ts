import { Router, Request, Response } from 'express';
import { AppointmentService } from '../services/appointmentService.js';
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
  try {
    const doctors = await AppointmentService.getDoctors();
    const services = AppointmentService.getServices();
    const emergencyPhone = AppointmentService.getEmergencyPhone();

    return res.render('appointments/book', {
      title: 'حجز موعد عيادة - دينتال سيتي (Dental City)',
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
        title: 'حجز موعد عيادة - دينتال سيتي (Dental City)',
        doctors,
        services,
        emergencyPhone,
        errors: formattedErrors,
        formData: req.body
      });
    }

    try {
      const booking = await AppointmentService.bookAppointment(parsed.data);
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
        title: 'حجز موعد عيادة - دينتال سيتي (Dental City)',
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

    return res.render('appointments/confirmation', {
      title: 'تأكيد حجز الموعد - دينتال سيتي (Dental City)',
      booking,
      emergencyPhone: AppointmentService.getEmergencyPhone()
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Confirmation page error:', msg);
    return res.status(500).render('error', { message: 'حدث خطأ أثناء عرض تأكيد الحجز.' });
  }
});

// GET /Patient/Portal (and /patient/portal, /Portal, /portal)
appointmentRoutes.get(['/Patient/Portal', '/patient/portal', '/Portal', '/portal'], async (_req: Request, res: Response) => {
  try {
    const doctors = await AppointmentService.getDoctors();
    const services = AppointmentService.getServices();
    const emergencyPhone = AppointmentService.getEmergencyPhone();
    const allBookings = await AppointmentService.getAllBookings();

    return res.render('patient/portal', {
      title: 'بوابة المريض - مركز دينتال سيتي',
      layout: 'layouts/dashboard',
      portalType: 'patient',
      doctors,
      services,
      emergencyPhone,
      allBookings
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Patient portal error:', msg);
    return res.status(500).render('error', { message: 'حدث خطأ أثناء عرض بوابة المريض.' });
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

// GET /Patient/Logout
appointmentRoutes.get(['/Patient/Logout', '/patient/logout'], (_req: Request, res: Response) => {
  return res.redirect('/');
});
