import dotenv from 'dotenv';
dotenv.config();
export class WhatsAppNotificationService {
    static clinicSender = process.env.WHATSAPP_CLINIC_PHONE || '01551888988';
    static nurseNumber = process.env.WHATSAPP_NURSE_PHONE || '01004156289';
    static async sendBookingNotification(booking) {
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
        return true;
    }
}
