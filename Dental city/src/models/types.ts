/**
 * Strongly-typed definitions for Dental City clinic management system
 * Defines domain models, database row schemas, and session types.
 */

export interface Doctor {
  id: number;
  name: string;
  title: string;
  specialty: string;
  climicroom?: string | null;
  experienceyears: number;
  PasswordHash?: string | null;
  workinghours: string;
  OffDays: number; // DayOfWeek: 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat
  AvaliableSlots: string[];
  Rating: number;
  AvatarIcon: string;
  IsActive: boolean;
  WorkingDays: string;
  morning_start?: string | null;
  morning_end?: string | null;
  evening_start?: string | null;
  evening_end?: string | null;
  active_days?: string | null;
  created_at?: string;
}

export interface Staff {
  id: number;
  name: string;
  role: string;
  phone: string;
  created_at?: string;
}

export interface Booking {
  id?: number;
  reference: string;
  doctor_id: number;
  doctor_name: string;
  doctor_specialty: string;
  patient_name: string;
  patient_phone: string;
  birth_date?: string | null;
  gender?: string | null;
  age?: number | null;
  patient_notes?: string | null;
  selected_service: string;
  appointment_date: string;
  appointment_time: string;
  status: 'مؤكد' | 'قيد الانتظار' | 'مكتمل' | 'ملغي';
  created_at?: string;
}

export interface AppointmentSlot {
  time: string;
  period: 'صباحي' | 'مسائي';
  isAvailable: boolean;
}

export interface PatientInfo {
  name: string;
  phone: string;
  birthDate?: string;
  gender?: 'ذكر' | 'أنثى';
  age?: number;
  notes?: string;
}

export interface DoctorScheduleResult {
  isWorkingDay: boolean;
  offDayReason?: string;
  slots: AppointmentSlot[];
}

export interface DoctorSessionUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

/**
 * Exact representation of raw rows in Supabase "Bookings" table
 */
export interface SupabaseBookingRow {
  id: number;
  created_at?: string;
  'patient name': string | null;
  phone: string | null;
  birth_date?: string | null;
  gender?: string | null;
  Age?: number | null;
  'booking date_time': string | null;
  heath_notes: string | null;
  'service name'?: string | null;
}

/**
 * Lightweight projection for slot availability checking (avoids memory overhead)
 */
export interface SupabaseBookingSlotRow {
  id: number;
  'booking date_time': string | null;
  heath_notes: string | null;
}

/**
 * Exact representation of raw rows in Supabase "Doctors" table
 */
export interface SupabaseDoctorRow {
  id: number;
  name: string;
  title: string;
  specialty: string;
  climicroom?: string | null;
  experienceyears: number;
  PasswordHash?: string | null;
  workinghours: string;
  OffDays: number;
  AvaliableSlots: string[] | string;
  Rating: number;
  AvatarIcon: string;
  IsActive: boolean;
  WorkingDays: string;
  'morning start'?: string | null;
  'morning end'?: string | null;
  'evening start'?: string | null;
  'evening end'?: string | null;
  'active days'?: string | null;
  morning_start?: string | null;
  morning_end?: string | null;
  evening_start?: string | null;
  evening_end?: string | null;
  active_days?: string | null;
  created_at?: string;
}

/**
 * Lightweight projection for doctor authentication
 */
export interface SupabaseDoctorAuthRow {
  id: number;
  name: string;
  PasswordHash: string | null;
  IsActive: boolean;
}

/**
 * Extension for express-session to guarantee compile-time type safety
 */
declare module 'express-session' {
  interface SessionData {
    doctor?: DoctorSessionUser;
    flashMessage?: {
      type: 'success' | 'danger' | 'warning' | 'info';
      text: string;
    };
  }
}
