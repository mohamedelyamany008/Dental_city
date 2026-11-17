import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';

import { indexRoutes } from './routes/index.routes.js';
import { appointmentRoutes } from './routes/appointments.routes.js';
import { doctorRoutes } from './routes/doctor.routes.js';
import { injectLocals } from './middleware/auth.js';

dotenv.config();

// ============================================================================
// Process & AppPool Stability Safeguards
// Intercept uncaught exceptions and unhandled promise rejections to prevent
// IIS AppPool, Passenger, or Node process termination/recycling on hosting.
// ============================================================================
process.on('uncaughtException', (err: Error) => {
  console.error('[CRITICAL] Uncaught Exception intercepted by AppPool safeguard:', err);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('[CRITICAL] Unhandled Promise Rejection at:', promise, 'reason:', reason);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5083;
const isNamedPipe = typeof PORT === 'string' && PORT.startsWith('\\\\.\\pipe\\');

// Middleware for parsing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Trust proxy for secure cookies in serverless/cloud environments (e.g. Vercel)
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dental_city_secure_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' && !process.env.DISABLE_SECURE_COOKIE,
      maxAge: 8 * 60 * 60 * 1000 // 8 hours default
    }
  })
);

// Inject common locals (user session, flash messages)
app.use(injectLocals);

// Static assets resolution (resilient across local and Vercel environments)
const possiblePublicPaths = [
  path.join(__dirname, '..', 'public'),
  path.join(__dirname, 'public'),
  path.join(process.cwd(), 'Dental city', 'public'),
  path.join(process.cwd(), 'public')
];
const resolvedPublicPath = possiblePublicPaths.find(p => fs.existsSync(p)) || path.join(__dirname, '..', 'public');
app.use(express.static(resolvedPublicPath));

// View engine setup (EJS with layouts)
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

// Resilient views path resolution (works when invoked from root, subfolder, or Vercel serverless)
const possibleViewPaths = [
  path.join(__dirname, 'views'),
  path.join(__dirname, '..', 'src', 'views'),
  path.join(__dirname, '..', 'dist', 'views'),
  path.join(process.cwd(), 'Dental city', 'src', 'views'),
  path.join(process.cwd(), 'Dental city', 'dist', 'views'),
  path.join(process.cwd(), 'dist', 'views'),
  path.join(process.cwd(), 'src', 'views'),
  path.join(process.cwd(), 'views')
];
const resolvedViewsPath = possibleViewPaths.find(p => fs.existsSync(p)) || path.join(__dirname, 'views');
app.set('views', resolvedViewsPath);

// Mount application routes
app.use('/', indexRoutes);
app.use('/', appointmentRoutes);
app.use('/', doctorRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).render('error', {
    title: 'الصفحة غير موجودة - 404',
    message: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
  });
});

// Error handling middleware with cascading crash protection
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const errorMsg = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
  console.error('[SERVER ERROR] Unhandled route error:', err);

  if (res.headersSent) {
    return;
  }

  try {
    res.status(500).render('error', {
      title: 'حدث خطأ في الخادم',
      message: errorMsg || 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى لاحقاً.'
    });
  } catch (renderError) {
    console.error('[CRITICAL] Failed to render error view, falling back to clean HTML:', renderError);
    res.status(500).send(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>خطأ في الخادم - دنتل سيتي</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; text-align: center; padding: 50px 20px; }
            .card { max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
            h2 { color: #e11d48; margin-bottom: 12px; }
            p { color: #64748b; line-height: 1.6; }
            a { display: inline-block; margin-top: 20px; background: #0284c7; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>عذراً، حدث خطأ غير متوقع</h2>
            <p>يعمل النظام حالياً على معالجة الطلب، يرجى إعادة المحاولة بعد لحظات أو العودة للصفحة الرئيسية.</p>
            <a href="/">العودة إلى الصفحة الرئيسية</a>
          </div>
        </body>
      </html>
    `);
  }
});

// Bind to port or IIS named pipe if not running in serverless mode (Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🏥 Dental City Web Application (Node.js + TypeScript)`);
    if (isNamedPipe) {
      console.log(`🚀 Server running via Named Pipe: ${PORT} (IIS / AppPool Mode)`);
    } else {
      console.log(`🚀 Server running on: http://localhost:${PORT}`);
    }
    console.log(`📅 Appointments: http://localhost:${PORT}/Appointments/Book`);
    console.log(`🔐 Doctor Portal: http://localhost:${PORT}/Doctor/Login`);
    console.log(`====================================================`);
  });
}

export default app;
