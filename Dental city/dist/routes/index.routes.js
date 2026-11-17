import { Router } from 'express';
import { AppointmentService } from '../services/appointmentService.js';
export const indexRoutes = Router();
indexRoutes.get('/', async (_req, res) => {
    try {
        const doctors = await AppointmentService.getDoctors();
        const services = AppointmentService.getServices();
        const emergencyPhone = AppointmentService.getEmergencyPhone();
        return res.render('index', {
            title: 'الرئيسية - مركز دنتل سيتي لطب وجراحة الأسنان',
            doctors,
            services,
            emergencyPhone
        });
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Error rendering index page:', msg);
        return res.render('index', {
            title: 'الرئيسية - مركز دنتل سيتي لطب وجراحة الأسنان',
            doctors: [],
            services: [],
            emergencyPhone: '01551388988'
        });
    }
});
indexRoutes.get('/Privacy', (_req, res) => {
    return res.render('privacy', {
        title: 'سياسة الخصوصية - دنتل سيتي'
    });
});
