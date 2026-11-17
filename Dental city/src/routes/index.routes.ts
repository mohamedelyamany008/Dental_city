import { Router, Request, Response } from 'express';
import { AppointmentService } from '../services/appointmentService.js';

export const indexRoutes = Router();

indexRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const doctors = await AppointmentService.getDoctors();
    const services = AppointmentService.getServices();
    const emergencyPhone = AppointmentService.getEmergencyPhone();

    return res.render('index', {
      title: 'الرئيسية - مركز دينتال سيتي لطب وجراحة الأسنان',
      doctors,
      services,
      emergencyPhone
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error rendering index page:', msg);
    return res.render('index', {
      title: 'الرئيسية - مركز دينتال سيتي لطب وجراحة الأسنان',
      doctors: [],
      services: [],
      emergencyPhone: '01551388988'
    });
  }
});

indexRoutes.get('/Privacy', (_req: Request, res: Response) => {
  return res.render('privacy', {
    title: 'سياسة الخصوصية - دينتال سيتي'
  });
});
