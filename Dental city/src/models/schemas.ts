import { z } from 'zod';

/**
 * Validation Schemas using Zod matching Supabase database tables and forms
 */

export const DoctorFormSchema = z.object({
  id: z.coerce.number().optional().default(0),
  name: z.string().min(2, 'يرجى إدخال اسم الطبيب بشكل صحيح'),
  title: z.string().min(2, 'يرجى تحديد اللقب المهني للطبيب'),
  specialty: z.string().min(2, 'يرجى تحديد التخصص الطبي'),
  climicroom: z.string().optional().default('العيادة الرئيسية'),
  experienceyears: z.coerce.number().min(0).default(5),
  Rating: z.coerce.number().min(1).max(5).default(5.0),
  AvatarIcon: z.string().optional().default('bi-person-badge-fill'),
  IsActive: z.preprocess((val) => val === true || val === 'true' || val === 'on' || val === '1', z.boolean()).default(true),
  workinghours: z.string().optional().default('09:00 ص - 12:00 م | 12:00 م - 06:00 م'),
  WorkingDays: z.string().optional().default('السبت - الخميس (الجمعة إجازة)'),
  OffDays: z.coerce.number().min(0).max(6).default(5),
  PasswordHash: z.string().optional().nullable()
});

export const BookingFormSchema = z.object({
  doctorId: z.coerce.number().min(1, 'يرجى اختيار الطبيب المعالج من القائمة'),
  selectedService: z.string().min(2, 'يرجى اختيار الخدمة أو التخصص'),
  appointmentDate: z.string().min(5, 'يرجى اختيار تاريخ الموعد'),
  appointmentTime: z.string().min(3, 'يرجى اختيار وقت الموعد'),
  patientName: z.string().min(3, 'يرجى إدخال اسم المريض ثلاثياً'),
  patientPhone: z.string().regex(/^(01)[0-25][0-9]{8}$/, 'يرجى إدخال رقم هاتف محمول مصري صحيح (11 رقم)'),
  birthDate: z.string().min(4, 'يرجى إدخال تاريخ ميلاد المريض'),
  gender: z.string().refine((val): val is 'ذكر' | 'أنثى' => val === 'ذكر' || val === 'أنثى', {
    message: 'يرجى تحديد النوع (ذكر/أنثى)'
  }),
  patientNotes: z.string().optional().default(''),
  agreeTerms: z.preprocess((val) => val === true || val === 'true' || val === 'on', z.boolean()).refine(val => val === true, {
    message: 'يجب الموافقة على شروط وسياسة الحجز'
  })
});

export const DoctorLoginSchema = z.object({
  usernameOrEmail: z.string().min(1, 'يرجى إدخال اسم المستخدم أو البريد الإلكتروني'),
  password: z.string().min(1, 'يرجى إدخال كلمة المرور'),
  rememberMe: z.preprocess((val) => val === true || val === 'true' || val === 'on', z.boolean()).optional().default(false)
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'يرجى إدخال كلمة المرور الحالية'),
  newPassword: z.string().min(6, 'كلمة المرور الجديدة يجب ألا تقل عن 6 خانات'),
  confirmPassword: z.string().min(6, 'يرجى تأكيد كلمة المرور الجديدة')
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'كلمة المرور الجديدة وتأكيدها غير متطابقين'
});

export const ScheduleUpdateSchema = z.object({
  scheduleDoctorId: z.coerce.number().min(1, 'يرجى تحديد الطبيب'),
  scheduleWorkingHours: z.string().min(1, 'يرجى تحديد ساعات العمل'),
  scheduleWorkingDays: z.string().min(1, 'يرجى تحديد أيام الحضور والعمل'),
  scheduleOffDays: z.array(z.coerce.number()).optional().default([5]),
  scheduleSelectedSlots: z.array(z.string()).optional().default([])
});

export type DoctorFormData = z.infer<typeof DoctorFormSchema>;
export type BookingFormData = z.infer<typeof BookingFormSchema>;
export type DoctorLoginData = z.infer<typeof DoctorLoginSchema>;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
export type ScheduleUpdateData = z.infer<typeof ScheduleUpdateSchema>;
