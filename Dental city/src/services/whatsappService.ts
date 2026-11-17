import dotenv from 'dotenv';
dotenv.config();

export class WhatsAppNotificationService {
  private static clinicSender = process.env.WHATSAPP_CLINIC_PHONE || '01551888988';
  private static nurseNumber = process.env.WHATSAPP_NURSE_PHONE || '01004156289';

  public static async sendBookingNotification(booking: {
    reference: string;
    patient_name: string;
    patient_phone: string;
    doctor_name: string;
    appointment_date: string;
    appointment_time: string;
    selected_service: string;
    gender?: string | null;
    birth_date?: string | null;
    age?: number | null;
  }): Promise<boolean> {
    const extraDetails = [
      booking.gender ? `النوع: ${booking.gender}` : '',
      booking.age ? `العمر: ${booking.age} سنة` : (booking.birth_date ? `تاريخ الميلاد: ${booking.birth_date}` : '')
    ].filter(Boolean).join(' | ');

    const message = `تم تسجيل موعد جديد بنجاح في مركز دنتل سيتي!
رقم الحجز: ${booking.reference}
المريض: ${booking.patient_name} (${booking.patient_phone}) ${extraDetails ? `[${extraDetails}]` : ''}
الطبيب: ${booking.doctor_name}
الخدمة: ${booking.selected_service}
الموعد: ${booking.appointment_date} في تمام ${booking.appointment_time}`;

    console.log(`[WhatsApp Service] Sending notification to Clinic (${this.clinicSender}) & Nurse (${this.nurseNumber}):\n${message}`);
    // If external WhatsApp API URL/Key is configured, make the HTTP request here
    return true;
  }
}

