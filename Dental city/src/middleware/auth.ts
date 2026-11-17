import { Request, Response, NextFunction } from 'express';

export function requireDoctorAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.doctor) {
    return next();
  }

  const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');
  if (isAjax) {
    return res.status(401).json({ success: false, message: 'انتهت الجلسة، يرجى إعادة تسجيل الدخول.' });
  }

  const returnUrl = encodeURIComponent(req.originalUrl || '/Doctor/Dashboard');
  return res.redirect(`/Doctor/Login?returnUrl=${returnUrl}`);
}

export function injectLocals(req: Request, res: Response, next: NextFunction) {
  res.locals.user = req.session?.doctor || null;
  res.locals.flashMessage = req.session?.flashMessage || null;
  if (req.session?.flashMessage) {
    delete req.session.flashMessage;
  }
  next();
}

