import { Router, Request, Response } from 'express';
import { DoctorAuthService } from '../services/doctorAuthService.js';
import { AppointmentService } from '../services/appointmentService.js';
import { requireDoctorAuth } from '../middleware/auth.js';
import { DoctorLoginSchema, ChangePasswordSchema, DoctorFormSchema, ScheduleUpdateSchema, StaffFormSchema } from '../models/schemas.js';

export const doctorRoutes = Router();

// GET /Doctor/Login
doctorRoutes.get(['/Doctor/Login', '/doctor/login'], (req: Request, res: Response) => {
  if (req.session && req.session.doctor) {
    return res.redirect('/Doctor/Dashboard');
  }

  return res.render('doctor/login', {
    title: 'تسجيل دخول الكادر الطبي - مركز دينتال سيتي',
    returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
    errors: [],
    usernameOrEmail: ''
  });
});

// POST /Doctor/Login
doctorRoutes.post(['/Doctor/Login', '/doctor/login'], async (req: Request, res: Response) => {
  try {
    const parsed = DoctorLoginSchema.safeParse(req.body);

    if (!parsed.success) {
      const errorMsgs = parsed.error.issues.map((e: { message: string }) => e.message);
      return res.status(400).render('doctor/login', {
        title: 'تسجيل دخول الكادر الطبي - مركز دينتال سيتي',
        returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
        errors: errorMsgs,
        usernameOrEmail: (req.body.usernameOrEmail as string) || ''
      });
    }

    const { usernameOrEmail, password, rememberMe } = parsed.data;

    const result = await DoctorAuthService.validateDoctor(usernameOrEmail, password);

    if (!result.success) {
      return res.status(401).render('doctor/login', {
        title: 'تسجيل دخول الكادر الطبي - مركز دينتال سيتي',
        returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
        errors: [result.errorMessage || 'بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.'],
        usernameOrEmail
      });
    }

    // Set session
    req.session.doctor = {
      id: result.doctorId || 1,
      name: result.doctorName,
      email: usernameOrEmail.trim(),
      role: result.role
    };

    if (rememberMe) {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    } else {
      req.session.cookie.maxAge = 8 * 60 * 60 * 1000; // 8 hours
    }

    const returnUrl = (req.query.returnUrl as string) || (req.body.returnUrl as string) || '/Doctor/Dashboard';
    const safeReturn = (returnUrl.startsWith('/') && !returnUrl.startsWith('//')) ? returnUrl : '/Doctor/Dashboard';
    return res.redirect(safeReturn);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Doctor login error:', msg);
    return res.status(500).render('doctor/login', {
      title: 'تسجيل دخول الكادر الطبي - مركز دينتال سيتي',
      returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
      errors: ['حدث خطأ أثناء معالجة تسجيل الدخول، يرجى المحاولة مرة أخرى لاحقاً.'],
      usernameOrEmail: (req.body.usernameOrEmail as string) || ''
    });
  }
});

// POST /Doctor/Logout
doctorRoutes.all(['/Doctor/Logout', '/doctor/logout'], (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// GET /Doctor/Dashboard
doctorRoutes.get(['/Doctor/Dashboard', '/doctor/dashboard'], requireDoctorAuth, async (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  try {
    const doctors = await AppointmentService.getDoctors(true);
    const staff = await AppointmentService.getStaff();
    const services = AppointmentService.getServices();
    const configuredSlots = AppointmentService.getConfiguredSlots();
    const recentBookings = await AppointmentService.getAllBookings();
    const emergencyPhone = AppointmentService.getEmergencyPhone();
    const shiftSettings = AppointmentService.getShiftSettings();

    return res.render('doctor/dashboard', {
      title: 'لوحة التحكم وإدارة العيادة - مركز دينتال سيتي',
      layout: 'layouts/dashboard',
      portalType: 'admin',
      doctors,
      staff,
      services,
      configuredSlots,
      recentBookings,
      emergencyPhone,
      shiftSettings,
      doctorUser: req.session.doctor,
      supabaseUrl: process.env.SUPABASE_URL || 'https://uwyyntbsvhqmrlthmgvn.supabase.co',
      supabaseKey: process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_MJntq3aqg2RNwM9cpqoeXQ_-oU2bIfr'
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error loading dashboard data:', msg);
    return res.status(500).render('error', { message: 'تعذر تحميل بيانات لوحة التحكم' });
  }
});

// Unified POST dispatcher for /Doctor/Dashboard supporting ?handler=...
doctorRoutes.post(['/Doctor/Dashboard', '/doctor/dashboard'], requireDoctorAuth, async (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const handler = (req.query.handler as string) || (req.body.handler as string);
  const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');

  try {
    switch (handler) {
      case 'ChangePassword': {
        const parsed = ChangePasswordSchema.safeParse(req.body);
        if (!parsed.success) {
          const msg = parsed.error.issues[0]?.message || 'بيانات كلمة المرور غير صالحة';
          return res.json({ success: false, message: msg });
        }

        const usernameOrEmail = req.session.doctor?.email || req.session.doctor?.name || 'admin';
        const result = await DoctorAuthService.changePassword(
          usernameOrEmail,
          parsed.data.currentPassword,
          parsed.data.newPassword
        );

        return res.json(result);
      }

      case 'SaveDoctor': {
        try {
          const parsed = DoctorFormSchema.safeParse(req.body);
          if (!parsed.success) {
            const msg = parsed.error.issues[0]?.message || 'بيانات الطبيب غير صالحة';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
            return res.redirect('/Doctor/Dashboard');
          }

          const saved = await AppointmentService.saveOrUpdateDoctor(parsed.data);
          const msg = `تم حفظ بيانات الطبيب (${saved.name}) بنجاح وانعكست فورياً على شاشة الحجز.`;

          if (isAjax) return res.json({ success: true, message: msg, doctor: saved });
          req.session.flashMessage = { type: 'success', text: msg };
          return res.redirect('/Doctor/Dashboard');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard');
        }
      }

      case 'DeleteDoctor': {
        const id = parseInt(req.body.id, 10);
        const success = await AppointmentService.deleteDoctor(id);
        const msg = success ? 'تم حذف الطبيب من قائمة العيادة بنجاح.' : 'تعذر العثور على الطبيب لحذفه.';

        if (isAjax) return res.json({ success, message: msg });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'UpdateDoctorSchedule': {
        try {
          const parsed = ScheduleUpdateSchema.safeParse({
            scheduleDoctorId: req.body.scheduleDoctorId,
            scheduleWorkingHours: req.body.scheduleWorkingHours,
            scheduleWorkingDays: req.body.scheduleWorkingDays,
            scheduleOffDays: Array.isArray(req.body.scheduleOffDays)
              ? req.body.scheduleOffDays
              : (req.body.scheduleOffDays ? [req.body.scheduleOffDays] : []),
            scheduleSelectedSlots: Array.isArray(req.body.scheduleSelectedSlots)
              ? req.body.scheduleSelectedSlots
              : (req.body.scheduleSelectedSlots ? [req.body.scheduleSelectedSlots] : [])
          });

          if (!parsed.success) {
            const msg = parsed.error.issues[0]?.message || 'بيانات الجدول غير صالحة';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
            return res.redirect('/Doctor/Dashboard');
          }

          const { scheduleDoctorId, scheduleWorkingHours, scheduleWorkingDays, scheduleOffDays, scheduleSelectedSlots } = parsed.data;
          const success = await AppointmentService.updateDoctorSchedule(
            scheduleDoctorId,
            scheduleWorkingHours,
            scheduleWorkingDays,
            scheduleOffDays,
            scheduleSelectedSlots,
            {
              morning_start: req.body.morning_start,
              morning_end: req.body.morning_end,
              evening_start: req.body.evening_start,
              evening_end: req.body.evening_end,
              active_days: req.body.active_days || scheduleWorkingDays
            }
          );

          const msg = success
            ? 'تم حفظ وتحديث جدول ساعات ومواعيد الطبيب بنجاح، وانعكس فورياً على شاشة الحجز للمرضى.'
            : 'تعذر العثور على الطبيب المحدد لتحديث جدوله.';

          if (isAjax) {
            return res.json({
              success,
              message: 'تم الحفظ بنجاح',
              detail: msg,
              doctorId: scheduleDoctorId,
              workingHours: scheduleWorkingHours,
              workingDays: scheduleWorkingDays,
              offDays: scheduleOffDays,
              availableSlots: scheduleSelectedSlots
            });
          }

          req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard');
        }
      }

      case 'AddSlot': {
        const time = req.body.newSlotTime;
        const period = req.body.newSlotPeriod;
        if (!time) {
          if (isAjax) return res.json({ success: false, message: 'يرجى إدخال وقت الموعد الجديد (مثال: 02:30 م).' });
          req.session.flashMessage = { type: 'danger', text: 'يرجى إدخال وقت الموعد الجديد.' };
          return res.redirect('/Doctor/Dashboard');
        }

        const success = AppointmentService.addSlot(time, period);
        const msg = success
          ? `تمت إضافة الموعد (${time} - ${period || 'افتراضي'}) لجدول المواعيد بنجاح.`
          : 'هذا الموعد موجود بالفعل في الجدول.';

        if (isAjax) return res.json({ success, message: msg, slotTime: time, slotPeriod: period });
        req.session.flashMessage = { type: success ? 'success' : 'warning', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'ToggleSlot': {
        const time = req.body.slotTime;
        const success = AppointmentService.toggleSlotAvailability(time);
        const slots = AppointmentService.getConfiguredSlots();
        const current = slots.find(s => s.time.toLowerCase() === (time || '').toLowerCase());
        const isAvailable = current ? current.isAvailable : true;
        const msg = isAvailable
          ? `تم تفعيل موعد (${time}) وإتاحته للحجز.`
          : `تم تعطيل موعد (${time}) مؤقتاً.`;

        if (isAjax) return res.json({ success, message: msg, slotTime: time, isAvailable });
        req.session.flashMessage = { type: 'success', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'DeleteSlot': {
        const time = req.body.slotTime;
        const success = AppointmentService.deleteSlot(time);
        const msg = success
          ? `تم إزالة وقت الموعد (${time}) من جدول العيادة بنجاح.`
          : 'تعذر العثور على الموعد لحذفه.';

        if (isAjax) return res.json({ success, message: msg, slotTime: time });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'GenerateSlots': {
        const interval = parseInt(req.body.intervalMinutes, 10) || 30;
        const slots = AppointmentService.generateStandardSlots(interval);
        AppointmentService.setGeneratedSlots(slots);
        const msg = `تم توليد ${slots.length} موعد بنجاح بفارق ${interval} دقيقة للفترتين (الصباحية 09:00 ص - 12:00 م والمسائية 12:00 م - 06:00 م).`;

        if (isAjax) {
          return res.json({
            success: true,
            message: msg,
            count: slots.length,
            intervalMinutes: interval,
            slots
          });
        }
        req.session.flashMessage = { type: 'success', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'AddService': {
        const service = req.body.newService;
        if (!service || !service.trim()) {
          req.session.flashMessage = { type: 'danger', text: 'يرجى كتابة اسم التخصص أو الخدمة الجديدة.' };
          return res.redirect('/Doctor/Dashboard');
        }

        const success = AppointmentService.addService(service);
        const msg = success
          ? `تم إضافة الخدمة (${service}) بنجاح إلى قائمة خدمات العيادة.`
          : 'هذه الخدمة موجودة بالفعل بقائمة الخدمات.';

        req.session.flashMessage = { type: success ? 'success' : 'warning', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'DeleteService': {
        const service = req.body.serviceName;
        AppointmentService.deleteService(service);
        req.session.flashMessage = { type: 'success', text: `تم حذف الخدمة (${service}) من قائمة الحجز.` };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'UpdateBookingStatus': {
        const reference = req.body.bookingRef;
        const status = req.body.newStatus;
        const success = await AppointmentService.updateBookingStatus(reference, status);
        const msg = `تم تحديث حالة الحجز (${reference}) إلى: ${status}.`;

        if (isAjax) return res.json({ success, status, message: msg, reference });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard#bookings-panel');
      }

      case 'CancelBooking': {
        const reference = req.body.bookingRef;
        const success = await AppointmentService.cancelBooking(reference);
        const msg = success
          ? `تم إلغاء الموعد (${reference}) بنجاح في قاعدة البيانات وتفريغ وقت الحجز في جدول المواعيد.`
          : 'تعذر إلغاء الموعد.';

        if (isAjax) return res.json({ success, status: 'ملغي', message: msg, reference });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard#bookings-panel');
      }

      case 'DeleteBooking': {
        const reference = req.body.bookingRef;
        const success = await AppointmentService.deleteBooking(reference);
        const msg = success
          ? `تم حذف الحجز (${reference}) نهائياً من قاعدة البيانات وتفريغ الموعد.`
          : 'تعذر حذف الحجز.';

        if (isAjax) return res.json({ success, message: msg, reference });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard#bookings-panel');
      }

      case 'UpdatePermissions': {
        try {
          const { id, type, role, isActive } = req.body;
          const memberId = Number(id || 0);
          const roleTitle = role || 'Doctor';
          const msg = `تم تحديث مستوى صلاحيات ودور (${roleTitle}) بنجاح.`;
          if (isAjax) {
            return res.json({
              success: true,
              message: msg,
              id: memberId,
              type: type || 'doctor',
              role: roleTitle,
              isActive: isActive === 'true' || isActive === true || isActive === 'on'
            });
          }
          req.session.flashMessage = { type: 'success', text: msg };
          return res.redirect('/Doctor/Dashboard#staff-panel');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard#staff-panel');
        }
      }

      case 'UpdateShiftSettings': {
        try {
          const { morningStart, morningEnd, eveningStart, eveningEnd, intervalMinutes } = req.body;
          AppointmentService.updateShiftSettings({
            morningStart,
            morningEnd,
            eveningStart,
            eveningEnd,
            intervalMinutes: intervalMinutes ? Number(intervalMinutes) : 60
          });
          const updated = AppointmentService.getShiftSettings();
          const slots = AppointmentService.getConfiguredSlots();
          const msg = `تم تحديث وتخصيص أوقات الورديات بنجاح (صباحي: ${updated.morningStart} - ${updated.morningEnd} | مسائي: ${updated.eveningStart} - ${updated.eveningEnd}).`;
          if (isAjax) {
            return res.json({ success: true, message: msg, shiftSettings: updated, configuredSlots: slots });
          }
          req.session.flashMessage = { type: 'success', text: msg };
          return res.redirect('/Doctor/Dashboard#settings-panel');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard#settings-panel');
        }
      }

      case 'UpdateSettings':
      case 'UpdateEmergencyPhone': {
        const phone = req.body.EmergencyPhone;
        let success = true;
        if (phone) {
          success = AppointmentService.updateEmergencyPhone(phone);
        }
        if (req.body.morningStart || req.body.eveningStart) {
          AppointmentService.updateShiftSettings({
            morningStart: req.body.morningStart,
            morningEnd: req.body.morningEnd,
            eveningStart: req.body.eveningStart,
            eveningEnd: req.body.eveningEnd,
            intervalMinutes: req.body.intervalMinutes ? Number(req.body.intervalMinutes) : undefined
          });
        }
        const msg = success
          ? `تم حفظ وتأمين إعدادات الحساب ورقم الاستفسارات (${phone || 'المعتمد'}) بنجاح.`
          : 'يرجى إدخال رقم هاتف صالح.';

        if (isAjax) {
          return res.json({
            success,
            message: msg,
            emergencyPhone: phone,
            shiftSettings: AppointmentService.getShiftSettings()
          });
        }
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard#settings');
      }

      case 'QuickBook': {
        try {
          const { patientName, patientPhone, doctorId, service, appointmentDate, appointmentTime, notes } = req.body;
          if (!patientName || !patientPhone || !doctorId || !service || !appointmentDate || !appointmentTime) {
            return res.json({ success: false, message: 'يرجى استكمال جميع بيانات الحجز الإلزامية.' });
          }
          const booking = await AppointmentService.bookAppointment({
            patientName,
            patientPhone,
            doctorId: parseInt(doctorId, 10),
            selectedService: service,
            appointmentDate,
            appointmentTime,
            patientNotes: notes || 'حجز مباشر من لوحة الإدارة'
          });
          return res.json({
            success: true,
            message: `تم تسجيل وتأكيد الحجز بنجاح برقم مرجعي (${booking.reference}).`,
            booking
          });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          return res.json({ success: false, message: msg || 'تعذر تسجيل الحجز في قاعدة البيانات' });
        }
      }

      case 'AddStaff': {
        try {
          const parsed = StaffFormSchema.safeParse(req.body);
          if (!parsed.success) {
            const msg = parsed.error.issues[0]?.message || 'يرجى إدخال جميع بيانات الموظف (الاسم، الدور، ورقم الهاتف).';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
            return res.redirect('/Doctor/Dashboard#staff');
          }
          const { name, role, phone } = parsed.data;
          const savedStaff = await AppointmentService.addStaff({ name, role, phone });
          const msg = `تمت إضافة الموظف (${savedStaff.name}) وتفعيل حسابه في قاعدة البيانات بنجاح.`;
          if (isAjax) return res.json({ success: true, message: msg, staff: savedStaff });
          req.session.flashMessage = { type: 'success', text: msg };
          return res.redirect('/Doctor/Dashboard#staff');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard#staff');
        }
      }

      case 'DeleteStaff': {
        try {
          const staffId = Number(req.body.id || req.body.staffId || req.query.id);
          if (!staffId || isNaN(staffId)) {
            const msg = 'معرّف الموظف غير صالح.';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
            return res.redirect('/Doctor/Dashboard#staff');
          }

          const deleted = await AppointmentService.deleteStaff(staffId);
          if (deleted) {
            const msg = 'تم حذف الموظف من قاعدة البيانات بنجاح.';
            if (isAjax) return res.json({ success: true, message: msg, staffId });
            req.session.flashMessage = { type: 'success', text: msg };
          } else {
            const msg = 'تعذر حذف الموظف أو أنه غير موجود.';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
          }
          return res.redirect('/Doctor/Dashboard#staff');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard#staff');
        }
      }

      case 'Logout': {
        req.session.destroy(() => {
          res.redirect('/');
        });
        return;
      }

      default: {
        if (isAjax) return res.json({ success: false, message: 'إجراء غير معروف' });
        return res.redirect('/Doctor/Dashboard');
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[CRITICAL] Error in Dashboard action (${handler}):`, msg);
    if (isAjax) {
      return res.status(500).json({ success: false, message: 'حدث خطأ في تنفيذ العملية، يرجى إعادة المحاولة لاحقاً.' });
    }
    req.session.flashMessage = { type: 'danger', text: 'حدث خطأ أثناء معالجة العملية.' };
    return res.redirect('/Doctor/Dashboard');
  }
});
