import { Router, Request, Response } from 'express';
import { DoctorAuthService } from '../services/doctorAuthService.js';
import { AppointmentService } from '../services/appointmentService.js';
import { requireDoctorAuth } from '../middleware/auth.js';
import { DoctorLoginSchema, ChangePasswordSchema, DoctorFormSchema, ScheduleUpdateSchema } from '../models/schemas.js';

export const doctorRoutes = Router();

// GET /Doctor/Login
doctorRoutes.get(['/Doctor/Login', '/doctor/login'], (req: Request, res: Response) => {
  if (req.session && req.session.doctor) {
    return res.redirect('/Doctor/Dashboard');
  }

  return res.render('doctor/login', {
    title: 'تسجيل دخول الكادر الطبي - دنتل سيتي',
    returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
    errors: [],
    usernameOrEmail: ''
  });
});

// POST /Doctor/Login
doctorRoutes.post(['/Doctor/Login', '/doctor/login'], async (req: Request, res: Response) => {
  const parsed = DoctorLoginSchema.safeParse(req.body);

  if (!parsed.success) {
    const errorMsgs = parsed.error.issues.map((e: { message: string }) => e.message);
    return res.status(400).render('doctor/login', {
      title: 'تسجيل دخول الكادر الطبي - دنتل سيتي',
      returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
      errors: errorMsgs,
      usernameOrEmail: (req.body.usernameOrEmail as string) || ''
    });
  }

  const { usernameOrEmail, password, rememberMe } = parsed.data;

  const result = await DoctorAuthService.validateDoctor(usernameOrEmail, password);

  if (!result.success) {
    return res.status(401).render('doctor/login', {
      title: 'تسجيل دخول الكادر الطبي - دنتل سيتي',
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
});

// POST /Doctor/Logout
doctorRoutes.all(['/Doctor/Logout', '/doctor/logout'], (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// GET /Doctor/Dashboard
doctorRoutes.get(['/Doctor/Dashboard', '/doctor/dashboard'], requireDoctorAuth, async (req: Request, res: Response) => {
  try {
    const doctors = await AppointmentService.getDoctors(true);
    const services = AppointmentService.getServices();
    const configuredSlots = AppointmentService.getConfiguredSlots();
    const recentBookings = await AppointmentService.getAllBookings();
    const emergencyPhone = AppointmentService.getEmergencyPhone();

    return res.render('doctor/dashboard', {
      title: 'لوحة التحكم وإدارة العيادة - دنتل سيتي',
      doctors,
      services,
      configuredSlots,
      recentBookings,
      emergencyPhone,
      doctorUser: req.session.doctor
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error loading dashboard data:', msg);
    return res.status(500).render('error', { message: 'تعذر تحميل بيانات لوحة التحكم' });
  }
});

// Unified POST dispatcher for /Doctor/Dashboard supporting ?handler=...
doctorRoutes.post(['/Doctor/Dashboard', '/doctor/dashboard'], requireDoctorAuth, async (req: Request, res: Response) => {
  const handler = (req.query.handler as string) || (req.body.handler as string);
  const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');

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
          scheduleSelectedSlots
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

    case 'UpdateEmergencyPhone': {
      const phone = req.body.EmergencyPhone;
      const success = AppointmentService.updateEmergencyPhone(phone);
      const msg = success
        ? `تم حفظ وتحديث رقم هاتف الاستفسارات العاجلة (${phone}) بنجاح.`
        : 'يرجى إدخال رقم هاتف صالح.';

      req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
      return res.redirect('/Doctor/Dashboard');
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
});
