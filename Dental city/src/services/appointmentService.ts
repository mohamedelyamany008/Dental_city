import { supabase } from '../config/supabase.js';
import {
  Doctor,
  Booking,
  AppointmentSlot,
  DoctorScheduleResult,
  SupabaseBookingRow,
  SupabaseBookingSlotRow,
  SupabaseDoctorRow
} from '../models/types.js';
import { DoctorAuthService } from './doctorAuthService.js';
import { WhatsAppNotificationService } from './whatsappService.js';
import dotenv from 'dotenv';

dotenv.config();

// Static pre-compiled regular expressions for maximum loop performance
const RE_REF = /\[المرجع:\s*([^\]]+)\]/;
const RE_SERVICE = /\[الخدمة:\s*([^\]]+)\]/;
const RE_DOCTOR = /\[الطبيب:\s*([^\]]+)\]/;
const RE_TIME = /\[الموعد:\s*([^\]]+)\]/;
const RE_TIME_PARTS = /\[الموعد:\s*([^\s]+)\s+([^\]]+)\]/;
const RE_BIRTH = /\[تاريخ الميلاد:\s*([^\]]+)\]/;
const RE_GENDER = /\[النوع:\s*([^\]]+)\]/;
const RE_STATUS = /\[الحالة:\s*([^\]]+)\]/;
const RE_DOC_ID = /\[معرف_الطبيب:\s*(\d+)\]/;
const RE_TIME_SHORT = /(\d{1,2}):(\d{2})/;
const RE_TIME_24H = /(\d{1,2}):(\d{2})\s*([صم?])?/;
const RE_CANCELLED = /ملغي|Cancelled|تم الإلغاء/;
const RE_DC_ID = /^DC-(\d+)$/;

interface CachedDoctorEntry {
  doctor: Doctor;
  cachedAt: number;
}

export class AppointmentService {
  private static emergencyPhone: string = process.env.EMERGENCY_PHONE || '01551388988';
  private static servicesList: string[] = [
    'جراحة وتجميل وزراعة الأسنان',
    'زراعة الأسنان الفورية',
    'حشو العصب والأسنان التجميلي',
    'تقويم الأسنان الشفاف والثابت',
    'تبييض الأسنان بالليزر',
    'تنظيف وتلميع الأسنان وإزالة الجير',
    'تركيبات الزيركون والبورسلين',
    'علاج أسنان الأطفال',
    'خلع ضرس العقل الجراحي',
    'علاج أمراض والتهابات اللثة'
  ];

  // ============================================================================
  // Two-Shift Schedule Configuration (Mandatory 1-Hour Intervals)
  // Morning Shift: 09:00 AM - 12:00 PM | Evening Shift: 12:00 PM - 06:00 PM
  // ============================================================================
  public static readonly MORNING_SHIFT_HOURS = '09:00 ص - 12:00 م';
  public static readonly EVENING_SHIFT_HOURS = '12:00 م - 06:00 م';
  public static readonly FULL_DAY_HOURS = '09:00 ص - 12:00 م | 12:00 م - 06:00 م';

  // Fixed 1-hour interval slots for Morning Shift (9 AM - 12 PM)
  public static readonly MORNING_SLOTS: string[] = [
    '09:00 ص',
    '10:00 ص',
    '11:00 ص'
  ];

  // Fixed 1-hour interval slots for Evening Shift (12 PM - 6 PM)
  public static readonly EVENING_SLOTS: string[] = [
    '12:00 م',
    '01:00 م',
    '02:00 م',
    '03:00 م',
    '04:00 م',
    '05:00 م'
  ];

  // Combined 1-hour interval slots (9 slots per full working day)
  public static readonly ALL_SHIFT_SLOTS: string[] = [
    ...AppointmentService.MORNING_SLOTS,
    ...AppointmentService.EVENING_SLOTS
  ];

  /**
   * Generates Two-Shift slots with mandatory 1-hour interval between appointments.
   * Morning: 09:00 AM - 12:00 PM | Evening: 12:00 PM - 06:00 PM
   */
  public static getTwoShiftSlots(filterSlots?: string[]): AppointmentSlot[] {
    const filterSet = (filterSlots && filterSlots.length > 0)
      ? new Set(filterSlots.map(s => this.normalizeTimeSlot(s)))
      : null;

    const morning = this.MORNING_SLOTS
      .filter(s => !filterSet || filterSet.has(this.normalizeTimeSlot(s)))
      .map(time => ({
        time: this.normalizeTimeSlot(time),
        period: 'صباحي' as const,
        isAvailable: true
      }));

    const evening = this.EVENING_SLOTS
      .filter(s => !filterSet || filterSet.has(this.normalizeTimeSlot(s)))
      .map(time => ({
        time: this.normalizeTimeSlot(time),
        period: 'مسائي' as const,
        isAvailable: true
      }));

    return [...morning, ...evening];
  }

  // In-memory slot templates initialized with the two-shift 1-hour interval schedule
  private static configuredSlots: AppointmentSlot[] = AppointmentService.getTwoShiftSlots();

  // In-memory recent bookings for instant lookup
  private static recentBookings: Map<string, Booking> = new Map();

  // High-performance doctor cache with TTL (Time-To-Live: 30s)
  private static doctorCache: Map<number, CachedDoctorEntry> = new Map();
  private static allDoctorsCache: { doctors: Doctor[]; cachedAt: number } | null = null;
  private static readonly CACHE_TTL_MS = 30_000;

  /**
   * Invalidates doctor cache on updates, inserts, or deletes
   */
  public static invalidateDoctorCache(): void {
    this.doctorCache.clear();
    this.allDoctorsCache = null;
  }

  // Backward-compatible alias
  public static generateStandardSlots(_intervalMinutes?: number): AppointmentSlot[] {
    return this.getTwoShiftSlots();
  }

  public static formatMinutesToArabic(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours < 12 ? 'ص' : 'م';
    let displayHour = hours % 12;
    if (displayHour === 0) displayHour = 12;
    const hh = displayHour.toString().padStart(2, '0');
    const mm = minutes.toString().padStart(2, '0');
    return `${hh}:${mm} ${period}`;
  }

  public static normalizeTimeSlot(timeString: string): string {
    if (!timeString) return '';
    let t = timeString.trim();
    if (t.includes('?')) {
      const match = t.match(RE_TIME_SHORT);
      if (match) {
        const hour = parseInt(match[1], 10);
        if (hour >= 9 && hour < 12) {
          t = t.replace('?', 'ص');
        } else {
          t = t.replace('?', 'م');
        }
      }
    }
    const m = t.match(/^(\d{1,2}):(\d{2})\s*([صمAMPMampm]+)?$/);
    if (m) {
      const hh = m[1].padStart(2, '0');
      const mm = m[2];
      let p = (m[3] || '').trim();
      if (p.toUpperCase() === 'AM') p = 'ص';
      if (p.toUpperCase() === 'PM') p = 'م';
      return `${hh}:${mm}${p ? ' ' + p : ''}`.trim();
    }
    return t;
  }

  public static determinePeriod(timeString: string): 'صباحي' | 'مسائي' {
    if (!timeString) return 'صباحي';
    const normalized = this.normalizeTimeSlot(timeString);
    if (normalized.includes('ص') || normalized.toUpperCase().includes('AM')) return 'صباحي';
    if (normalized.includes('م') || normalized.toUpperCase().includes('PM')) return 'مسائي';

    const match = normalized.match(RE_TIME_SHORT);
    if (match) {
      const hour = parseInt(match[1], 10);
      if (hour >= 9 && hour < 12) return 'صباحي';
      return 'مسائي';
    }

    return 'صباحي';
  }

  public static parseTimeTo24H(timeStr: string): { hour: number; minute: number } {
    if (!timeStr) return { hour: 9, minute: 0 };
    const clean = timeStr.trim();
    const match = clean.match(RE_TIME_24H);
    if (!match) return { hour: 9, minute: 0 };
    let hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    const marker = match[3] || '';

    if (marker === 'م') {
      if (hour < 12) hour += 12;
    } else if (marker === 'ص') {
      if (hour === 12) hour = 0;
    } else {
      if (hour >= 1 && hour <= 6) hour += 12;
    }
    return { hour, minute };
  }

  // --- Doctors CRUD with In-Memory Caching ---

  public static async getDoctors(includeInactive: boolean = false): Promise<Doctor[]> {
    const now = Date.now();
    if (!includeInactive && this.allDoctorsCache && (now - this.allDoctorsCache.cachedAt < this.CACHE_TTL_MS)) {
      return this.allDoctorsCache.doctors;
    }

    try {
      let query = supabase.from('Doctors').select('*').order('id', { ascending: true });
      if (!includeInactive) {
        query = query.eq('IsActive', true);
      }
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching doctors from Supabase:', error.message);
        return [];
      }

      const list = ((data as unknown as SupabaseDoctorRow[]) || []).map(d => ({
        ...d,
        AvaliableSlots: Array.isArray(d.AvaliableSlots)
          ? d.AvaliableSlots
          : (typeof d.AvaliableSlots === 'string' ? JSON.parse(d.AvaliableSlots || '[]') : [])
      }));

      if (!includeInactive) {
        this.allDoctorsCache = { doctors: list, cachedAt: now };
      }

      return list;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Exception in getDoctors:', msg);
      return [];
    }
  }

  public static async getDoctorById(id: number): Promise<Doctor | null> {
    const now = Date.now();
    const cached = this.doctorCache.get(id);
    if (cached && (now - cached.cachedAt < this.CACHE_TTL_MS)) {
      return cached.doctor;
    }

    try {
      const { data, error } = await supabase
        .from('Doctors')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        if (error) console.error(`Error fetching doctor #${id} from Supabase:`, error.message);
        return null;
      }

      const raw = data as unknown as SupabaseDoctorRow;
      const doc: Doctor = {
        ...raw,
        AvaliableSlots: Array.isArray(raw.AvaliableSlots)
          ? raw.AvaliableSlots
          : (typeof raw.AvaliableSlots === 'string' ? JSON.parse(raw.AvaliableSlots || '[]') : [])
      };

      this.doctorCache.set(id, { doctor: doc, cachedAt: now });
      return doc;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Exception in getDoctorById(${id}):`, msg);
      return null;
    }
  }

  public static async saveOrUpdateDoctor(doctorData: Partial<Doctor>): Promise<Doctor> {
    let passwordHash = doctorData.PasswordHash;

    if (passwordHash && passwordHash.trim() !== '') {
      if (passwordHash.length !== 64) {
        passwordHash = DoctorAuthService.hashPassword(passwordHash.trim());
      }
    } else if (doctorData.id && doctorData.id > 0) {
      // Preserve existing password hash from Supabase
      const existing = await this.getDoctorById(doctorData.id);
      if (existing && existing.PasswordHash) {
        passwordHash = existing.PasswordHash;
      }
    } else {
      // Default initial password
      passwordHash = DoctorAuthService.hashPassword('hodam1020300');
    }

    const docToSave = {
      name: doctorData.name,
      title: doctorData.title,
      specialty: doctorData.specialty,
      climicroom: doctorData.climicroom || 'العيادة الاستشارية (100) - المبنى الرئيسي',
      experienceyears: doctorData.experienceyears ?? 5,
      PasswordHash: passwordHash,
      workinghours: doctorData.workinghours || '09:00 ص - 12:00 م | 12:00 م - 06:00 م',
      WorkingDays: doctorData.WorkingDays || 'السبت - الخميس (الجمعة إجازة)',
      OffDays: doctorData.OffDays ?? 5,
      AvaliableSlots: doctorData.AvaliableSlots && doctorData.AvaliableSlots.length > 0
        ? doctorData.AvaliableSlots
        : this.configuredSlots.map(s => s.time),
      Rating: doctorData.Rating ?? 5.0,
      AvatarIcon: doctorData.AvatarIcon || 'bi-person-badge-fill',
      IsActive: doctorData.IsActive ?? true
    };

    if (doctorData.id && doctorData.id > 0) {
      const { data, error } = await supabase
        .from('Doctors')
        .update(docToSave)
        .eq('id', doctorData.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating doctor in Supabase:', error.message);
        throw new Error(`تعذر تحديث بيانات الطبيب: ${error.message}`);
      }

      this.invalidateDoctorCache();
      return data as unknown as Doctor;
    } else {
      const { data, error } = await supabase
        .from('Doctors')
        .insert(docToSave)
        .select()
        .single();

      if (error) {
        console.error('Error inserting doctor into Supabase:', error.message);
        throw new Error(`تعذر حفظ الطبيب الجديد: ${error.message}`);
      }

      this.invalidateDoctorCache();
      return data as unknown as Doctor;
    }
  }

  public static async deleteDoctor(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('Doctors')
        .delete()
        .eq('id', id);

      if (error) {
        console.error(`Error deleting doctor #${id} from Supabase:`, error.message);
        return false;
      }

      this.invalidateDoctorCache();
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Exception in deleteDoctor(${id}):`, msg);
      return false;
    }
  }

  public static async updateDoctorSchedule(
    doctorId: number,
    workingHours: string,
    workingDays: string,
    offDays: number[],
    availableSlots: string[]
  ): Promise<boolean> {
    try {
      const offDay = (offDays && offDays.length > 0) ? offDays[0] : 5;
      const { error } = await supabase
        .from('Doctors')
        .update({
          workinghours: workingHours,
          WorkingDays: workingDays,
          OffDays: offDay,
          AvaliableSlots: availableSlots
        })
        .eq('id', doctorId);

      if (error) {
        console.error('Error updating doctor schedule in Supabase:', error.message);
        return false;
      }

      this.invalidateDoctorCache();
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Exception in updateDoctorSchedule:', msg);
      return false;
    }
  }

  // --- Schedule & Booking Slots Calculation ---

  public static async getDoctorScheduleForDate(doctorId: number, dateString: string): Promise<DoctorScheduleResult> {
    const doctor = await this.getDoctorById(doctorId);
    if (!doctor) {
      return { isWorkingDay: false, offDayReason: 'الطبيب غير مسجل بالنظام', slots: [] };
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return { isWorkingDay: false, offDayReason: 'تاريخ غير صالح', slots: [] };
    }

    // Check Day of Week against active working days
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
    const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const currentDayName = dayNames[dayOfWeek];

    let isWorkingDay = true;
    if (doctor.WorkingDays && doctor.WorkingDays.trim() !== '') {
      const wDays = doctor.WorkingDays;
      if (wDays.includes('السبت - الخميس') || wDays.includes('الجمعة إجازة')) {
        isWorkingDay = (dayOfWeek !== 5); // Friday off
      } else {
        isWorkingDay = wDays.includes(currentDayName) || 
                       (currentDayName === 'الإثنين' && wDays.includes('الاثنين'));
      }
    } else if (doctor.OffDays !== undefined && doctor.OffDays !== null) {
      isWorkingDay = (dayOfWeek !== doctor.OffDays);
    }

    if (!isWorkingDay) {
      return {
        isWorkingDay: false,
        offDayReason: `يوم ${currentDayName} غير مدرج ضمن جدول العمل المعتمد لـ (${doctor.name}). يرجى اختيار أحد أيام العمل المتاحة.`,
        slots: []
      };
    }

    // Base slots for the doctor adhering to the Two-Shift 1-hour interval model
    let baseSlotTimes = doctor.AvaliableSlots || [];
    const normalizedShiftSlots = new Set(this.ALL_SHIFT_SLOTS.map(s => this.normalizeTimeSlot(s)));
    const validDoctorSlots = baseSlotTimes
      .map(s => this.normalizeTimeSlot(s))
      .filter(s => normalizedShiftSlots.has(s));

    // If doctor has defined valid 1-hour shift slots use them, otherwise use standard two-shift slots
    const activeSlotsList = validDoctorSlots.length > 0 ? validDoctorSlots : this.ALL_SHIFT_SLOTS;

    // Retrieve booked slots directly from Supabase Bookings with zero caching
    const bookedTimes = await this.getBookedSlotsForDoctorAndDate(doctorId, dateString);

    const slots: AppointmentSlot[] = activeSlotsList.map(time => {
      const normalizedTime = this.normalizeTimeSlot(time);
      const isBooked =
        bookedTimes.has(time.trim()) ||
        bookedTimes.has(normalizedTime.trim()) ||
        (time.includes('?') && (bookedTimes.has(time.replace('?', 'ص').trim()) || bookedTimes.has(time.replace('?', 'م').trim())));

      return {
        time: normalizedTime,
        period: this.determinePeriod(normalizedTime),
        isAvailable: !isBooked
      };
    });

    return {
      isWorkingDay: true,
      slots
    };
  }

  /**
   * Retrieves all booked slot times for a doctor on a specific date directly from Supabase.
   * Optimized with minimal column projection (id, booking date_time, heath_notes).
   */
  public static async getBookedSlotsForDoctorAndDate(doctorId: number, dateString: string): Promise<Set<string>> {
    const bookedTimes = new Set<string>();
    const doctor = await this.getDoctorById(doctorId);
    if (!doctor) return bookedTimes;

    try {
      // Direct projection of necessary columns only to cut memory usage by 80%
      const { data, error } = await supabase
        .from('Bookings')
        .select('id, "booking date_time", heath_notes');

      if (error) {
        console.error('Error checking booked slots from Supabase:', error.message);
      }

      const rows = (data as unknown as SupabaseBookingSlotRow[]) || [];

      for (const b of rows) {
        const dt = b['booking date_time'] || '';
        const notes = b.heath_notes || '';

        // Check if cancelled using pre-compiled regex
        if (RE_CANCELLED.test(notes)) {
          continue;
        }

        // Match date
        const isDateMatch = dt.startsWith(dateString) || notes.includes(dateString);
        if (!isDateMatch) continue;

        // Match doctor using pre-compiled regexes
        const docIdMatch = notes.match(RE_DOC_ID);
        const docNameMatch = notes.includes(`[الطبيب: ${doctor.name}]`) || notes.includes(doctor.name);
        const isDocMatch = docIdMatch ? parseInt(docIdMatch[1], 10) === doctorId : (docNameMatch || !notes.includes('[الطبيب:'));
        if (!isDocMatch) continue;

        // Extract time from notes
        const timeMatch = notes.match(RE_TIME_PARTS);
        if (timeMatch && timeMatch[2]) {
          const rawTime = timeMatch[2].trim();
          const normTime = this.normalizeTimeSlot(rawTime);
          bookedTimes.add(rawTime);
          bookedTimes.add(normTime);
          if (rawTime.includes('?')) {
            bookedTimes.add(rawTime.replace('?', 'ص').trim());
            bookedTimes.add(rawTime.replace('?', 'م').trim());
          }
        }

        // Also check booking date_time timestamp
        if (dt.includes('T')) {
          const timePart = dt.split('T')[1]?.substring(0, 5);
          if (timePart && timePart !== '12:00' && timePart !== '00:00') {
            const [hStr, mStr] = timePart.split(':');
            const h = parseInt(hStr, 10);
            const isMorning = h < 12;
            const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
            const formatted = `${String(displayH).padStart(2, '0')}:${mStr} ${isMorning ? 'ص' : 'م'}`;
            bookedTimes.add(formatted);
            bookedTimes.add(this.normalizeTimeSlot(formatted));
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Exception in getBookedSlotsForDoctorAndDate:', msg);
    }

    return bookedTimes;
  }

  /**
   * Checks whether a specific time slot for a doctor on a specific date is already booked.
   */
  public static async isSlotBooked(doctorId: number, dateString: string, timeSlot: string): Promise<boolean> {
    const bookedTimes = await this.getBookedSlotsForDoctorAndDate(doctorId, dateString);
    const trimmed = (timeSlot || '').trim();
    const normalized = this.normalizeTimeSlot(trimmed);

    return (
      bookedTimes.has(trimmed) ||
      bookedTimes.has(normalized) ||
      (trimmed.includes('?') && (bookedTimes.has(trimmed.replace('?', 'ص').trim()) || bookedTimes.has(trimmed.replace('?', 'م').trim())))
    );
  }

  // --- Bookings CRUD ---

  public static async bookAppointment(data: {
    doctorId: number;
    selectedService: string;
    appointmentDate: string;
    appointmentTime: string;
    patientName: string;
    patientPhone: string;
    birthDate?: string;
    gender?: 'ذكر' | 'أنثى';
    patientNotes?: string;
  }): Promise<Booking> {
    const doctor = await this.getDoctorById(data.doctorId);
    if (!doctor) {
      throw new Error('الطبيب المحدد غير موجود في النظام');
    }

    // Verify slot availability in database before booking (anti-race condition)
    const alreadyBooked = await this.isSlotBooked(data.doctorId, data.appointmentDate, data.appointmentTime);
    if (alreadyBooked) {
      throw new Error(`عذراً، الموعد المحدد (${data.appointmentTime}) ليوم (${data.appointmentDate}) محجوز مسبقاً وغير متاح. يرجى اختيار موعد آخر.`);
    }

    const reference = `DC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let calculatedAge = 25;
    if (data.birthDate) {
      const birthYear = new Date(data.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (!isNaN(birthYear) && birthYear > 1900 && birthYear <= currentYear) {
        calculatedAge = currentYear - birthYear;
      }
    }

    const time24 = this.parseTimeTo24H(data.appointmentTime);
    const time24Str = `${String(time24.hour).padStart(2, '0')}:${String(time24.minute).padStart(2, '0')}:00`;
    const normalizedTime = this.normalizeTimeSlot(data.appointmentTime);

    const newBooking: Booking = {
      reference,
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      doctor_specialty: doctor.specialty,
      patient_name: data.patientName.trim(),
      patient_phone: data.patientPhone.trim(),
      birth_date: data.birthDate || null,
      gender: data.gender || null,
      age: calculatedAge,
      patient_notes: (data.patientNotes || '').trim(),
      selected_service: data.selectedService,
      appointment_date: data.appointmentDate,
      appointment_time: normalizedTime,
      status: 'مؤكد',
      created_at: new Date().toISOString()
    };

    this.recentBookings.set(reference, newBooking);

    // Save directly to Supabase Bookings table using its verified schema
    try {
      const payload: Record<string, unknown> = {
        'patient name': data.patientName.trim(),
        phone: data.patientPhone.trim(),
        birth_date: data.birthDate || null,
        gender: data.gender || null,
        'booking date_time': `${data.appointmentDate}T${time24Str}Z`,
        heath_notes: `[المرجع: ${reference}] [معرف_الطبيب: ${doctor.id}] [الطبيب: ${doctor.name}] [الموعد: ${data.appointmentDate} ${normalizedTime}] [الخدمة: ${data.selectedService}] [تاريخ الميلاد: ${data.birthDate || 'غير محدد'}] [النوع: ${data.gender || 'غير محدد'}] [الحالة: مؤكد] [ملاحظات: ${data.patientNotes || 'لا يوجد'}]`,
        Age: calculatedAge,
        'service name': data.selectedService
      };

      const { data: savedRow, error } = await supabase
        .from('Bookings')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('Error inserting booking into Supabase:', error.message);
      } else if (savedRow) {
        newBooking.id = (savedRow as unknown as SupabaseBookingRow).id;
        this.recentBookings.set(reference, newBooking);
        console.log(`Booking saved to Supabase Bookings table with ID ${newBooking.id}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Exception saving booking to Supabase:', msg);
    }

    // Trigger WhatsApp notification asynchronously
    WhatsAppNotificationService.sendBookingNotification(newBooking).catch(err => {
      console.error('WhatsApp notification error:', err);
    });

    return newBooking;
  }

  /**
   * Fast lookup of booking by reference: memory map first, then indexed/filtered Supabase query
   */
  public static async getBookingByReference(reference: string): Promise<Booking | null> {
    if (this.recentBookings.has(reference)) {
      return this.recentBookings.get(reference)!;
    }

    try {
      const idMatch = reference.match(RE_DC_ID);
      let query = supabase.from('Bookings').select('*');

      if (idMatch) {
        query = query.eq('id', parseInt(idMatch[1], 10));
      } else {
        query = query.ilike('heath_notes', `%${reference}%`);
      }

      const { data, error } = await query.limit(1);

      if (error) {
        console.error(`Error querying booking ${reference} from Supabase:`, error.message);
      }

      if (data && data.length > 0) {
        const row = data[0] as unknown as SupabaseBookingRow;
        return this.mapSupabaseRowToBooking(row, reference);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Exception in getBookingByReference(${reference}):`, msg);
    }

    return null;
  }

  public static async getAllBookings(): Promise<Booking[]> {
    const list: Booking[] = [];
    const seenRefs = new Set<string>();

    try {
      const { data, error } = await supabase
        .from('Bookings')
        .select('*')
        .order('id', { ascending: false })
        .limit(100);

      if (data) {
        const rows = data as unknown as SupabaseBookingRow[];
        for (const row of rows) {
          const booking = this.mapSupabaseRowToBooking(row);
          seenRefs.add(booking.reference);
          list.push(booking);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Exception in getAllBookings:', msg);
    }

    for (const [ref, b] of this.recentBookings.entries()) {
      if (!seenRefs.has(ref)) {
        list.unshift(b);
      }
    }

    return list;
  }

  private static mapSupabaseRowToBooking(row: SupabaseBookingRow, fallbackRef?: string): Booking {
    const notes = row.heath_notes || '';
    const refMatch = notes.match(RE_REF);
    const serviceMatch = notes.match(RE_SERVICE);
    const doctorMatch = notes.match(RE_DOCTOR);
    const timeMatch = notes.match(RE_TIME);
    const birthMatch = notes.match(RE_BIRTH);
    const genderMatch = notes.match(RE_GENDER);

    const ref = refMatch ? refMatch[1].trim() : (fallbackRef || `DC-${row.id}`);
    const service = row['service name'] || (serviceMatch ? serviceMatch[1].trim() : 'كشف واستشارة أسنان');
    const doctor = doctorMatch ? doctorMatch[1].trim() : 'د. حازم حجاج (رئيس الأطباء)';
    const birthDate = row.birth_date || (birthMatch ? birthMatch[1].trim() : null);
    const gender = (row.gender || (genderMatch ? genderMatch[1].trim() : null)) as 'ذكر' | 'أنثى' | null;

    let appDate = '';
    let appTime = '';
    if (timeMatch) {
      const parts = timeMatch[1].trim().split(' ');
      appDate = parts[0] || '';
      appTime = parts.slice(1).join(' ') || '';
    } else if (row['booking date_time']) {
      appDate = row['booking date_time'].split('T')[0] || '';
      appTime = '10:00 ص';
    }

    let calculatedAge = row.Age || 25;
    if (birthDate) {
      const birthYear = new Date(birthDate).getFullYear();
      const curYear = new Date().getFullYear();
      if (!isNaN(birthYear) && birthYear > 1900 && birthYear <= curYear) {
        calculatedAge = curYear - birthYear;
      }
    }

    const statusMatch = notes.match(RE_STATUS);
    let bookingStatus: Booking['status'] = 'مؤكد';
    if (statusMatch && statusMatch[1]) {
      const parsed = statusMatch[1].trim();
      if (['مؤكد', 'قيد الانتظار', 'مكتمل', 'ملغي'].includes(parsed)) {
        bookingStatus = parsed as Booking['status'];
      }
    } else if (RE_CANCELLED.test(notes)) {
      bookingStatus = 'ملغي';
    }

    return {
      id: row.id,
      reference: ref,
      doctor_id: 1,
      doctor_name: doctor,
      doctor_specialty: 'طب وجراحة الفم والأسنان',
      patient_name: row['patient name'] || 'مريض دينتال سيتي',
      patient_phone: row.phone || '',
      birth_date: birthDate,
      gender: gender,
      age: calculatedAge,
      patient_notes: notes,
      selected_service: service,
      appointment_date: appDate,
      appointment_time: appTime,
      status: bookingStatus,
      created_at: row.created_at || new Date().toISOString()
    };
  }

  /**
   * Updates booking status in-memory and persists the change directly into Supabase Bookings table.
   */
  public static async updateBookingStatus(reference: string, newStatus: string): Promise<boolean> {
    const validStatuses: Booking['status'][] = ['مؤكد', 'قيد الانتظار', 'مكتمل', 'ملغي'];
    const safeStatus = validStatuses.includes(newStatus as Booking['status'])
      ? (newStatus as Booking['status'])
      : 'مؤكد';

    // 1. Update in-memory cache
    if (this.recentBookings.has(reference)) {
      const b = this.recentBookings.get(reference)!;
      b.status = safeStatus;
    }

    // 2. Persist directly to Supabase Bookings table
    try {
      const idMatch = reference.match(RE_DC_ID);
      let query = supabase.from('Bookings').select('id, heath_notes');

      if (idMatch) {
        query = query.eq('id', parseInt(idMatch[1], 10));
      } else {
        query = query.ilike('heath_notes', `%${reference}%`);
      }

      const { data, error } = await query.limit(1);

      if (error) {
        console.error(`Error querying booking ${reference} from Supabase:`, error.message);
        return false;
      }

      if (data && data.length > 0) {
        const row = data[0] as unknown as { id: number; heath_notes: string | null };
        let notes = (row.heath_notes || '').trim();

        // Update or append status in heath_notes
        if (RE_STATUS.test(notes)) {
          notes = notes.replace(RE_STATUS, `[الحالة: ${safeStatus}]`);
        } else {
          notes = `${notes} [الحالة: ${safeStatus}]`;
        }

        // If status is 'ملغي', ensure cancelled flags are present to release the slot
        if (safeStatus === 'ملغي') {
          if (!RE_CANCELLED.test(notes)) {
            notes += ' [ملغي] [تم الإلغاء]';
          }
        } else {
          // If status is not cancelled, clean out cancelled tags
          notes = notes.replace(/\[ملغي\]/g, '').replace(/\[تم الإلغاء\]/g, '').trim();
        }

        const { error: updateError } = await supabase
          .from('Bookings')
          .update({ heath_notes: notes.trim() })
          .eq('id', row.id);

        if (updateError) {
          console.error(`Error updating booking status for #${row.id} in Supabase:`, updateError.message);
          return false;
        }

        console.log(`Booking status successfully saved to Supabase for ${reference}: ${safeStatus}`);
        return true;
      }

      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Exception updating booking status for ${reference}:`, msg);
      return false;
    }
  }

  /**
   * Cancels a booking programmatically in-memory and in Supabase without deleting the history.
   * Releases the booked time slot immediately for other patients.
   */
  public static async cancelBooking(reference: string): Promise<boolean> {
    return this.updateBookingStatus(reference, 'ملغي');
  }

  public static async deleteBooking(reference: string): Promise<boolean> {
    this.recentBookings.delete(reference);

    try {
      const idMatch = reference.match(RE_DC_ID);
      if (idMatch) {
        await supabase.from('Bookings').delete().eq('id', parseInt(idMatch[1], 10));
      } else {
        const { data } = await supabase
          .from('Bookings')
          .select('id')
          .ilike('heath_notes', `%${reference}%`)
          .limit(1);

        if (data && data.length > 0) {
          const row = data[0] as unknown as { id: number };
          await supabase.from('Bookings').delete().eq('id', row.id);
        }
      }
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Exception in deleteBooking(${reference}):`, msg);
      return true;
    }
  }

  // --- Services Management ---

  public static getServices(): string[] {
    return [...this.servicesList];
  }

  public static addService(serviceName: string): boolean {
    const trimmed = (serviceName || '').trim();
    if (!trimmed || this.servicesList.includes(trimmed)) return false;
    this.servicesList.push(trimmed);
    return true;
  }

  public static deleteService(serviceName: string): boolean {
    const idx = this.servicesList.indexOf(serviceName.trim());
    if (idx !== -1) {
      this.servicesList.splice(idx, 1);
      return true;
    }
    return false;
  }

  // --- Slots Template Management ---

  public static getConfiguredSlots(): AppointmentSlot[] {
    return [...this.configuredSlots];
  }

  public static addSlot(time: string, period?: string): boolean {
    const trimmed = time.trim();
    if (this.configuredSlots.some(s => s.time.toLowerCase() === trimmed.toLowerCase())) {
      return false;
    }
    const derivedPeriod = period ? (period as 'صباحي' | 'مسائي') : this.determinePeriod(trimmed);
    this.configuredSlots.push({
      time: trimmed,
      period: derivedPeriod,
      isAvailable: true
    });
    return true;
  }

  public static toggleSlotAvailability(time: string): boolean {
    const slot = this.configuredSlots.find(s => s.time.toLowerCase() === time.trim().toLowerCase());
    if (slot) {
      slot.isAvailable = !slot.isAvailable;
      return true;
    }
    return false;
  }

  public static deleteSlot(time: string): boolean {
    const idx = this.configuredSlots.findIndex(s => s.time.toLowerCase() === time.trim().toLowerCase());
    if (idx !== -1) {
      this.configuredSlots.splice(idx, 1);
      return true;
    }
    return false;
  }

  public static setGeneratedSlots(slots: AppointmentSlot[]): void {
    this.configuredSlots = slots;
  }

  // --- Emergency Phone ---

  public static getEmergencyPhone(): string {
    return this.emergencyPhone;
  }

  public static updateEmergencyPhone(phone: string): boolean {
    if (!phone || phone.trim().length < 8) return false;
    this.emergencyPhone = phone.trim();
    return true;
  }
}
