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
// Process & Container Stability Safeguards
// Intercept uncaught exceptions and unhandled promise rejections to prevent
// unexpected process crashes in production (Fly.io, Docker, IISNode).
// ============================================================================
process.on('uncaughtException', (err: Error) => {
  console.error('[CRITICAL] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('[CRITICAL] Unhandled Promise Rejection at:', promise, 'reason:', reason);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuration: Port & Host (MonsterASP.NET uses HTTP_PLATFORM_PORT, Fly.io uses PORT)
const PORT = process.env.PORT || process.env.HTTP_PLATFORM_PORT || 5083;
const isNamedPipe = typeof PORT === 'string' && PORT.startsWith('\\\\.\\pipe\\');
const portNumber = Number(PORT) || 5083;
const HOST = '0.0.0.0';

// Body and Cookie Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Trust proxy for MonsterASP.NET, Fly.io, Vercel, and IIS reverse proxies
const isCloudOrProd = Boolean(
  process.env.FLY_APP_NAME ||
  process.env.FLY_ALLOC_ID ||
  process.env.HTTP_PLATFORM_PORT ||
  process.env.VERCEL ||
  process.env.NODE_ENV === 'production'
);
if (isCloudOrProd) {
  app.set('trust proxy', 1);
}

// Session Secret Management (Strict with warning fallback)
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  sessionSecret = 'temp_insecure_fallback_secret_please_set_in_production_dental_city';
  console.warn(`
⚠️  ========================================================================
⚠️  [SECURITY WARNING] SESSION_SECRET is not set in environment variables!
⚠️  Using a temporary fallback secret.
⚠️  FOR PRODUCTION (Fly.io, Docker):
⚠️  Please set a strong random secret via environment variables:
⚠️  Fly.io CLI: fly secrets set SESSION_SECRET=$(openssl rand -hex 32)
⚠️  ========================================================================
`);
}

// Session Middleware
app.use(
  session({
    secret: sessionSecret,
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

// ============================================================================
// Clean Path Resolution for Static Assets and Views (Docker, Fly.io, Local)
// ============================================================================
function findExistingPath(candidates: string[], fallback: string): string {
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return fallback;
}

// Public static files
const resolvedPublicPath = findExistingPath([
  path.resolve(__dirname, '..', 'public'),               // dist/../public or src/../public
  path.resolve(process.cwd(), 'public'),                 // Docker WORKDIR /app/public
  path.resolve(process.cwd(), 'Dental city', 'public')   // Root-level invocation
], path.resolve(__dirname, '..', 'public'));

app.use(express.static(resolvedPublicPath));

// View engine setup (EJS with layouts)
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

// Views directory resolution
const resolvedViewsPath = findExistingPath([
  path.resolve(__dirname, 'views'),                       // dist/views (compiled) or src/views
  path.resolve(process.cwd(), 'dist', 'views'),           // Docker WORKDIR /app/dist/views
  path.resolve(process.cwd(), 'Dental city', 'dist', 'views'),
  path.resolve(process.cwd(), 'Dental city', 'src', 'views'),
  path.resolve(process.cwd(), 'views')
], path.resolve(__dirname, 'views'));

app.set('views', resolvedViewsPath);

// ============================================================================
// Fast Health Check (Fly.io / Docker Health Probe)
// ============================================================================
app.get(['/health', '/healthz'], (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'dental-city',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

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
  const server = isNamedPipe
    ? app.listen(PORT, () => {
        console.log(`====================================================`);
        console.log(`🏥 Dental City Web Application (Node.js + TypeScript)`);
        console.log(`🚀 Server running via Named Pipe: ${PORT} (IIS / AppPool Mode)`);
        console.log(`====================================================`);
      })
    : app.listen(portNumber, HOST, () => {
        console.log(`====================================================`);
        console.log(`🏥 Dental City Web Application (Node.js + TypeScript)`);
        console.log(`🚀 Server running on: http://${HOST}:${portNumber}`);
        console.log(`📅 Appointments: http://localhost:${portNumber}/Appointments/Book`);
        console.log(`🔐 Doctor Portal: http://localhost:${portNumber}/Doctor/Login`);
        console.log(`💓 Health Check: http://localhost:${portNumber}/health`);
        console.log(`====================================================`);
      });

  // Graceful shutdown handlers for Fly.io, Docker, and process managers
  const handleShutdown = (signal: string) => {
    console.log(`\n[SHUTDOWN] Received ${signal}. Closing server gracefully...`);
    server.close(() => {
      console.log('[SHUTDOWN] HTTP server closed cleanly.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('[SHUTDOWN] Forcing shutdown after timeout.');
      process.exit(1);
    }, 10000).unref();
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

export default app;
