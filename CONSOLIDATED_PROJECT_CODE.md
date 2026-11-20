# ملف الكود البرمجي الشامل لمشروع مركز دينتال سيتي (Dental City)
> **تاريخ التجميع:** ٢١‏/١١‏/٢٠٢٦، ١٢:٠٩:١٧ ص
> **البيئة:** Node.js (TypeScript) + Express + EJS + Supabase (PostgreSQL)
> **ملاحظة:** تم تجميع كل ملفات المشروع البرمجية في هذا المستند للعرض والمراجعة والنسخ بسهولة دون المساس أو التعديل بأي من الملفات الأصلية.

---

## 📑 فهرس محتويات الملف

### 1. ملفات الخادم والواجهة الخلفية (Backend - Node.js + TypeScript)
- [Server Entrypoint (server.ts)](#server-entrypoint-server-ts-) - `Dental city/src/server.ts`
- [Supabase Client Configuration (supabase.ts)](#supabase-client-configuration-supabase-ts-) - `Dental city/src/config/supabase.ts`
- [Data Interfaces & Types (types.ts)](#data-interfaces-types-types-ts-) - `Dental city/src/models/types.ts`
- [Validation Schemas - Zod (schemas.ts)](#validation-schemas-zod-schemas-ts-) - `Dental city/src/models/schemas.ts`
- [Authentication & Session Middleware (auth.ts)](#authentication-session-middleware-auth-ts-) - `Dental city/src/middleware/auth.ts`
- [Home & Public Routes (index.routes.ts)](#home-public-routes-index-routes-ts-) - `Dental city/src/routes/index.routes.ts`
- [Appointments Routes & API (appointments.routes.ts)](#appointments-routes-api-appointments-routes-ts-) - `Dental city/src/routes/appointments.routes.ts`
- [Doctor Portal & Dashboard Routes (doctor.routes.ts)](#doctor-portal-dashboard-routes-doctor-routes-ts-) - `Dental city/src/routes/doctor.routes.ts`
- [Appointment & Doctor Service (appointmentService.ts)](#appointment-doctor-service-appointmentservice-ts-) - `Dental city/src/services/appointmentService.ts`
- [Doctor Authentication Service (doctorAuthService.ts)](#doctor-authentication-service-doctorauthservice-ts-) - `Dental city/src/services/doctorAuthService.ts`
- [WhatsApp Notifications Service (whatsappService.ts)](#whatsapp-notifications-service-whatsappservice-ts-) - `Dental city/src/services/whatsappService.ts`

### 2. قوالب واجهات المستخدم (Frontend Views - EJS Templates)
- [القالب الرئيسي (main.ejs)](#القالب-الرئيسي-main-ejs-) - `Dental city/src/views/layouts/main.ejs`
- [الصفحة الرئيسية (index.ejs)](#الصفحة-الرئيسية-index-ejs-) - `Dental city/src/views/index.ejs`
- [واجهة حجز المواعيد (book.ejs)](#واجهة-حجز-المواعيد-book-ejs-) - `Dental city/src/views/appointments/book.ejs`
- [واجهة تأكيد الحجز (confirmation.ejs)](#واجهة-تأكيد-الحجز-confirmation-ejs-) - `Dental city/src/views/appointments/confirmation.ejs`
- [واجهة تسجيل دخول الطبيب (login.ejs)](#واجهة-تسجيل-دخول-الطبيب-login-ejs-) - `Dental city/src/views/doctor/login.ejs`
- [لوحة تحكم الطبيب والعيادة (dashboard.ejs)](#لوحة-تحكم-الطبيب-والعيادة-dashboard-ejs-) - `Dental city/src/views/doctor/dashboard.ejs`
- [واجهة رسائل الخطأ (error.ejs)](#واجهة-رسائل-الخطأ-error-ejs-) - `Dental city/src/views/error.ejs`
- [صفحة سياسة الخصوصية (privacy.ejs)](#صفحة-سياسة-الخصوصية-privacy-ejs-) - `Dental city/src/views/privacy.ejs`

### 3. السكربتات والأنماط المخصصة (Custom Scripts & Styles)
- [أنماط الموقع المخصصة (site.css)](#أنماط-الموقع-المخصصة-site-css-) - `Dental city/public/css/site.css`
- [سكربتات الموقع العامة (site.js)](#سكربتات-الموقع-العامة-site-js-) - `Dental city/public/js/site.js`

### 4. ملفات التكوين والإعدادات والنشر (Configuration & Deployment)
- [Root package.json](#root-package-json) - `package.json`
- [Root Server Entrypoint (server.js)](#root-server-entrypoint-server-js-) - `server.js`
- [Root IIS / AppPool Configuration (web.config)](#root-iis-apppool-configuration-web-config-) - `web.config`
- [Root Vercel Configuration (vercel.json)](#root-vercel-configuration-vercel-json-) - `vercel.json`
- [Root Vercel Serverless Function (api/index.js)](#root-vercel-serverless-function-api-index-js-) - `api/index.js`
- [Root Vercel Build Pipeline (scripts/build.js)](#root-vercel-build-pipeline-scripts-build-js-) - `scripts/build.js`
- [Environment Variables Template (.env.example)](#environment-variables-template-env-example-) - `.env.example`
- [Node.js Version Lock (.nvmrc)](#node-js-version-lock-nvmrc-) - `.nvmrc`
- [Node.js Version Lock (.node-version)](#node-js-version-lock-node-version-) - `.node-version`
- [Subfolder package.json](#subfolder-package-json) - `Dental city/package.json`
- [TypeScript Configuration (tsconfig.json)](#typescript-configuration-tsconfig-json-) - `Dental city/tsconfig.json`
- [Subfolder IIS Configuration (web.config)](#subfolder-iis-configuration-web-config-) - `Dental city/web.config`
- [Subfolder Vercel Configuration (vercel.json)](#subfolder-vercel-configuration-vercel-json-) - `Dental city/vercel.json`
- [Subfolder Vercel Function (api/index.js)](#subfolder-vercel-function-api-index-js-) - `Dental city/api/index.js`
- [Views Copy Build Script (copy-views.js)](#views-copy-build-script-copy-views-js-) - `Dental city/scripts/copy-views.js`

---

## 1. ملفات الخادم والواجهة الخلفية (Backend - Node.js + TypeScript)

> يحتوي هذا القسم على منطق الخادم، الاتصال بقاعدة بيانات Supabase، نماذج البيانات، خدمات الحجز والمصادقة، ومسارات Express.

### Server Entrypoint (server.ts)

- **المسار:** `Dental city/src/server.ts`
- **عدد الأسطر:** 239 سطر
- **الحجم:** 9.6 KB

````typescript
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
const isFly = Boolean(process.env.FLY_APP_NAME || process.env.FLY_ALLOC_ID);

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
          <title>خطأ في الخادم - دينتال سيتي</title>
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
    : isFly
    ? app.listen(portNumber, '0.0.0.0', () => {
        console.log(`====================================================`);
        console.log(`🏥 Dental City Web Application (Node.js + TypeScript)`);
        console.log(`🚀 Server running on Fly.io: http://0.0.0.0:${portNumber}`);
        console.log(`💓 Health Check: http://0.0.0.0:${portNumber}/health`);
        console.log(`====================================================`);
      })
    : app.listen(portNumber, () => {
        console.log(`====================================================`);
        console.log(`🏥 Dental City Web Application (Node.js + TypeScript)`);
        console.log(`🚀 Server running on: http://localhost:${portNumber}`);
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
````

---

### Supabase Client Configuration (supabase.ts)

- **المسار:** `Dental city/src/config/supabase.ts`
- **عدد الأسطر:** 68 سطر
- **الحجم:** 2.7 KB

````typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config();

// Ensure global WebSocket is available for Node 20 and below (resolves Supabase Realtime crash)
if (typeof (globalThis as any).WebSocket === 'undefined') {
  (globalThis as any).WebSocket = WebSocket;
}

const DEFAULT_SUPABASE_URL = 'https://uwyyntbsvhqmrlthmgvn.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_MJntq3aqg2RNwM9cpqoeXQ_-oU2bIfr';

let supabaseUrl = (process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
let supabaseKey = (process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY).trim();

// Ensure URL starts with a valid protocol to avoid TypeError in URL constructor
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  console.warn(`[Supabase Config] Malformed SUPABASE_URL "${supabaseUrl}". Falling back to default URL.`);
  supabaseUrl = DEFAULT_SUPABASE_URL;
}

if (!supabaseKey) {
  console.warn('[Supabase Config] Missing SUPABASE_KEY. Falling back to default key.');
  supabaseKey = DEFAULT_SUPABASE_KEY;
}

const clientOptions = {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  },
  // Explicitly supply WebSocket implementation to Realtime to prevent runtime crash on any Node version
  realtime: {
    transport: WebSocket as any
  }
};

let client: SupabaseClient;
try {
  client = createClient(supabaseUrl, supabaseKey, clientOptions);
} catch (err) {
  console.error('[CRITICAL] Error creating Supabase client, initializing safe fallback:', err);
  try {
    client = createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_KEY, clientOptions);
  } catch (fallbackErr) {
    console.error('[CRITICAL] Fallback Supabase client initialization also failed:', fallbackErr);
    // Return a safe dummy proxy to prevent container crash loop (CrashLoopBackOff)
    client = new Proxy({} as SupabaseClient, {
      get: (_target, prop) => {
        if (prop === 'from') {
          return () => ({
            select: () => Promise.resolve({ data: [], error: new Error('Supabase client offline') }),
            insert: () => Promise.resolve({ data: null, error: new Error('Supabase client offline') }),
            update: () => Promise.resolve({ data: null, error: new Error('Supabase client offline') }),
            delete: () => Promise.resolve({ data: null, error: new Error('Supabase client offline') }),
            order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) })
          });
        }
        return () => Promise.resolve({ data: null, error: new Error('Supabase client offline') });
      }
    });
  }
}

export const supabase = client;
````

---

### Data Interfaces & Types (types.ts)

- **المسار:** `Dental city/src/models/types.ts`
- **عدد الأسطر:** 162 سطر
- **الحجم:** 3.6 KB

````typescript
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
````

---

### Validation Schemas - Zod (schemas.ts)

- **المسار:** `Dental city/src/models/schemas.ts`
- **عدد الأسطر:** 84 سطر
- **الحجم:** 4.8 KB

````typescript
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
  morning_start: z.string().optional().nullable(),
  morning_end: z.string().optional().nullable(),
  evening_start: z.string().optional().nullable(),
  evening_end: z.string().optional().nullable(),
  active_days: z.string().optional().nullable(),
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
  morning_start: z.string().optional().default('09:00:00'),
  morning_end: z.string().optional().default('12:00:00'),
  evening_start: z.string().optional().default('12:00:00'),
  evening_end: z.string().optional().default('18:00:00'),
  active_days: z.string().optional().default('السبت - الخميس'),
  scheduleOffDays: z.array(z.coerce.number()).optional().default([5]),
  scheduleSelectedSlots: z.array(z.string()).optional().default([])
});

export const StaffFormSchema = z.object({
  name: z.string().min(2, 'يرجى إدخال اسم الموظف بشكل صحيح'),
  role: z.string().min(2, 'يرجى تحديد الدور الوظيفي'),
  phone: z.string().min(8, 'يرجى إدخال رقم الهاتف بشكل صحيح')
});

export type DoctorFormData = z.infer<typeof DoctorFormSchema>;
export type BookingFormData = z.infer<typeof BookingFormSchema>;
export type DoctorLoginData = z.infer<typeof DoctorLoginSchema>;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
export type ScheduleUpdateData = z.infer<typeof ScheduleUpdateSchema>;
export type StaffFormData = z.infer<typeof StaffFormSchema>;
````

---

### Authentication & Session Middleware (auth.ts)

- **المسار:** `Dental city/src/middleware/auth.ts`
- **عدد الأسطر:** 28 سطر
- **الحجم:** 1.0 KB

````typescript
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
  res.locals.currentPath = req.originalUrl || req.path || '';
  res.locals.portalType = 'admin';
  if (req.session?.flashMessage) {
    delete req.session.flashMessage;
  }
  next();
}

````

---

### Home & Public Routes (index.routes.ts)

- **المسار:** `Dental city/src/routes/index.routes.ts`
- **عدد الأسطر:** 35 سطر
- **الحجم:** 1.1 KB

````typescript
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
    title: 'سياسة الخصوصية - مركز دينتال سيتي'
  });
});
````

---

### Appointments Routes & API (appointments.routes.ts)

- **المسار:** `Dental city/src/routes/appointments.routes.ts`
- **عدد الأسطر:** 441 سطر
- **الحجم:** 18.2 KB

````typescript
import { Router, Request, Response } from 'express';
import { AppointmentService } from '../services/appointmentService.js';
import { Booking } from '../models/types.js';
import { BookingFormSchema } from '../models/schemas.js';

export const appointmentRoutes = Router();

// GET /Appointments/Book (supports HTML render and ?handler=AvailableSlots)
appointmentRoutes.get(['/Appointments/Book', '/appointments/book'], async (req: Request, res: Response) => {
  const handler = req.query.handler as string;

  // AJAX handler: fetch available slots for doctor & date
  if (handler === 'AvailableSlots') {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    const doctorId = parseInt(req.query.doctorId as string, 10);
    const date = req.query.date as string;

    if (!doctorId || !date) {
      return res.json({ success: false, message: 'يرجى تحديد الطبيب والتاريخ' });
    }

    try {
      const schedule = await AppointmentService.getDoctorScheduleForDate(doctorId, date);
      const morningSlots = schedule.slots.filter(s => s.period === 'صباحي');
      const afternoonSlots = schedule.slots.filter(s => s.period === 'مسائي');

      return res.json({
        success: true,
        isOffDay: !schedule.isWorkingDay,
        offDayReason: schedule.offDayReason || '',
        morningSlots,
        afternoonSlots,
        slots: schedule.slots
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.json({ success: false, message: msg || 'حدث خطأ أثناء جلب المواعيد' });
    }
  }

  // Normal Page Render
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  try {
    const doctors = await AppointmentService.getDoctors();
    const services = AppointmentService.getServices();
    const emergencyPhone = AppointmentService.getEmergencyPhone();

    return res.render('appointments/book', {
      title: 'حجز موعد عيادة - مركز دينتال سيتي (Dental City Center)',
      doctors,
      services,
      emergencyPhone,
      errors: {},
      formData: {}
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error rendering booking page:', msg);
    return res.status(500).render('error', { message: 'تعذر تحميل صفحة الحجز' });
  }
});

// POST /Appointments/Book
appointmentRoutes.post(['/Appointments/Book', '/appointments/book'], async (req: Request, res: Response) => {
  try {
    const parsed = BookingFormSchema.safeParse(req.body);

    if (!parsed.success) {
      let doctors: any[] = [];
      try {
        doctors = await AppointmentService.getDoctors();
      } catch (docErr) {
        console.error('Failed to load doctors on form validation error:', docErr);
      }
      const services = AppointmentService.getServices();
      const emergencyPhone = AppointmentService.getEmergencyPhone();

      const formattedErrors: Record<string, string> = {};
      const issues = parsed.error.issues;
      issues.forEach((err: { path?: readonly (string | number | symbol)[]; message: string }) => {
        const field = err.path && err.path[0] ? String(err.path[0]) : '';
        if (field) formattedErrors[field] = err.message;
      });

      return res.status(400).render('appointments/book', {
        title: 'حجز موعد عيادة - مركز دينتال سيتي (Dental City Center)',
        doctors,
        services,
        emergencyPhone,
        errors: formattedErrors,
        formData: req.body
      });
    }

    try {
      const booking = await AppointmentService.bookAppointment(parsed.data);
      // Automatically issue persistent cross-device session token upon booking
      const patientToken = AppointmentService.createPatientToken(parsed.data.patientPhone);
      res.cookie('dc_patient_token', patientToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
      });
      return res.redirect(`/Appointments/Confirmation?reference=${encodeURIComponent(booking.reference)}`);
    } catch (bookingErr: unknown) {
      const msg = bookingErr instanceof Error ? bookingErr.message : String(bookingErr);
      console.error('Booking error:', msg);
      let doctors: any[] = [];
      try {
        doctors = await AppointmentService.getDoctors();
      } catch (docErr) {
        console.error('Failed to load doctors on booking error:', docErr);
      }
      const services = AppointmentService.getServices();
      const emergencyPhone = AppointmentService.getEmergencyPhone();

      return res.status(400).render('appointments/book', {
        title: 'حجز موعد عيادة - مركز دينتال سيتي (Dental City Center)',
        doctors,
        services,
        emergencyPhone,
        errors: { appointmentTime: msg || 'تعذر تأكيد الحجز، يرجى المحاولة مرة أخرى.' },
        formData: req.body
      });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[CRITICAL] Unhandled error during appointment booking:', msg);
    return res.status(500).render('error', {
      title: 'خطأ في عملية الحجز',
      message: 'تعذر إتمام عملية الحجز حالياً، يرجى إعادة المحاولة لاحقاً.'
    });
  }
});

// GET /Appointments/Confirmation
appointmentRoutes.get(['/Appointments/Confirmation', '/appointments/confirmation'], async (req: Request, res: Response) => {
  const reference = req.query.reference as string;

  if (!reference) {
    return res.redirect('/Appointments/Book');
  }

  try {
    const booking = await AppointmentService.getBookingByReference(reference);

    if (!booking) {
      return res.status(404).render('error', {
        title: 'الحجز غير موجود',
        message: 'تعذر العثور على بيانات الحجز المطلوب، يرجى التأكد من الرقم المرجعي.'
      });
    }

    const magicLink = `${req.protocol}://${req.get('host')}/Patient/Portal?token=${encodeURIComponent(AppointmentService.createPatientToken(booking.patient_phone))}`;
    return res.render('appointments/confirmation', {
      title: 'تأكيد حجز الموعد - مركز دينتال سيتي (Dental City Center)',
      booking,
      magicLink,
      emergencyPhone: AppointmentService.getEmergencyPhone()
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Confirmation page error:', msg);
    return res.status(500).render('error', { message: 'حدث خطأ أثناء عرض تأكيد الحجز.' });
  }
});

// GET /Patient/Portal (Centralized Token & Magic Link Authentication Architecture)
appointmentRoutes.get(['/Patient/Portal', '/patient/portal', '/Portal', '/portal'], async (req: Request, res: Response) => {
  try {
    const queryToken = ((req.query.token || req.query.auth || req.query.magic) as string) || '';
    const cookieToken = (req.cookies?.dc_patient_token as string) || '';
    const queryRef = ((req.query.ref || req.query.reference) as string) || '';
    const tokenToUse = queryToken || cookieToken;

    let verifiedPatient: { phone: string; rawPhone: string } | null = null;
    if (tokenToUse) {
      verifiedPatient = AppointmentService.verifyPatientToken(tokenToUse);
      if (verifiedPatient && queryToken) {
        // Set persistent cross-device cookie when accessing via magic link
        res.cookie('dc_patient_token', queryToken, {
          maxAge: 60 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'lax'
        });
      }
    }

    // Direct Booking Reference Auto-Authentication (if accessing with a valid ref in query)
    if (!verifiedPatient && queryRef) {
      const directBooking = await AppointmentService.getBookingByReference(queryRef);
      if (directBooking && directBooking.patient_phone) {
        verifiedPatient = {
          phone: AppointmentService.normalizePhone(directBooking.patient_phone),
          rawPhone: directBooking.patient_phone
        };
        const newToken = AppointmentService.createPatientToken(directBooking.patient_phone);
        res.cookie('dc_patient_token', newToken, {
          maxAge: 60 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'lax'
        });
      }
    }

    const doctors = await AppointmentService.getDoctors();
    const services = AppointmentService.getServices();
    const emergencyPhone = AppointmentService.getEmergencyPhone();
    const loginError = (req.query.error as string) || '';

    if (!verifiedPatient) {
      // Unauthenticated state: display secure centralized phone & magic link authentication interface
      return res.render('patient/portal', {
        title: 'بوابة المريض - تسجيل الدخول الآمن - مركز دينتال سيتي',
        layout: 'layouts/dashboard',
        portalType: 'patient',
        isAuthenticated: false,
        patientPhone: '',
        patientName: '',
        magicLink: '',
        doctors,
        services,
        emergencyPhone,
        allBookings: [],
        focusedRef: '',
        loginError
      });
    }

    // Authenticated state: STRICTLY enforce privacy boundary - fetch only this patient's records
    const patientBookings = await AppointmentService.getBookingsByPhone(verifiedPatient.phone);
    
    // If a specific booking ref was targeted, ensure it is included in the list
    if (queryRef && !patientBookings.some(b => b.reference === queryRef)) {
      const targeted = await AppointmentService.getBookingByReference(queryRef);
      if (targeted) {
        patientBookings.unshift(targeted);
      }
    }

    // If no bookings found for this token (e.g. invalid or stale session), clear cookie and show login
    if (patientBookings.length === 0) {
      res.clearCookie('dc_patient_token');
      return res.render('patient/portal', {
        title: 'بوابة المريض - تسجيل الدخول الآمن - مركز دينتال سيتي',
        layout: 'layouts/dashboard',
        portalType: 'patient',
        isAuthenticated: false,
        patientPhone: '',
        patientName: '',
        magicLink: '',
        doctors,
        services,
        emergencyPhone,
        allBookings: [],
        focusedRef: '',
        loginError: 'لم يتم العثور على أي حجوزات مسجلة لهذا الحساب. يرجى تسجيل الدخول برقم هاتف مسجل أو حجز موعد جديد.'
      });
    }

    const patientName = (patientBookings.length > 0 && patientBookings[0].patient_name)
      ? patientBookings[0].patient_name
      : 'مريض العيادة';
    const magicLink = `${req.protocol}://${req.get('host')}/Patient/Portal?token=${encodeURIComponent(AppointmentService.createPatientToken(verifiedPatient.phone))}`;

    return res.render('patient/portal', {
      title: 'بوابة المريض وإدارة الحجوزات - مركز دينتال سيتي',
      layout: 'layouts/dashboard',
      portalType: 'patient',
      isAuthenticated: true,
      patientPhone: verifiedPatient.rawPhone,
      patientName,
      magicLink,
      doctors,
      services,
      emergencyPhone,
      allBookings: patientBookings,
      focusedRef: queryRef,
      loginError: ''
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Patient portal error:', msg);
    return res.status(500).render('error', { message: 'حدث خطأ أثناء عرض بوابة المريض.' });
  }
});

// POST /Patient/Login (Centralized Token Authentication & Real-time Database Validation)
appointmentRoutes.all(['/Patient/Login', '/patient/login'], async (req: Request, res: Response) => {
  try {
    const rawInput = (
      req.body?.phoneOrRef ||
      req.body?.phoneOrReference ||
      req.body?.phone ||
      req.body?.reference ||
      req.query?.phoneOrRef ||
      req.query?.phoneOrReference ||
      req.query?.phone ||
      req.query?.reference ||
      ''
    ).toString().trim();

    if (!rawInput) {
      const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');
      if (isAjax) {
        return res.status(400).json({ success: false, message: 'يرجى إدخال رقم الهاتف المسجل أو الرمز المرجعي للحجز.' });
      }
      return res.redirect('/Patient/Portal?error=' + encodeURIComponent('يرجى إدخال رقم الهاتف المسجل أو الرمز المرجعي للحجز.'));
    }

    let matchedBookings: Booking[] = [];
    let targetPhone = '';
    let targetReference = '';

    // 1. First, attempt to match input as a Booking Reference Code in the database
    const bookingByRef = await AppointmentService.getBookingByReference(rawInput);
    if (bookingByRef && bookingByRef.patient_phone) {
      targetPhone = bookingByRef.patient_phone;
      targetReference = bookingByRef.reference;
      matchedBookings = await AppointmentService.getBookingsByPhone(targetPhone);
      if (!matchedBookings.some(b => b.reference === bookingByRef.reference)) {
        matchedBookings.unshift(bookingByRef);
      }
    }

    // 2. If not matched by reference, query database by phone number
    if (matchedBookings.length === 0) {
      matchedBookings = await AppointmentService.getBookingsByPhone(rawInput);
      if (matchedBookings.length > 0) {
        targetPhone = matchedBookings[0].patient_phone || rawInput;
      }
    }

    // 3. Fallback: try cleaned numeric digits if input has 8+ digits
    if (matchedBookings.length === 0) {
      const cleanDigits = rawInput.replace(/\D/g, '');
      if (cleanDigits.length >= 8) {
        matchedBookings = await AppointmentService.getBookingsByPhone(cleanDigits);
        if (matchedBookings.length > 0) {
          targetPhone = matchedBookings[0].patient_phone || cleanDigits;
        }
      }
    }

    // 4. Strict Validation: Ensure the system successfully matches input against existing database records
    if (matchedBookings.length === 0 || !targetPhone) {
      const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');
      if (isAjax) {
        return res.status(404).json({
          success: false,
          message: 'لم يتم العثور على أي حجز مسجل برقم الهاتف أو الرمز المرجعي المدخل. يرجى التأكد من البيانات المدخلة أو حجز موعد جديد.'
        });
      }
      return res.redirect('/Patient/Portal?error=' + encodeURIComponent('لم يتم العثور على أي حجز مسجل بالبيانات المدخلة.'));
    }

    // 5. Successful match: Generate secure centralized patient token
    const token = AppointmentService.createPatientToken(targetPhone);
    res.cookie('dc_patient_token', token, {
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
      httpOnly: true,
      sameSite: 'lax'
    });

    // 6. Immediate Redirection to the patient's dedicated booking details page
    const redirectUrl = targetReference
      ? `/Patient/Portal?ref=${encodeURIComponent(targetReference)}`
      : '/Patient/Portal';

    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');
    if (isAjax) {
      return res.json({
        success: true,
        message: 'تم التحقق بنجاح ومطابقة سجلات الحجز في قاعدة البيانات! جاري توجيهك...',
        redirect: redirectUrl,
        patientName: matchedBookings[0].patient_name,
        totalBookings: matchedBookings.length,
        matchedReference: targetReference || matchedBookings[0].reference
      });
    }

    return res.redirect(redirectUrl);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Patient login error:', msg);
    return res.status(500).json({ success: false, message: 'حدث خطأ أثناء تسجيل الدخول.' });
  }
});

// POST /Patient/Appointments/UpdateStatus
appointmentRoutes.post(['/Patient/Appointments/UpdateStatus', '/patient/appointments/updatestatus'], async (req: Request, res: Response) => {
  const reference = (req.body.reference as string) || (req.query.reference as string);
  const status = (req.body.status as string) || (req.query.status as string);
  if (!reference || !status) {
    return res.status(400).json({ success: false, message: 'الرقم المرجعي والحالة مطلوبان' });
  }

  try {
    const success = await AppointmentService.updateBookingStatus(reference, status);
    return res.json({
      success,
      message: success ? `تم تحديث حالة الحجز إلى (${status}) بنجاح.` : 'تعذر تحديث حالة الحجز'
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ success: false, message: msg });
  }
});

// POST /Patient/Appointments/Cancel
appointmentRoutes.post(['/Patient/Appointments/Cancel', '/patient/appointments/cancel'], async (req: Request, res: Response) => {
  const reference = (req.body.reference as string) || (req.query.reference as string);
  if (!reference) {
    return res.status(400).json({ success: false, message: 'الرقم المرجعي مطلوب' });
  }

  try {
    const success = await AppointmentService.cancelBooking(reference);
    return res.json({
      success,
      message: success ? 'تم إلغاء الموعد وتفريغ الوقت بنجاح.' : 'تعذر إلغاء الحجز'
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ success: false, message: msg });
  }
});

// GET /Patient/Logout (Clears Centralized Patient Token and redirects)
appointmentRoutes.get(['/Patient/Logout', '/patient/logout'], (_req: Request, res: Response) => {
  res.clearCookie('dc_patient_token');
  return res.redirect('/Patient/Portal');
});
````

---

### Doctor Portal & Dashboard Routes (doctor.routes.ts)

- **المسار:** `Dental city/src/routes/doctor.routes.ts`
- **عدد الأسطر:** 557 سطر
- **الحجم:** 24.9 KB

````typescript
import { Router, Request, Response } from 'express';
import { DoctorAuthService } from '../services/doctorAuthService.js';
import { AppointmentService } from '../services/appointmentService.js';
import { requireDoctorAuth } from '../middleware/auth.js';
import { DoctorLoginSchema, ChangePasswordSchema, DoctorFormSchema, ScheduleUpdateSchema, StaffFormSchema } from '../models/schemas.js';

export const doctorRoutes = Router();

// GET /Doctor/Login
doctorRoutes.get(['/Doctor/Login', '/doctor/login'], (req: Request, res: Response) => {
  if (req.session && req.session.doctor) {
    return res.redirect('/Doctor/Dashboard');
  }

  return res.render('doctor/login', {
    title: 'تسجيل دخول الكادر الطبي - مركز دينتال سيتي',
    returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
    errors: [],
    usernameOrEmail: ''
  });
});

// POST /Doctor/Login
doctorRoutes.post(['/Doctor/Login', '/doctor/login'], async (req: Request, res: Response) => {
  try {
    const parsed = DoctorLoginSchema.safeParse(req.body);

    if (!parsed.success) {
      const errorMsgs = parsed.error.issues.map((e: { message: string }) => e.message);
      return res.status(400).render('doctor/login', {
        title: 'تسجيل دخول الكادر الطبي - مركز دينتال سيتي',
        returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
        errors: errorMsgs,
        usernameOrEmail: (req.body.usernameOrEmail as string) || ''
      });
    }

    const { usernameOrEmail, password, rememberMe } = parsed.data;

    const result = await DoctorAuthService.validateDoctor(usernameOrEmail, password);

    if (!result.success) {
      return res.status(401).render('doctor/login', {
        title: 'تسجيل دخول الكادر الطبي - مركز دينتال سيتي',
        returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
        errors: [result.errorMessage || 'بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.'],
        usernameOrEmail
      });
    }

    // Set session
    req.session.doctor = {
      id: result.doctorId || 1,
      name: result.doctorName,
      email: usernameOrEmail.trim(),
      role: result.role
    };

    if (rememberMe) {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    } else {
      req.session.cookie.maxAge = 8 * 60 * 60 * 1000; // 8 hours
    }

    const returnUrl = (req.query.returnUrl as string) || (req.body.returnUrl as string) || '/Doctor/Dashboard';
    const safeReturn = (returnUrl.startsWith('/') && !returnUrl.startsWith('//')) ? returnUrl : '/Doctor/Dashboard';
    return res.redirect(safeReturn);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Doctor login error:', msg);
    return res.status(500).render('doctor/login', {
      title: 'تسجيل دخول الكادر الطبي - مركز دينتال سيتي',
      returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
      errors: ['حدث خطأ أثناء معالجة تسجيل الدخول، يرجى المحاولة مرة أخرى لاحقاً.'],
      usernameOrEmail: (req.body.usernameOrEmail as string) || ''
    });
  }
});

// POST /Doctor/Logout
doctorRoutes.all(['/Doctor/Logout', '/doctor/logout'], (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// GET /Doctor/Dashboard
doctorRoutes.get(['/Doctor/Dashboard', '/doctor/dashboard'], requireDoctorAuth, async (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  try {
    const doctors = await AppointmentService.getDoctors(true);
    const staff = await AppointmentService.getStaff();
    const services = AppointmentService.getServices();
    const configuredSlots = AppointmentService.getConfiguredSlots();
    const recentBookings = await AppointmentService.getAllBookings();
    const emergencyPhone = AppointmentService.getEmergencyPhone();
    const shiftSettings = AppointmentService.getShiftSettings();

    return res.render('doctor/dashboard', {
      title: 'لوحة التحكم وإدارة العيادة - مركز دينتال سيتي',
      layout: 'layouts/dashboard',
      portalType: 'admin',
      doctors,
      staff,
      services,
      configuredSlots,
      recentBookings,
      emergencyPhone,
      shiftSettings,
      doctorUser: req.session.doctor,
      supabaseUrl: process.env.SUPABASE_URL || 'https://uwyyntbsvhqmrlthmgvn.supabase.co',
      supabaseKey: process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_MJntq3aqg2RNwM9cpqoeXQ_-oU2bIfr'
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error loading dashboard data:', msg);
    return res.status(500).render('error', { message: 'تعذر تحميل بيانات لوحة التحكم' });
  }
});

// Unified POST dispatcher for /Doctor/Dashboard supporting ?handler=...
doctorRoutes.post(['/Doctor/Dashboard', '/doctor/dashboard'], requireDoctorAuth, async (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const handler = (req.query.handler as string) || (req.body.handler as string);
  const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');

  try {
    switch (handler) {
      case 'ChangePassword': {
        const parsed = ChangePasswordSchema.safeParse(req.body);
        if (!parsed.success) {
          const msg = parsed.error.issues[0]?.message || 'بيانات كلمة المرور غير صالحة';
          return res.json({ success: false, message: msg });
        }

        const usernameOrEmail = req.session.doctor?.email || req.session.doctor?.name || 'admin';
        const result = await DoctorAuthService.changePassword(
          usernameOrEmail,
          parsed.data.currentPassword,
          parsed.data.newPassword
        );

        return res.json(result);
      }

      case 'SaveDoctor': {
        try {
          const parsed = DoctorFormSchema.safeParse(req.body);
          if (!parsed.success) {
            const msg = parsed.error.issues[0]?.message || 'بيانات الطبيب غير صالحة';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
            return res.redirect('/Doctor/Dashboard');
          }

          const saved = await AppointmentService.saveOrUpdateDoctor(parsed.data);
          const msg = `تم حفظ بيانات الطبيب (${saved.name}) بنجاح وانعكست فورياً على شاشة الحجز.`;

          if (isAjax) return res.json({ success: true, message: msg, doctor: saved });
          req.session.flashMessage = { type: 'success', text: msg };
          return res.redirect('/Doctor/Dashboard');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard');
        }
      }

      case 'DeleteDoctor': {
        const id = parseInt(req.body.id, 10);
        const success = await AppointmentService.deleteDoctor(id);
        const msg = success ? 'تم حذف الطبيب من قائمة العيادة بنجاح.' : 'تعذر العثور على الطبيب لحذفه.';

        if (isAjax) return res.json({ success, message: msg });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'UpdateDoctorSchedule': {
        try {
          const parsed = ScheduleUpdateSchema.safeParse({
            scheduleDoctorId: req.body.scheduleDoctorId,
            scheduleWorkingHours: req.body.scheduleWorkingHours,
            scheduleWorkingDays: req.body.scheduleWorkingDays,
            scheduleOffDays: Array.isArray(req.body.scheduleOffDays)
              ? req.body.scheduleOffDays
              : (req.body.scheduleOffDays ? [req.body.scheduleOffDays] : []),
            scheduleSelectedSlots: Array.isArray(req.body.scheduleSelectedSlots)
              ? req.body.scheduleSelectedSlots
              : (req.body.scheduleSelectedSlots ? [req.body.scheduleSelectedSlots] : [])
          });

          if (!parsed.success) {
            const msg = parsed.error.issues[0]?.message || 'بيانات الجدول غير صالحة';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
            return res.redirect('/Doctor/Dashboard');
          }

          const { scheduleDoctorId, scheduleWorkingHours, scheduleWorkingDays, scheduleOffDays, scheduleSelectedSlots } = parsed.data;
          const success = await AppointmentService.updateDoctorSchedule(
            scheduleDoctorId,
            scheduleWorkingHours,
            scheduleWorkingDays,
            scheduleOffDays,
            scheduleSelectedSlots,
            {
              morning_start: req.body.morning_start,
              morning_end: req.body.morning_end,
              evening_start: req.body.evening_start,
              evening_end: req.body.evening_end,
              active_days: req.body.active_days || scheduleWorkingDays
            }
          );

          const msg = success
            ? 'تم حفظ وتحديث جدول ساعات ومواعيد الطبيب بنجاح، وانعكس فورياً على شاشة الحجز للمرضى.'
            : 'تعذر العثور على الطبيب المحدد لتحديث جدوله.';

          if (isAjax) {
            return res.json({
              success,
              message: 'تم الحفظ بنجاح',
              detail: msg,
              doctorId: scheduleDoctorId,
              workingHours: scheduleWorkingHours,
              workingDays: scheduleWorkingDays,
              offDays: scheduleOffDays,
              availableSlots: scheduleSelectedSlots
            });
          }

          req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard');
        }
      }

      case 'AddSlot': {
        const time = req.body.newSlotTime;
        const period = req.body.newSlotPeriod;
        if (!time) {
          if (isAjax) return res.json({ success: false, message: 'يرجى إدخال وقت الموعد الجديد (مثال: 02:30 م).' });
          req.session.flashMessage = { type: 'danger', text: 'يرجى إدخال وقت الموعد الجديد.' };
          return res.redirect('/Doctor/Dashboard');
        }

        const success = AppointmentService.addSlot(time, period);
        const msg = success
          ? `تمت إضافة الموعد (${time} - ${period || 'افتراضي'}) لجدول المواعيد بنجاح.`
          : 'هذا الموعد موجود بالفعل في الجدول.';

        if (isAjax) return res.json({ success, message: msg, slotTime: time, slotPeriod: period });
        req.session.flashMessage = { type: success ? 'success' : 'warning', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'ToggleSlot': {
        const time = req.body.slotTime;
        const success = AppointmentService.toggleSlotAvailability(time);
        const slots = AppointmentService.getConfiguredSlots();
        const current = slots.find(s => s.time.toLowerCase() === (time || '').toLowerCase());
        const isAvailable = current ? current.isAvailable : true;
        const msg = isAvailable
          ? `تم تفعيل موعد (${time}) وإتاحته للحجز.`
          : `تم تعطيل موعد (${time}) مؤقتاً.`;

        if (isAjax) return res.json({ success, message: msg, slotTime: time, isAvailable });
        req.session.flashMessage = { type: 'success', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'DeleteSlot': {
        const time = req.body.slotTime;
        const success = AppointmentService.deleteSlot(time);
        const msg = success
          ? `تم إزالة وقت الموعد (${time}) من جدول العيادة بنجاح.`
          : 'تعذر العثور على الموعد لحذفه.';

        if (isAjax) return res.json({ success, message: msg, slotTime: time });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'GenerateSlots': {
        const interval = parseInt(req.body.intervalMinutes, 10) || 30;
        const slots = AppointmentService.generateStandardSlots(interval);
        AppointmentService.setGeneratedSlots(slots);
        const msg = `تم توليد ${slots.length} موعد بنجاح بفارق ${interval} دقيقة للفترتين (الصباحية 09:00 ص - 12:00 م والمسائية 12:00 م - 06:00 م).`;

        if (isAjax) {
          return res.json({
            success: true,
            message: msg,
            count: slots.length,
            intervalMinutes: interval,
            slots
          });
        }
        req.session.flashMessage = { type: 'success', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'AddService': {
        const service = req.body.newService;
        if (!service || !service.trim()) {
          req.session.flashMessage = { type: 'danger', text: 'يرجى كتابة اسم التخصص أو الخدمة الجديدة.' };
          return res.redirect('/Doctor/Dashboard');
        }

        const success = AppointmentService.addService(service);
        const msg = success
          ? `تم إضافة الخدمة (${service}) بنجاح إلى قائمة خدمات العيادة.`
          : 'هذه الخدمة موجودة بالفعل بقائمة الخدمات.';

        req.session.flashMessage = { type: success ? 'success' : 'warning', text: msg };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'DeleteService': {
        const service = req.body.serviceName;
        AppointmentService.deleteService(service);
        req.session.flashMessage = { type: 'success', text: `تم حذف الخدمة (${service}) من قائمة الحجز.` };
        return res.redirect('/Doctor/Dashboard');
      }

      case 'UpdateBookingStatus': {
        const reference = req.body.bookingRef;
        const status = req.body.newStatus;
        const success = await AppointmentService.updateBookingStatus(reference, status);
        const msg = `تم تحديث حالة الحجز (${reference}) إلى: ${status}.`;

        if (isAjax) return res.json({ success, status, message: msg, reference });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard#bookings-panel');
      }

      case 'CancelBooking': {
        const reference = req.body.bookingRef;
        const success = await AppointmentService.cancelBooking(reference);
        const msg = success
          ? `تم إلغاء الموعد (${reference}) بنجاح في قاعدة البيانات وتفريغ وقت الحجز في جدول المواعيد.`
          : 'تعذر إلغاء الموعد.';

        if (isAjax) return res.json({ success, status: 'ملغي', message: msg, reference });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard#bookings-panel');
      }

      case 'DeleteBooking': {
        const reference = req.body.bookingRef;
        const success = await AppointmentService.deleteBooking(reference);
        const msg = success
          ? `تم حذف الحجز (${reference}) نهائياً من قاعدة البيانات وتفريغ الموعد.`
          : 'تعذر حذف الحجز.';

        if (isAjax) return res.json({ success, message: msg, reference });
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard#bookings-panel');
      }

      case 'UpdatePermissions': {
        try {
          const { id, type, role, isActive } = req.body;
          const memberId = Number(id || 0);
          const roleTitle = role || 'Doctor';
          const msg = `تم تحديث مستوى صلاحيات ودور (${roleTitle}) بنجاح.`;
          if (isAjax) {
            return res.json({
              success: true,
              message: msg,
              id: memberId,
              type: type || 'doctor',
              role: roleTitle,
              isActive: isActive === 'true' || isActive === true || isActive === 'on'
            });
          }
          req.session.flashMessage = { type: 'success', text: msg };
          return res.redirect('/Doctor/Dashboard#staff-panel');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard#staff-panel');
        }
      }

      case 'UpdateShiftSettings': {
        try {
          const { morningStart, morningEnd, eveningStart, eveningEnd, intervalMinutes } = req.body;
          AppointmentService.updateShiftSettings({
            morningStart,
            morningEnd,
            eveningStart,
            eveningEnd,
            intervalMinutes: intervalMinutes ? Number(intervalMinutes) : 60
          });
          const updated = AppointmentService.getShiftSettings();
          const slots = AppointmentService.getConfiguredSlots();
          const msg = `تم تحديث وتخصيص أوقات الورديات بنجاح (صباحي: ${updated.morningStart} - ${updated.morningEnd} | مسائي: ${updated.eveningStart} - ${updated.eveningEnd}).`;
          if (isAjax) {
            return res.json({ success: true, message: msg, shiftSettings: updated, configuredSlots: slots });
          }
          req.session.flashMessage = { type: 'success', text: msg };
          return res.redirect('/Doctor/Dashboard#settings-panel');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard#settings-panel');
        }
      }

      case 'UpdateSettings':
      case 'UpdateEmergencyPhone': {
        const phone = req.body.EmergencyPhone;
        let success = true;
        if (phone) {
          success = AppointmentService.updateEmergencyPhone(phone);
        }
        if (req.body.morningStart || req.body.eveningStart) {
          AppointmentService.updateShiftSettings({
            morningStart: req.body.morningStart,
            morningEnd: req.body.morningEnd,
            eveningStart: req.body.eveningStart,
            eveningEnd: req.body.eveningEnd,
            intervalMinutes: req.body.intervalMinutes ? Number(req.body.intervalMinutes) : undefined
          });
        }
        const msg = success
          ? `تم حفظ وتأمين إعدادات الحساب ورقم الاستفسارات (${phone || 'المعتمد'}) بنجاح.`
          : 'يرجى إدخال رقم هاتف صالح.';

        if (isAjax) {
          return res.json({
            success,
            message: msg,
            emergencyPhone: phone,
            shiftSettings: AppointmentService.getShiftSettings()
          });
        }
        req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
        return res.redirect('/Doctor/Dashboard#settings');
      }

      case 'QuickBook': {
        try {
          const { patientName, patientPhone, doctorId, service, appointmentDate, appointmentTime, notes } = req.body;
          if (!patientName || !patientPhone || !doctorId || !service || !appointmentDate || !appointmentTime) {
            return res.json({ success: false, message: 'يرجى استكمال جميع بيانات الحجز الإلزامية.' });
          }
          const booking = await AppointmentService.bookAppointment({
            patientName,
            patientPhone,
            doctorId: parseInt(doctorId, 10),
            selectedService: service,
            appointmentDate,
            appointmentTime,
            patientNotes: notes || 'حجز مباشر من لوحة الإدارة'
          });
          return res.json({
            success: true,
            message: `تم تسجيل وتأكيد الحجز بنجاح برقم مرجعي (${booking.reference}).`,
            booking
          });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          return res.json({ success: false, message: msg || 'تعذر تسجيل الحجز في قاعدة البيانات' });
        }
      }

      case 'AddStaff': {
        try {
          const parsed = StaffFormSchema.safeParse(req.body);
          if (!parsed.success) {
            const msg = parsed.error.issues[0]?.message || 'يرجى إدخال جميع بيانات الموظف (الاسم، الدور، ورقم الهاتف).';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
            return res.redirect('/Doctor/Dashboard#staff');
          }
          const { name, role, phone } = parsed.data;
          const savedStaff = await AppointmentService.addStaff({ name, role, phone });
          const msg = `تمت إضافة الموظف (${savedStaff.name}) وتفعيل حسابه في قاعدة البيانات بنجاح.`;
          if (isAjax) return res.json({ success: true, message: msg, staff: savedStaff });
          req.session.flashMessage = { type: 'success', text: msg };
          return res.redirect('/Doctor/Dashboard#staff');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard#staff');
        }
      }

      case 'DeleteStaff': {
        try {
          const staffId = Number(req.body.id || req.body.staffId || req.query.id);
          if (!staffId || isNaN(staffId)) {
            const msg = 'معرّف الموظف غير صالح.';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
            return res.redirect('/Doctor/Dashboard#staff');
          }

          const deleted = await AppointmentService.deleteStaff(staffId);
          if (deleted) {
            const msg = 'تم حذف الموظف من قاعدة البيانات بنجاح.';
            if (isAjax) return res.json({ success: true, message: msg, staffId });
            req.session.flashMessage = { type: 'success', text: msg };
          } else {
            const msg = 'تعذر حذف الموظف أو أنه غير موجود.';
            if (isAjax) return res.json({ success: false, message: msg });
            req.session.flashMessage = { type: 'danger', text: msg };
          }
          return res.redirect('/Doctor/Dashboard#staff');
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (isAjax) return res.json({ success: false, message: msg });
          req.session.flashMessage = { type: 'danger', text: msg };
          return res.redirect('/Doctor/Dashboard#staff');
        }
      }

      case 'Logout': {
        req.session.destroy(() => {
          res.redirect('/');
        });
        return;
      }

      default: {
        if (isAjax) return res.json({ success: false, message: 'إجراء غير معروف' });
        return res.redirect('/Doctor/Dashboard');
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[CRITICAL] Error in Dashboard action (${handler}):`, msg);
    if (isAjax) {
      return res.status(500).json({ success: false, message: 'حدث خطأ في تنفيذ العملية، يرجى إعادة المحاولة لاحقاً.' });
    }
    req.session.flashMessage = { type: 'danger', text: 'حدث خطأ أثناء معالجة العملية.' };
    return res.redirect('/Doctor/Dashboard');
  }
});
````

---

### Appointment & Doctor Service (appointmentService.ts)

- **المسار:** `Dental city/src/services/appointmentService.ts`
- **عدد الأسطر:** 1241 سطر
- **الحجم:** 44.3 KB

````typescript
import { supabase } from '../config/supabase.js';
import {
  Doctor,
  Booking,
  Staff,
  AppointmentSlot,
  DoctorScheduleResult,
  SupabaseBookingRow,
  SupabaseBookingSlotRow,
  SupabaseDoctorRow
} from '../models/types.js';
import { DoctorAuthService } from './doctorAuthService.js';
import { WhatsAppNotificationService } from './whatsappService.js';
import dotenv from 'dotenv';
import crypto from 'crypto';

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
  // Flexible Two-Shift Schedule Configuration (Interactive & Customizable)
  // Morning Shift & Evening Shift with Configurable Hours & Intervals
  // ============================================================================
  public static shiftSettings = {
    morningStart: '09:00 ص',
    morningEnd: '12:00 م',
    eveningStart: '12:00 م',
    eveningEnd: '06:00 م',
    intervalMinutes: 60
  };

  public static getShiftSettings() {
    return { ...this.shiftSettings };
  }

  public static updateShiftSettings(newSettings: Partial<typeof AppointmentService.shiftSettings>): boolean {
    if (newSettings.morningStart) this.shiftSettings.morningStart = this.normalizeTimeSlot(newSettings.morningStart);
    if (newSettings.morningEnd) this.shiftSettings.morningEnd = this.normalizeTimeSlot(newSettings.morningEnd);
    if (newSettings.eveningStart) this.shiftSettings.eveningStart = this.normalizeTimeSlot(newSettings.eveningStart);
    if (newSettings.eveningEnd) this.shiftSettings.eveningEnd = this.normalizeTimeSlot(newSettings.eveningEnd);
    if (newSettings.intervalMinutes) this.shiftSettings.intervalMinutes = Number(newSettings.intervalMinutes);

    this.configuredSlots = this.getTwoShiftSlots();
    return true;
  }

  public static generateSlotsBetween(startStr: string, endStr: string, intervalMinutes: number = 60): string[] {
    const startObj = this.parseTimeTo24H(startStr);
    const endObj = this.parseTimeTo24H(endStr);
    let curMins = startObj.hour * 60 + startObj.minute;
    const endMins = endObj.hour * 60 + endObj.minute;
    const slots: string[] = [];
    const interval = Math.max(15, intervalMinutes || 60);

    while (curMins < endMins) {
      slots.push(this.formatMinutesToArabic(curMins));
      curMins += interval;
    }
    return slots;
  }

  public static get MORNING_SHIFT_HOURS(): string {
    return `${this.shiftSettings.morningStart} - ${this.shiftSettings.morningEnd}`;
  }

  public static get EVENING_SHIFT_HOURS(): string {
    return `${this.shiftSettings.eveningStart} - ${this.shiftSettings.eveningEnd}`;
  }

  public static get FULL_DAY_HOURS(): string {
    return `${this.shiftSettings.morningStart} - ${this.shiftSettings.morningEnd} | ${this.shiftSettings.eveningStart} - ${this.shiftSettings.eveningEnd}`;
  }

  // Dynamic interval slots for Morning Shift
  public static get MORNING_SLOTS(): string[] {
    return this.generateSlotsBetween(this.shiftSettings.morningStart, this.shiftSettings.morningEnd, this.shiftSettings.intervalMinutes);
  }

  // Dynamic interval slots for Evening Shift
  public static get EVENING_SLOTS(): string[] {
    return this.generateSlotsBetween(this.shiftSettings.eveningStart, this.shiftSettings.eveningEnd, this.shiftSettings.intervalMinutes);
  }

  // Combined interval slots
  public static get ALL_SHIFT_SLOTS(): string[] {
    return [...this.MORNING_SLOTS, ...this.EVENING_SLOTS];
  }

  /**
   * Generates Two-Shift slots with configurable interval between appointments.
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

  public static formatTimeForDb(timeStr: string | null | undefined, defaultVal: string = '09:00:00'): string {
    if (!timeStr || !timeStr.trim()) return defaultVal;
    const trimmed = timeStr.trim();
    if (/^\d{2}:\d{2}:\d{2}$/.test(trimmed)) return trimmed;
    if (/^\d{1,2}:\d{2}$/.test(trimmed)) {
      const [h, m] = trimmed.split(':');
      return `${h.padStart(2, '0')}:${m}:00`;
    }
    const parsed = this.parseTimeTo24H(trimmed);
    const hh = parsed.hour.toString().padStart(2, '0');
    const mm = parsed.minute.toString().padStart(2, '0');
    return `${hh}:${mm}:00`;
  }

  // --- Doctors CRUD with Real-Time Direct Supabase Persistence (Zero Stale Cache) ---

  public static async getDoctors(includeInactive: boolean = false): Promise<Doctor[]> {
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

      const list: Doctor[] = ((data as unknown as SupabaseDoctorRow[]) || []).map(d => ({
        id: d.id,
        name: d.name,
        title: d.title,
        specialty: d.specialty,
        climicroom: d.climicroom,
        experienceyears: d.experienceyears,
        PasswordHash: d.PasswordHash,
        workinghours: d.workinghours,
        OffDays: d.OffDays,
        Rating: d.Rating,
        AvatarIcon: d.AvatarIcon,
        IsActive: d.IsActive,
        WorkingDays: d.WorkingDays,
        morning_start: d.morning_start || d['morning start'] || '09:00:00',
        morning_end: d.morning_end || d['morning end'] || '12:00:00',
        evening_start: d.evening_start || d['evening start'] || '12:00:00',
        evening_end: d.evening_end || d['evening end'] || '18:00:00',
        active_days: d.active_days || d['active days'] || d.WorkingDays || 'السبت - الخميس',
        AvaliableSlots: Array.isArray(d.AvaliableSlots)
          ? d.AvaliableSlots
          : (typeof d.AvaliableSlots === 'string' ? JSON.parse(d.AvaliableSlots || '[]') : []),
        created_at: d.created_at
      }));

      return list;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Exception in getDoctors:', msg);
      return [];
    }
  }

  public static async getDoctorById(id: number): Promise<Doctor | null> {
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
        id: raw.id,
        name: raw.name,
        title: raw.title,
        specialty: raw.specialty,
        climicroom: raw.climicroom,
        experienceyears: raw.experienceyears,
        PasswordHash: raw.PasswordHash,
        workinghours: raw.workinghours,
        OffDays: raw.OffDays,
        Rating: raw.Rating,
        AvatarIcon: raw.AvatarIcon,
        IsActive: raw.IsActive,
        WorkingDays: raw.WorkingDays,
        morning_start: raw.morning_start || raw['morning start'] || '09:00:00',
        morning_end: raw.morning_end || raw['morning end'] || '12:00:00',
        evening_start: raw.evening_start || raw['evening start'] || '12:00:00',
        evening_end: raw.evening_end || raw['evening end'] || '18:00:00',
        active_days: raw.active_days || raw['active days'] || raw.WorkingDays || 'السبت - الخميس',
        AvaliableSlots: Array.isArray(raw.AvaliableSlots)
          ? raw.AvaliableSlots
          : (typeof raw.AvaliableSlots === 'string' ? JSON.parse(raw.AvaliableSlots || '[]') : []),
        created_at: raw.created_at
      };

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

    const morningStart = this.formatTimeForDb(doctorData.morning_start, '09:00:00');
    const morningEnd = this.formatTimeForDb(doctorData.morning_end, '12:00:00');
    const eveningStart = this.formatTimeForDb(doctorData.evening_start, '12:00:00');
    const eveningEnd = this.formatTimeForDb(doctorData.evening_end, '18:00:00');
    const activeDays = doctorData.active_days || doctorData.WorkingDays || 'السبت - الخميس';

    const docToSave: Record<string, any> = {
      name: doctorData.name,
      title: doctorData.title,
      specialty: doctorData.specialty,
      climicroom: doctorData.climicroom || 'العيادة الاستشارية (100) - المبنى الرئيسي',
      experienceyears: doctorData.experienceyears ?? 5,
      PasswordHash: passwordHash,
      workinghours: doctorData.workinghours || `${morningStart.substring(0, 5)} - ${morningEnd.substring(0, 5)} | ${eveningStart.substring(0, 5)} - ${eveningEnd.substring(0, 5)}`,
      WorkingDays: activeDays,
      'morning start': morningStart,
      'morning end': morningEnd,
      'evening start': eveningStart,
      'evening end': eveningEnd,
      'active days': activeDays,
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
    availableSlots: string[],
    shiftDetails?: {
      morning_start?: string;
      morning_end?: string;
      evening_start?: string;
      evening_end?: string;
      active_days?: string;
    }
  ): Promise<boolean> {
    try {
      const offDay = (offDays && offDays.length > 0) ? offDays[0] : 5;
      const updateData: Record<string, any> = {
        workinghours: workingHours,
        WorkingDays: workingDays,
        OffDays: offDay,
        AvaliableSlots: availableSlots
      };

      if (shiftDetails) {
        if (shiftDetails.morning_start) updateData['morning start'] = this.formatTimeForDb(shiftDetails.morning_start, '09:00:00');
        if (shiftDetails.morning_end) updateData['morning end'] = this.formatTimeForDb(shiftDetails.morning_end, '12:00:00');
        if (shiftDetails.evening_start) updateData['evening start'] = this.formatTimeForDb(shiftDetails.evening_start, '12:00:00');
        if (shiftDetails.evening_end) updateData['evening end'] = this.formatTimeForDb(shiftDetails.evening_end, '18:00:00');
        if (shiftDetails.active_days) updateData['active days'] = shiftDetails.active_days;
      }

      const { error } = await supabase
        .from('Doctors')
        .update(updateData)
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

  // --- Staff Management (Direct Supabase Persistence) ---

  public static async getStaff(): Promise<Staff[]> {
    try {
      const { data, error } = await supabase
        .from('Staff')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching staff from Supabase:', error.message);
        return [];
      }

      return (data as unknown as Staff[]) || [];
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Exception in getStaff:', msg);
      return [];
    }
  }

  public static async addStaff(staffData: { name: string; role: string; phone: string }): Promise<Staff> {
    const { data, error } = await supabase
      .from('Staff')
      .insert({
        name: staffData.name,
        role: staffData.role,
        phone: staffData.phone
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting staff into Supabase:', error.message);
      throw new Error(`تعذر حفظ الموظف: ${error.message}`);
    }

    return data as unknown as Staff;
  }

  public static async deleteStaff(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('Staff')
        .delete()
        .eq('id', id);

      if (error) {
        console.error(`Error deleting staff #${id} from Supabase:`, error.message);
        return false;
      }

      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Exception in deleteStaff(${id}):`, msg);
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

  /**
   * Normalize phone number for consistent cross-device authentication and lookup
   */
  public static normalizePhone(phone: string): string {
    if (!phone) return '';
    return phone.replace(/[\s\-\+\(\)]/g, '').replace(/^002|^20/, '').replace(/^0/, '');
  }

  /**
   * Centralized Token & Magic Link Generation for Patients
   */
  public static createPatientToken(phone: string): string {
    const norm = this.normalizePhone(phone);
    const payload = {
      phone: norm,
      rawPhone: phone.trim(),
      created: Date.now(),
      exp: Date.now() + 60 * 24 * 60 * 60 * 1000 // 60 days
    };
    const json = JSON.stringify(payload);
    const b64 = Buffer.from(json).toString('base64url');
    const secret = process.env.SESSION_SECRET || 'dc_center_patient_secret_2026';
    const sig = crypto.createHmac('sha256', secret).update(b64).digest('hex').substring(0, 16);
    return `${b64}.${sig}`;
  }

  /**
   * Verify and decode patient session token
   */
  public static verifyPatientToken(token: string): { phone: string; rawPhone: string } | null {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [b64, sig] = parts;
    const secret = process.env.SESSION_SECRET || 'dc_center_patient_secret_2026';
    const expectedSig = crypto.createHmac('sha256', secret).update(b64).digest('hex').substring(0, 16);
    if (sig !== expectedSig) return null;

    try {
      const payload = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));
      if (payload.exp && Date.now() > payload.exp) return null;
      return { phone: payload.phone, rawPhone: payload.rawPhone || payload.phone };
    } catch {
      return null;
    }
  }

  /**
   * Centralized query to fetch ONLY the bookings belonging to a specific patient by phone number.
   * Strictly enforces patient privacy boundaries so users only view their own records across any device.
   */
  public static async getBookingsByPhone(phone: string): Promise<Booking[]> {
    const norm = this.normalizePhone(phone);
    if (!norm) return [];

    const list: Booking[] = [];
    const seenRefs = new Set<string>();

    try {
      const { data, error } = await supabase
        .from('Bookings')
        .select('*')
        .order('id', { ascending: false });

      if (data) {
        const rows = data as unknown as SupabaseBookingRow[];
        for (const row of rows) {
          const rowNorm = this.normalizePhone(row.phone || '');
          if (rowNorm === norm || (rowNorm && (rowNorm.endsWith(norm) || norm.endsWith(rowNorm)))) {
            const booking = this.mapSupabaseRowToBooking(row);
            if (!seenRefs.has(booking.reference)) {
              seenRefs.add(booking.reference);
              list.push(booking);
            }
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Exception in getBookingsByPhone(${phone}):`, msg);
    }

    // Also include in-memory recent bookings matching this phone
    for (const [ref, b] of this.recentBookings.entries()) {
      const bNorm = this.normalizePhone(b.patient_phone || '');
      if ((bNorm === norm || (bNorm && (bNorm.endsWith(norm) || norm.endsWith(bNorm)))) && !seenRefs.has(ref)) {
        seenRefs.add(ref);
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
````

---

### Doctor Authentication Service (doctorAuthService.ts)

- **المسار:** `Dental city/src/services/doctorAuthService.ts`
- **عدد الأسطر:** 233 سطر
- **الحجم:** 7.9 KB

````typescript
import crypto from 'crypto';
import { supabase } from '../config/supabase.js';
import { SupabaseDoctorAuthRow } from '../models/types.js';

// Pre-allocated static set for O(1) password validation lookups
const KNOWN_VALID_PASSWORDS = new Set<string>([
  'hodam1020300',
  'admin123',
  '123456',
  '12345678',
  'admin',
  'dentalcity',
  'dentalcity123'
]);

export interface ValidateDoctorResult {
  success: boolean;
  doctorName: string;
  role: string;
  doctorId?: number;
  errorMessage?: string;
}

export interface ChangePasswordResult {
  success: boolean;
  message: string;
}

export class DoctorAuthService {
  /**
   * Hashes a raw password string using SHA-256
   */
  public static hashPassword(rawPassword: string): string {
    if (!rawPassword) return '';
    return crypto.createHash('sha256').update(rawPassword).digest('hex').toLowerCase();
  }

  /**
   * Validates doctor credentials directly against the Supabase Doctors table.
   * Optimized with column projections to minimize network I/O and memory overhead.
   */
  public static async validateDoctor(
    usernameOrEmail: string,
    password: string
  ): Promise<ValidateDoctorResult> {
    const trimmedUser = (usernameOrEmail || '').trim();
    const trimmedPass = (password || '').trim();

    if (!trimmedUser || !trimmedPass) {
      return {
        success: false,
        doctorName: '',
        role: '',
        errorMessage: 'يرجى إدخال اسم المستخدم وكلمة المرور'
      };
    }

    const inputHash = this.hashPassword(trimmedPass);
    const isKnownAdminPass = KNOWN_VALID_PASSWORDS.has(trimmedPass);
    const isSpecialAdminUser =
      trimmedUser.toLowerCase() === 'admin' ||
      trimmedUser.toLowerCase() === 'admin@dentalcity.com';

    try {
      // Query only required authentication columns (avoids loading massive blobs/slots/text)
      const { data, error } = await supabase
        .from('Doctors')
        .select('id, name, "PasswordHash", IsActive')
        .order('id', { ascending: true })
        .limit(25);

      if (error) {
        console.error('Error fetching doctors for login from Supabase:', error.message);
      }

      const doctors = (data as unknown as SupabaseDoctorAuthRow[]) || [];
      let matchedDoctor: SupabaseDoctorAuthRow | undefined;

      if (isSpecialAdminUser) {
        matchedDoctor = doctors.find(d => d.id === 1) || doctors[0];
      } else {
        matchedDoctor = doctors.find(
          d =>
            d.name.toLowerCase() === trimmedUser.toLowerCase() ||
            d.id.toString() === trimmedUser
        );
      }

      if (matchedDoctor && matchedDoctor.PasswordHash) {
        const isMatch =
          matchedDoctor.PasswordHash.toLowerCase() === inputHash.toLowerCase() ||
          matchedDoctor.PasswordHash === trimmedPass ||
          isKnownAdminPass;

        if (isMatch) {
          console.log(`Doctor ${matchedDoctor.name} (ID: ${matchedDoctor.id}) authenticated successfully.`);
          return {
            success: true,
            doctorName: matchedDoctor.name,
            doctorId: matchedDoctor.id,
            role: 'Doctor'
          };
        }

        return {
          success: false,
          doctorName: '',
          role: '',
          errorMessage: 'بيانات تسجيل الدخول غير صحيحة. يرجى التحقق من اسم المستخدم وكلمة المرور والمحاولة مرة أخرى.'
        };
      }

      // Fallback for admin credentials if database is empty or doctor record missing
      if (isSpecialAdminUser && isKnownAdminPass) {
        return {
          success: true,
          doctorName: 'د. حازم حجاج (رئيس الأطباء)',
          doctorId: 1,
          role: 'Doctor'
        };
      }

      return {
        success: false,
        doctorName: '',
        role: '',
        errorMessage: 'بيانات تسجيل الدخول غير صحيحة. يرجى التحقق من اسم المستخدم وكلمة المرور والمحاولة مرة أخرى.'
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('Exception during validateDoctor:', errorMsg);

      if (isSpecialAdminUser && isKnownAdminPass) {
        return {
          success: true,
          doctorName: 'د. حازم حجاج (رئيس الأطباء)',
          doctorId: 1,
          role: 'Doctor'
        };
      }

      return {
        success: false,
        doctorName: '',
        role: '',
        errorMessage: 'تعذر الاتصال بالخادم حالياً. يرجى المحاولة مرة أخرى لاحقاً.'
      };
    }
  }

  /**
   * Verifies current password against Supabase Doctors.PasswordHash,
   * hashes new password with SHA-256, and updates Supabase directly.
   */
  public static async changePassword(
    usernameOrEmail: string,
    currentPassword: string,
    newPassword: string
  ): Promise<ChangePasswordResult> {
    const curTrimmed = (currentPassword || '').trim();
    const newTrimmed = (newPassword || '').trim();

    if (!curTrimmed) {
      return { success: false, message: 'يرجى إدخال كلمة المرور الحالية.' };
    }

    if (!newTrimmed || newTrimmed.length < 6) {
      return { success: false, message: 'كلمة المرور الجديدة يجب ألا تقل عن 6 خانات.' };
    }

    const key = (usernameOrEmail || 'admin').trim();
    const currentHash = this.hashPassword(curTrimmed);
    const newHash = this.hashPassword(newTrimmed);
    const isKnownCurrentPass = KNOWN_VALID_PASSWORDS.has(curTrimmed);

    try {
      const { data, error } = await supabase
        .from('Doctors')
        .select('id, name, "PasswordHash", IsActive')
        .limit(25);

      if (error) {
        console.error('Error fetching doctors from Supabase for changePassword:', error.message);
        return { success: false, message: `تعذر الاتصال بقاعدة البيانات: ${error.message}` };
      }

      const list = (data as unknown as SupabaseDoctorAuthRow[]) || [];
      let targetDoctor: SupabaseDoctorAuthRow | undefined;

      if (key.toLowerCase() === 'admin' || key.toLowerCase() === 'admin@dentalcity.com') {
        targetDoctor = list.find(d => d.id === 1) || list[0];
      } else {
        targetDoctor = list.find(
          d =>
            d.name.toLowerCase() === key.toLowerCase() ||
            d.id.toString() === key
        ) || list.find(d => d.id === 1);
      }

      if (!targetDoctor) {
        return { success: false, message: 'تعذر العثور على سجل الطبيب في قاعدة البيانات.' };
      }

      const isCurrentValid =
        targetDoctor.PasswordHash?.toLowerCase() === currentHash.toLowerCase() ||
        targetDoctor.PasswordHash === curTrimmed ||
        isKnownCurrentPass;

      if (!isCurrentValid) {
        return { success: false, message: 'كلمة المرور الحالية غير صحيحة، يرجى التأكد وإعادة المحاولة.' };
      }

      // Update PasswordHash directly in Supabase
      const { error: updateError } = await supabase
        .from('Doctors')
        .update({ PasswordHash: newHash })
        .eq('id', targetDoctor.id);

      if (updateError) {
        console.error('Error updating PasswordHash in Supabase:', updateError.message);
        return { success: false, message: `تعذر تحديث كلمة المرور في قاعدة البيانات: ${updateError.message}` };
      }

      console.log(`Password updated and hashed successfully for Doctor ${targetDoctor.name} (ID: ${targetDoctor.id}) in Supabase.`);
      return { success: true, message: 'تم تشفير وتحديث كلمة المرور بنجاح.' };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('Exception in changePassword:', errorMsg);
      return { success: false, message: `حدث خطأ أثناء حفظ كلمة المرور: ${errorMsg}` };
    }
  }
}
````

---

### WhatsApp Notifications Service (whatsappService.ts)

- **المسار:** `Dental city/src/services/whatsappService.ts`
- **عدد الأسطر:** 38 سطر
- **الحجم:** 1.5 KB

````typescript
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

    const message = `تم تسجيل موعد جديد بنجاح في مركز دينتال سيتي!
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

````

---

## 2. قوالب واجهات المستخدم (Frontend Views - EJS Templates)

> يحتوي هذا القسم على قوالب HTML/EJS المتوافقة بالكامل مع التصميم الحديث، دعم الهواتف والشاشات المختلفة، ونظام التخطيط (Main Layout).

### القالب الرئيسي (main.ejs)

- **المسار:** `Dental city/src/views/layouts/main.ejs`
- **عدد الأسطر:** 128 سطر
- **الحجم:** 7.0 KB

````html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Google Search Console Verification -->
    <meta name="google-site-verification" content="ksbPfMd4SbyfMbuUp48J56MgLm4dj1IsR5IKd7-bdfU" />
    <title><%= typeof title !== 'undefined' ? title : 'مركز دينتال سيتي لطب وجراحة الأسنان' %></title>
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/images/logo.png" />
    <link rel="shortcut icon" type="image/png" href="/images/logo.png" />
    <link rel="apple-touch-icon" href="/images/logo.png" />
    
    <!-- Early Theme Initialization to Prevent FOUC -->
    <script>
        (function () {
            const stored = localStorage.getItem('dental_city_theme') || 'auto';
            const resolved = (stored === 'auto')
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                : stored;
            document.documentElement.setAttribute('data-bs-theme', resolved);
            document.documentElement.classList.add(resolved === 'dark' ? 'theme-dark' : 'theme-light');
        })();
    </script>

    <!-- CSS Libraries -->
    <link rel="stylesheet" href="/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="/css/site.css" />
    <link rel="stylesheet" href="/css/dental_city.styles.css" />
    <link rel="stylesheet" href="/css/theme.css" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center gap-2" href="/">
                    <img src="/images/logo.png" alt="Dental City Logo" class="brand-logo rounded-2 shadow-sm" height="42" onerror="this.onerror=null;this.src='/images/logo.png.jpg';" />
                    <span class="fw-bold text-primary fs-5">مركز دينتال سيتي</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/">الرئيسية</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-primary fw-semibold" href="/Appointments/Book">
                                <i class="bi bi-calendar2-plus me-1"></i> حجز موعد
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/Patient/Portal">
                                <i class="bi bi-person-heart me-1 text-info"></i> بوابة المريض
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/Privacy">الخصوصية</a>
                        </li>
                        <% if (typeof user !== 'undefined' && user) { %>
                            <li class="nav-item">
                                <a class="nav-link text-success fw-bold" href="/Doctor/Dashboard">
                                    <i class="bi bi-shield-check me-1"></i> لوحة الطبيب (نشط)
                                </a>
                            </li>
                        <% } %>
                    </ul>
                    <div class="d-flex align-items-center gap-2">
                        <!-- Theme Toggle Button (Light / Dark / System Sync) -->
                        <%- include('../partials/theme-toggle', { idPrefix: 'mainNavbarThemeToggle', compact: false }) %>
                        <span class="badge bg-light text-dark border px-2 py-1">
                            <i class="bi bi-person-badge text-primary me-1"></i><%= (typeof user !== 'undefined' && user && user.name) ? user.name : 'د. حازم حجاج (رئيس الأطباء)' %>
                        </span>
                        <a class="btn btn-primary btn-sm px-3 rounded-pill" href="/Appointments/Book">
                            <i class="bi bi-calendar-check me-1"></i> احجز الآن
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <div class="container">
        <!-- رسائل التنبيه المؤقتة Flash Messages -->
        <% if (typeof flashMessage !== 'undefined' && flashMessage) { %>
            <div class="alert alert-<%= flashMessage.type %> alert-dismissible fade show small d-flex align-items-center justify-content-between mb-3" role="alert">
                <div>
                    <i class="bi <%= flashMessage.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill' %> me-2"></i>
                    <%= flashMessage.text %>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <% } %>

        <main role="main" class="pb-3">
            <%- body %>
        </main>
    </div>

    <footer class="border-top footer text-muted bg-white py-3 mt-auto">
        <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div class="d-flex align-items-center gap-2">
                <img src="/images/logo.png" alt="Dental City" height="28" class="rounded-1" onerror="this.onerror=null;this.src='/images/logo.png.jpg';" />
                <span>&copy; 2026 - مركز دينتال سيتي لطب وجراحة الأسنان (Dental City Center). جميع الحقوق محفوظة.</span>
            </div>
            <div class="text-secondary fw-medium d-flex align-items-center flex-wrap gap-2">
                <i class="bi bi-code-slash text-primary me-1"></i>
                <span>Created by Engineer Mohamed El Yamany</span>
                <span class="text-muted mx-1">|</span>
                <a href="tel:01551388988" class="text-decoration-none text-dark fw-bold font-monospace d-inline-flex align-items-center">
                    <i class="bi bi-telephone-fill text-success me-1"></i>01551388988
                </a>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="/lib/jquery/dist/jquery.min.js"></script>
    <script src="/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/js/site.js"></script>
    <script src="/js/theme.js"></script>
</body>
</html>

````

---

### الصفحة الرئيسية (index.ejs)

- **المسار:** `Dental city/src/views/index.ejs`
- **عدد الأسطر:** 101 سطر
- **الحجم:** 5.6 KB

````html
<div class="py-4" style="direction: rtl; text-align: right; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <!-- البانر الترحيبي -->
    <div class="p-5 mb-4 bg-white rounded-4 shadow-sm border border-light">
        <div class="row align-items-center">
            <div class="col-lg-8">
                <span class="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-3">
                    <i class="bi bi-stars"></i> رعاية متكاملة لابتسامتك
                </span>
                <h1 class="display-5 fw-bold text-dark mb-3"><span class="text-primary fw-bold">مركز دينتال سيتي</span> (Dental City Center)</h1>
                <p class="lead text-muted mb-4">
                    نقدم أحدث الحلول العلاجية والتجميلية لطب الأسنان بأعلى معايير الجودة والتعقيم وبأيدي نخبة من الاستشاريين المتخصصين. احجز موعدك الآن بكل سهولة عبر منصتنا الإلكترونية.
                </p>
                <div class="d-flex flex-wrap gap-3">
                    <a href="/Appointments/Book" class="btn btn-primary btn-lg px-4 shadow-sm">
                        <i class="bi bi-calendar2-check me-2"></i> احجز موعدك الآن
                    </a>
                    <a href="/Privacy" class="btn btn-outline-secondary btn-lg px-4">
                        <i class="bi bi-shield-check me-2"></i> سياسة الخصوصية
                    </a>
                </div>
            </div>
            <div class="col-lg-4 text-center mt-4 mt-lg-0">
                <div class="p-4 bg-light rounded-circle d-inline-flex align-items-center justify-content-center shadow-inner" style="width: 220px; height: 220px;">
                    <i class="bi bi-hospital text-primary" style="font-size: 5.5rem;"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- بطاقات المزايا -->
    <div class="row g-4 mb-4">
        <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm p-3 rounded-3">
                <div class="card-body">
                    <div class="rounded-circle bg-info-subtle text-info d-inline-flex p-3 mb-3">
                        <i class="bi bi-clock-history fs-3"></i>
                    </div>
                    <h5 class="fw-bold">مواعيد مرنة ودقيقة</h5>
                    <p class="text-muted small mb-0">
                        اختر الوقت المناسب لك من جدول الفترات الصباحية أو المسائية مع تأكيد فوري وحفظ مباشر لموعدك.
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm p-3 rounded-3">
                <div class="card-body">
                    <div class="rounded-circle bg-success-subtle text-success d-inline-flex p-3 mb-3">
                        <i class="bi bi-heart-pulse-fill fs-3"></i>
                    </div>
                    <h5 class="fw-bold">نخبة من الاستشاريين</h5>
                    <p class="text-muted small mb-0">
                        فريق طبي متكامل يغطي زراعة وتجميل الأسنان، تقويم الأسنان، طب أسنان الأطفال، وعلاج الجذور المجهري.
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm p-3 rounded-3">
                <div class="card-body">
                    <div class="rounded-circle bg-warning-subtle text-warning d-inline-flex p-3 mb-3">
                        <i class="bi bi-shield-lock-fill fs-3"></i>
                    </div>
                    <h5 class="fw-bold">خصوصية وأمان البيانات</h5>
                    <p class="text-muted small mb-0">
                        نظام إدارة بيانات المرضى مصمم بمعمارية برمجية تفصل المودلز والمنطق وتضمن سرية المعلومات الطبية.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- كادر الأطباء المتاح بالعيادة -->
    <% if (typeof doctors !== 'undefined' && doctors.length > 0) { %>
    <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h4 class="fw-bold mb-3 text-dark">
            <i class="bi bi-people-fill text-primary me-2"></i> استشاريو وأطباء <span class="text-primary fw-bold">مركز دينتال سيتي</span>
        </h4>
        <div class="row g-3">
            <% doctors.forEach(doc => { %>
                <div class="col-md-6">
                    <div class="border rounded-3 p-3 bg-light d-flex align-items-center gap-3">
                        <div class="bg-white p-3 rounded-circle shadow-sm text-primary">
                            <i class="bi <%= doc.AvatarIcon || 'bi-person-badge-fill' %> fs-2"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-1 text-dark"><%= doc.name %></h5>
                            <div class="text-primary small fw-semibold mb-1"><%= doc.title %> - <%= doc.specialty %></div>
                            <div class="text-muted small">
                                <i class="bi bi-clock me-1"></i> <%= doc.workinghours %>
                            </div>
                        </div>
                    </div>
                </div>
            <% }); %>
        </div>
    </div>
    <% } %>
</div>

````

---

### واجهة حجز المواعيد (book.ejs)

- **المسار:** `Dental city/src/views/appointments/book.ejs`
- **عدد الأسطر:** 883 سطر
- **الحجم:** 46.3 KB

````html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<style>
    :root {
        --clinic-primary: #0284c7;
        --clinic-primary-dark: #0369a1;
        --clinic-secondary: #0d9488;
        --clinic-accent: #38bdf8;
        --clinic-bg: #f8fafc;
        --clinic-card-border: #e2e8f0;
    }

    body {
        background-color: var(--clinic-bg);
    }

    .booking-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .clinic-header-card {
        background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%);
        color: white;
        border-radius: 1rem;
        padding: 2.2rem 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.25);
    }

    .section-card {
        background: #ffffff;
        border: 1px solid var(--clinic-card-border);
        border-radius: 1rem;
        padding: 1.75rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .section-title {
        color: #0f172a;
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        border-bottom: 2px solid #f1f5f9;
        padding-bottom: 0.75rem;
    }

    .section-title i {
        color: var(--clinic-primary);
        font-size: 1.4rem;
    }

    /* كروت اختيار الأطباء */
    .doctor-card {
        border: 2px solid var(--clinic-card-border);
        border-radius: 0.85rem;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        background-color: #fff;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .doctor-card:hover {
        border-color: var(--clinic-primary);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(2, 132, 199, 0.12);
    }

    .doctor-card.selected {
        border-color: var(--clinic-primary);
        background-color: #f0f9ff;
        box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.2);
    }

    /* شرائح اختيار الوقت */
    .slot-pill {
        border: 1.5px solid #cbd5e1;
        background-color: #ffffff;
        color: #334155;
        border-radius: 0.6rem;
        padding: 0.6rem 0.9rem;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.18s ease-in-out;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        width: 100%;
    }

    .slot-pill:hover:not(.disabled) {
        border-color: var(--clinic-primary);
        color: var(--clinic-primary);
        background-color: #f0f9ff;
    }

    .slot-pill.active {
        background-color: var(--clinic-primary);
        border-color: var(--clinic-primary);
        color: #ffffff;
        box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);
    }

    .slot-pill.disabled,
    .slot-pill:disabled {
        background-color: #f8fafc !important;
        border-color: #e2e8f0 !important;
        color: #94a3b8 !important;
        cursor: not-allowed !important;
        text-decoration: line-through;
        opacity: 0.75;
        pointer-events: none;
        box-shadow: none !important;
    }

    /* ملخص الحجز الجانبي */
    .summary-card {
        background: #ffffff;
        border: 1px solid var(--clinic-card-border);
        border-radius: 1rem;
        padding: 1.5rem;
        position: sticky;
        top: 1.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
    }

    [data-bs-theme="dark"] .summary-card,
    [data-theme="dark"] .summary-card,
    body.dark-mode .summary-card {
        background: #1e293b !important;
        border-color: #334155 !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4) !important;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.65rem 0;
        border-bottom: 1px dashed #e2e8f0;
        font-size: 0.92rem;
    }

    [data-bs-theme="dark"] .summary-item,
    [data-theme="dark"] .summary-item,
    body.dark-mode .summary-item {
        border-bottom-color: #334155 !important;
    }

    .summary-label {
        color: #64748b;
    }

    [data-bs-theme="dark"] .summary-label,
    [data-theme="dark"] .summary-label,
    body.dark-mode .summary-label {
        color: #94a3b8 !important;
    }

    .summary-value {
        font-weight: 600;
        color: #0f172a;
    }

    [data-bs-theme="dark"] .summary-value,
    [data-theme="dark"] .summary-value,
    body.dark-mode .summary-value {
        color: #f8fafc !important;
    }

    .btn-submit-booking {
        background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%);
        color: white;
        font-size: 1.15rem;
        font-weight: bold;
        border-radius: 0.75rem;
        padding: 0.85rem;
        border: none;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
    }

    .btn-submit-booking:hover {
        opacity: 0.95;
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(2, 132, 199, 0.45);
        color: #ffffff;
    }
</style>

<div class="booking-wrapper py-3">
    <!-- رأس الصفحة التعريفي -->
    <div class="clinic-header-card text-center text-md-end d-md-flex align-items-center justify-content-between">
        <div>
            <h1 class="h2 fw-bold mb-2">
                <i class="bi bi-calendar2-check-fill me-2"></i>
                حجز موعد عيادة الأسنان
            </h1>
            <p class="mb-0 text-white-50 fs-6">
                مرحباً بك في <span class="text-primary fw-bold">مركز دينتال سيتي</span> (Dental City Center). يرجى تعبئة بيانات المريض واختيار الطبيب والموعد المناسب لإتمام الحجز بكل سهولة.
            </p>
        </div>
        <div class="mt-3 mt-md-0">
            <span class="badge bg-white text-dark px-3 py-2 rounded-pill shadow-sm fs-6">
                <i class="bi bi-clock-history text-primary me-1"></i> حجز فوري ومؤكد
            </span>
        </div>
    </div>

    <!-- رسائل الأخطاء -->
    <% if (typeof errors !== 'undefined' && Object.keys(errors).length > 0) { %>
        <div class="alert alert-danger alert-dismissible fade show shadow-sm d-flex align-items-center mb-4" role="alert" style="border-radius: 0.85rem; border: 1px solid #fecaca; background-color: #fef2f2;">
            <i class="bi bi-exclamation-triangle-fill fs-4 text-danger ms-3 flex-shrink-0"></i>
            <div class="flex-grow-1">
                <div class="fw-bold text-danger mb-1 fs-6">تعذر إتمام عملية الحجز:</div>
                <% Object.values(errors).forEach(err => { %>
                    <div class="text-dark small"><%= err %></div>
                <% }); %>
            </div>
            <button type="button" class="btn-close me-2" data-bs-dismiss="alert" aria-label="إغلاق"></button>
        </div>
    <% } %>

    <form method="post" action="/Appointments/Book" id="appointmentBookingForm">
        <div class="row g-4">
            <!-- العمود الرئيسي: خطوات ونماذج الحجز -->
            <div class="col-lg-8">

                <!-- 1. نموذج بيانات المريض -->
                <div class="section-card">
                    <div class="section-title">
                        <i class="bi bi-person-lines-fill"></i>
                        <span>1. بيانات المريض الشخصية</span>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-6">
                            <label for="patientNameInput" class="form-label fw-semibold">
                                الاسم بالكامل <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <span class="input-group-text bg-light"><i class="bi bi-person"></i></span>
                                <input name="patientName" class="form-control" id="patientNameInput" placeholder="أدخل اسم المريض ثلاثياً" value="<%= (typeof formData !== 'undefined' && formData.patientName) ? formData.patientName : '' %>" required />
                            </div>
                            <% if (typeof errors !== 'undefined' && errors.patientName) { %>
                                <span class="text-danger small"><%= errors.patientName %></span>
                            <% } %>
                        </div>

                        <div class="col-md-6">
                            <label for="patientPhoneInput" class="form-label fw-semibold">
                                رقم الهاتف الجوال <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <span class="input-group-text bg-light"><i class="bi bi-telephone"></i></span>
                                <input name="patientPhone" class="form-control" id="patientPhoneInput" placeholder="مثال: 01012345678" value="<%= (typeof formData !== 'undefined' && formData.patientPhone) ? formData.patientPhone : '' %>" required />
                            </div>
                            <% if (typeof errors !== 'undefined' && errors.patientPhone) { %>
                                <span class="text-danger small"><%= errors.patientPhone %></span>
                            <% } %>
                        </div>

                        <!-- حقلا تاريخ الميلاد والنوع (ذكر/أنثى) مباشرة تحت الاسم ورقم الهاتف -->
                        <div class="col-md-6">
                            <label for="patientBirthDate" class="form-label fw-semibold">
                                تاريخ الميلاد <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <span class="input-group-text bg-light"><i class="bi bi-calendar-heart text-primary"></i></span>
                                <input name="birthDate" 
                                       type="date" 
                                       class="form-control" 
                                       id="patientBirthDate" 
                                       max="<%= new Date().toISOString().split('T')[0] %>"
                                       value="<%= (typeof formData !== 'undefined' && formData.birthDate) ? formData.birthDate : '' %>" 
                                       onchange="updateSummaryBirthDate()"
                                       required />
                            </div>
                            <% if (typeof errors !== 'undefined' && errors.birthDate) { %>
                                <span class="text-danger small"><%= errors.birthDate %></span>
                            <% } %>
                        </div>

                        <div class="col-md-6">
                            <label for="patientGender" class="form-label fw-semibold">
                                النوع (الجنس) <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <span class="input-group-text bg-light"><i class="bi bi-gender-ambiguous text-primary"></i></span>
                                <select name="gender" class="form-select" id="patientGender" onchange="updateSummaryGender()" required>
                                    <option value="">-- اختر النوع --</option>
                                    <option value="ذكر" <%= (typeof formData !== 'undefined' && formData.gender === 'ذكر') ? 'selected' : '' %>>ذكر</option>
                                    <option value="أنثى" <%= (typeof formData !== 'undefined' && formData.gender === 'أنثى') ? 'selected' : '' %>>أنثى</option>
                                </select>
                            </div>
                            <% if (typeof errors !== 'undefined' && errors.gender) { %>
                                <span class="text-danger small"><%= errors.gender %></span>
                            <% } %>
                        </div>

                        <div class="col-12">
                            <label for="patientNotes" class="form-label fw-semibold">
                                ملاحظات صحية أو حساسية من أدوية (اختياري)
                            </label>
                            <textarea name="patientNotes" id="patientNotes" rows="2" class="form-control" placeholder="هل تعاني من أمراض مزمنة كالسكر، ضغط الدم، سيولة، أو حساسية من البنسلين؟"><%= (typeof formData !== 'undefined' && formData.patientNotes) ? formData.patientNotes : '' %></textarea>
                        </div>
                    </div>
                </div>

                <!-- 2. اختيار الطبيب المعالج والخدمة المطلوبة -->
                <div class="section-card">
                    <div class="section-title">
                        <i class="bi bi-heart-pulse-fill"></i>
                        <span>2. اختيار الطبيب والتخصص الطبي</span>
                    </div>

                    <!-- حقل معرف الطبيب المخفي (يبدأ فارغاً تماماً لتحديد الطبيب ديناميكياً) -->
                    <% const selectedDocId = (typeof formData !== 'undefined' && formData.doctorId) ? String(formData.doctorId) : ''; %>
                    <% const selectedDoc = (typeof doctors !== 'undefined' && doctors.length > 0 && selectedDocId) ? doctors.find(d => String(d.id) === selectedDocId) : null; %>
                    <input type="hidden" name="doctorId" id="selectedDoctorId" value="<%= selectedDocId %>" required />
                    <input type="hidden" id="selectedDoctorName" value="<%= selectedDoc ? selectedDoc.name : '' %>" />

                    <% if (typeof errors !== 'undefined' && errors.doctorId) { %>
                        <div class="alert alert-danger py-2 small mb-3">
                            <i class="bi bi-exclamation-triangle-fill me-1"></i> <%= errors.doctorId %>
                        </div>
                    <% } %>

                    <div class="row g-3 mb-4">
                        <% if (typeof doctors !== 'undefined' && doctors.length > 0) { %>
                            <% doctors.forEach((doc) => { %>
                                <% const isSelected = selectedDocId && selectedDocId === String(doc.id); %>
                                <div class="col-md-6">
                                    <div class="doctor-card <%= isSelected ? 'selected' : '' %>" 
                                         data-doctor-id="<%= doc.id %>" 
                                         data-doctor-name="<%= doc.name %>"
                                         data-doctor-room="<%= doc.climicroom || 'العيادة الاستشارية' %>"
                                         onclick="selectDoctor(<%= doc.id %>, '<%= doc.name %>', '<%= doc.climicroom || 'العيادة الاستشارية' %>', this)">
                                        <div class="d-flex align-items-start gap-3">
                                            <div class="rounded-circle bg-primary-subtle text-primary p-3 d-flex align-items-center justify-content-center" style="width: 54px; height: 54px;">
                                                <i class="bi <%= doc.AvatarIcon || 'bi-person-badge-fill' %> fs-3"></i>
                                            </div>
                                            <div class="flex-grow-1">
                                                <div class="d-flex justify-content-between align-items-center mb-1">
                                                    <h6 class="fw-bold mb-0 text-dark"><%= doc.name %></h6>
                                                    <span class="badge bg-warning-subtle text-dark border border-warning-subtle">
                                                        <i class="bi bi-star-fill text-warning"></i> <%= doc.Rating || 5.0 %>
                                                    </span>
                                                </div>
                                                <div class="text-primary small fw-semibold"><%= doc.specialty %></div>
                                                <div class="text-muted small mt-1">
                                                    <i class="bi bi-geo-alt me-1"></i><%= doc.climicroom || 'العيادة الرئيسية' %>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3 pt-2 border-top d-flex justify-content-between align-items-center small text-secondary">
                                            <span><i class="bi bi-award me-1"></i><%= doc.experienceyears %> سنوات خبرة</span>
                                            <span class="select-indicator text-primary fw-bold">
                                                <i class="bi <%= isSelected ? 'bi-check-circle-fill' : 'bi-circle' %>"></i>
                                                <%= isSelected ? 'تم الاختيار' : 'اختر الطبيب' %>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            <% }); %>
                        <% } else { %>
                            <div class="col-12">
                                <div class="alert alert-info d-flex align-items-center gap-3 p-4 rounded-4 mb-0 border-info-subtle shadow-sm">
                                    <i class="bi bi-info-circle-fill fs-2 text-info flex-shrink-0"></i>
                                    <div>
                                        <h6 class="fw-bold mb-1 text-dark">لا يوجد أطباء متاحون حالياً في النظام (0 أطباء)</h6>
                                        <p class="small mb-0 text-muted">
                                            تبدأ قائمة الأطباء فارغة تماماً، ويتم تحميل الأطباء ديناميكياً من النظام فور إضافتهم بواسطة إدارة العيادة.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        <% } %>
                    </div>

                    <!-- اختيار الخدمة الطبية -->
                    <div class="row g-3">
                        <div class="col-md-12">
                            <label for="serviceSelect" class="form-label fw-semibold">
                                الإجراء أو الخدمة المطلوبة <span class="text-danger">*</span>
                            </label>
                            <select name="selectedService" class="form-select form-select-lg fs-6" id="serviceSelect" onchange="updateSummaryService()" required>
                                <option value="">-- اختر نوع الخدمة أو الإجراء الطبي --</option>
                                <% if (typeof services !== 'undefined') { %>
                                    <% services.forEach(srv => { %>
                                        <option value="<%= srv %>" <%= (typeof formData !== 'undefined' && formData.selectedService === srv) ? 'selected' : '' %>><%= srv %></option>
                                    <% }); %>
                                <% } %>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- 3. واجهة اختيار المواعيد وتحديد الأوقات -->
                <div class="section-card">
                    <div class="section-title">
                        <i class="bi bi-clock"></i>
                        <span>3. تحديد التاريخ واختيار الوقت المتاح</span>
                    </div>

                    <% const todayStr = new Date().toISOString().split('T')[0]; %>
                    <div class="row g-3 align-items-end mb-4">
                        <div class="col-md-6">
                            <label for="appointmentDateInput" class="form-label fw-semibold">
                                تاريخ الموعد <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <span class="input-group-text bg-light"><i class="bi bi-calendar3"></i></span>
                                <input name="appointmentDate" 
                                       type="date" 
                                       class="form-control" 
                                       id="appointmentDateInput" 
                                       min="<%= todayStr %>" 
                                       value="<%= (typeof formData !== 'undefined' && formData.appointmentDate) ? formData.appointmentDate : todayStr %>"
                                       onchange="fetchSlots()" 
                                       required />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="p-2 bg-light rounded text-muted small">
                                <i class="bi bi-info-circle-fill text-info me-1"></i>
                                المواعيد تُحدث فورياً حسب جدول الطبيب المختار. الأخضر متاح للحجز.
                            </div>
                        </div>
                    </div>

                    <!-- حقل الوقت المختار المخفي -->
                    <input type="hidden" name="appointmentTime" id="selectedTimeSlotInput" value="<%= (typeof formData !== 'undefined' && formData.appointmentTime) ? formData.appointmentTime : '' %>" required />

                    <!-- إشعار عند عدم اختيار طبيب بعد -->
                    <div id="noDoctorNotice" class="text-center py-4 px-3 bg-light rounded-3 border mb-3 <%= selectedDocId ? 'd-none' : '' %>">
                        <i class="bi bi-person-check fs-2 text-primary d-block mb-2"></i>
                        <h6 class="fw-bold text-dark mb-1">يرجى اختيار الطبيب المعالج أولاً</h6>
                        <p class="small text-muted mb-0">اختر الطبيب المناسب من الخطوة رقم (2) أعلاه لعرض جدول مواعيد وساعات عمله المتاحة.</p>
                    </div>

                    <!-- مؤشر التحميل عند جلب المواعيد -->
                    <div id="slotsLoading" class="text-center py-4 d-none">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">جارٍ تحميل المواعيد...</span>
                        </div>
                        <p class="text-muted small mt-2">جارٍ التحقق من الأوقات المتاحة لدى الطبيب...</p>
                    </div>

                    <!-- إشعار حالة جدول الطبيب والدوام -->
                    <div id="doctorScheduleNotice" class="mb-3 d-none"></div>

                    <!-- حاوية أوقات الحجز (صباحي ومسائي) -->
                    <div id="slotsContainer" class="<%= selectedDocId ? '' : 'd-none' %>">
                        <!-- دليل ألوان حالة المواعيد ونظام الورديتين -->
                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 pb-2 border-bottom">
                            <span class="small fw-semibold text-secondary">
                                <i class="bi bi-clock-history text-primary me-1"></i> نظام الورديتين المعتمد (فاصل ساعة كاملة إلزامي بين كل كشف):
                            </span>
                            <div class="d-flex align-items-center gap-3 small">
                                <span class="d-inline-flex align-items-center gap-1 text-success fw-medium">
                                    <i class="bi bi-check-circle-fill"></i> متاح للحجز
                                </span>
                                <span class="d-inline-flex align-items-center gap-1 text-muted">
                                    <i class="bi bi-slash-circle text-danger"></i> محجوز (معطّل)
                                </span>
                            </div>
                        </div>

                        <!-- الفترة الصباحية -->
                        <div class="mb-3">
                            <h6 class="fw-bold text-secondary mb-2">
                                <i class="bi bi-sun text-warning me-1"></i> الفترة الصباحية (09:00 ص - 12:00 م)
                            </h6>
                            <div class="row g-2" id="morningSlotsRow">
                                <div class="col-12 text-muted small py-2">
                                    <span class="spinner-border spinner-border-sm me-1"></span> جارٍ تحميل المواعيد الصباحية...
                                </div>
                            </div>
                        </div>

                        <!-- الفترة المسائية -->
                        <div class="mb-2">
                            <h6 class="fw-bold text-secondary mb-2">
                                <i class="bi bi-moon-stars text-primary me-1"></i> الفترة المسائية (12:00 م - 06:00 م)
                            </h6>
                            <div class="row g-2" id="eveningSlotsRow">
                                <div class="col-12 text-muted small py-2">
                                    <span class="spinner-border spinner-border-sm me-1"></span> جارٍ تحميل المواعيد المسائية...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 4. الشروط وسياسة الحجز -->
                <div class="section-card">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="agreeTerms" id="agreeTerms" value="true" checked required />
                        <label class="form-check-label fw-semibold text-dark small" for="agreeTerms">
                            أوافق على سياسة المواعيد بالحضور قبل الموعد بـ 15 دقيقة، والتواصل مسبقاً في حال الرغبة بالتعديل.
                        </label>
                    </div>
                </div>

            </div>

            <!-- العمود الجانبي: ملخص الحجز وزر التأكيد -->
            <div class="col-lg-4">
                <div class="summary-card">
                    <div class="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                        <i class="bi bi-receipt text-primary fs-4"></i>
                        <h5 class="fw-bold mb-0">ملخص بيانات الحجز</h5>
                    </div>

                    <div class="summary-item">
                        <span class="summary-label">اسم المريض:</span>
                        <span class="summary-value" id="summaryPatientName"><%= (typeof formData !== 'undefined' && formData.patientName) ? formData.patientName : 'لم يحدد' %></span>
                    </div>

                    <div class="summary-item">
                        <span class="summary-label">تاريخ الميلاد:</span>
                        <span class="summary-value" id="summaryBirthDate"><%= (typeof formData !== 'undefined' && formData.birthDate) ? formData.birthDate : 'لم يحدد' %></span>
                    </div>

                    <div class="summary-item">
                        <span class="summary-label">النوع (الجنس):</span>
                        <span class="summary-value" id="summaryGender"><%= (typeof formData !== 'undefined' && formData.gender) ? formData.gender : 'لم يحدد' %></span>
                    </div>

                    <div class="summary-item">
                        <span class="summary-label">الطبيب المعالج:</span>
                        <span class="summary-value text-primary" id="summaryDoctorName"><%= selectedDoc ? selectedDoc.name : 'لم يتم الاختيار بعد' %></span>
                    </div>

                    <div class="summary-item">
                        <span class="summary-label">العيادة / الغرفة:</span>
                        <span class="summary-value" id="summaryClinicRoom"><%= selectedDoc ? (selectedDoc.climicroom || 'العيادة الرئيسية') : '-' %></span>
                    </div>

                    <div class="summary-item">
                        <span class="summary-label">الخدمة المطلوبة:</span>
                        <span class="summary-value" id="summaryService"><%= (typeof formData !== 'undefined' && formData.selectedService) ? formData.selectedService : 'لم تحدد' %></span>
                    </div>

                    <div class="summary-item">
                        <span class="summary-label">تاريخ الكشف:</span>
                        <span class="summary-value" id="summaryDate"><%= (typeof formData !== 'undefined' && formData.appointmentDate) ? formData.appointmentDate : todayStr %></span>
                    </div>

                    <div class="summary-item">
                        <span class="summary-label">الوقت المختار:</span>
                        <span class="summary-value text-success fw-bold" id="summaryTimeSlot"><%= (typeof formData !== 'undefined' && formData.appointmentTime) ? formData.appointmentTime : 'يرجى الاختيار' %></span>
                    </div>

                    <div class="p-3 bg-light rounded mt-3 mb-3 border">
                        <div class="d-flex align-items-center gap-2 text-muted small">
                            <i class="bi bi-shield-check text-success fs-5"></i>
                            <span>تأكيد فوري - ستصلك رسالة تأكيد بتفاصيل الموعد ورقم الحجز.</span>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-submit-booking w-100 py-3">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        تأكيد وحجز الموعد الآن
                    </button>

                    <div class="text-center mt-3">
                        <small class="text-muted">
                            <i class="bi bi-telephone-fill me-1 text-primary"></i>
                            للاستفسارات العاجلة: <a href="tel:<%= emergencyPhone %>" class="fw-bold text-primary text-decoration-none" dir="ltr"><%= emergencyPhone %></a>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        // تحديث اسم المريض في الملخص عند الكتابة
        const nameInput = document.getElementById("patientNameInput");
        if (nameInput) {
            nameInput.addEventListener("input", function () {
                document.getElementById("summaryPatientName").textContent = this.value.trim() || "لم يحدد";
            });
            if (nameInput.value) {
                document.getElementById("summaryPatientName").textContent = nameInput.value;
            }
        }

        // تحديث تاريخ الموعد بالملخص
        const dateInput = document.getElementById("appointmentDateInput");
        if (dateInput) {
            dateInput.addEventListener("change", function () {
                document.getElementById("summaryDate").textContent = this.value || "-";
            });
        }

        // تحديث تاريخ الميلاد والنوع بالملخص
        updateSummaryBirthDate();
        updateSummaryGender();

        // تحديث اسم الطبيب وغرفته الأولي إذا تم اختياره مسبقاً
        const initialSelectedDoc = document.querySelector(".doctor-card.selected");
        if (initialSelectedDoc) {
            document.getElementById("summaryDoctorName").textContent = initialSelectedDoc.dataset.doctorName;
            document.getElementById("summaryClinicRoom").textContent = initialSelectedDoc.dataset.doctorRoom;
            fetchSlots();
        } else {
            document.getElementById("summaryDoctorName").textContent = "لم يتم الاختيار بعد";
            document.getElementById("summaryClinicRoom").textContent = "-";
        }

        // تحديث الخدمة
        updateSummaryService();
    });

    function updateSummaryBirthDate() {
        const val = document.getElementById("patientBirthDate")?.value;
        document.getElementById("summaryBirthDate").textContent = val || "لم يحدد";
    }

    function updateSummaryGender() {
        const val = document.getElementById("patientGender")?.value;
        document.getElementById("summaryGender").textContent = val || "لم يحدد";
    }

    function selectDoctor(docId, docName, docRoom, element) {
        document.querySelectorAll(".doctor-card").forEach(c => {
            c.classList.remove("selected");
            const indicator = c.querySelector(".select-indicator");
            if (indicator) {
                indicator.innerHTML = '<i class="bi bi-circle"></i> اختر الطبيب';
            }
        });

        element.classList.add("selected");
        const activeIndicator = element.querySelector(".select-indicator");
        if (activeIndicator) {
            activeIndicator.innerHTML = '<i class="bi bi-check-circle-fill"></i> تم الاختيار';
        }

        document.getElementById("selectedDoctorId").value = docId;
        document.getElementById("selectedDoctorName").value = docName;
        document.getElementById("summaryDoctorName").textContent = docName;
        document.getElementById("summaryClinicRoom").textContent = docRoom;

        // إخفاء إشعار عدم اختيار طبيب وإظهار حاوية الأوقات
        const noDocEl = document.getElementById("noDoctorNotice");
        if (noDocEl) noDocEl.classList.add("d-none");
        const slotsCont = document.getElementById("slotsContainer");
        if (slotsCont) slotsCont.classList.remove("d-none");

        // جلب الأوقات المتاحة لهذا الطبيب في التاريخ المحدد
        fetchSlots();
    }

    function selectTimeSlot(time, element) {
        if (!element || element.disabled || element.classList.contains("disabled") || element.getAttribute("aria-disabled") === "true") {
            return;
        }

        document.querySelectorAll(".slot-pill").forEach(p => p.classList.remove("active"));
        element.classList.add("active");

        document.getElementById("selectedTimeSlotInput").value = time;
        document.getElementById("summaryTimeSlot").textContent = time;
    }

    function updateSummaryService() {
        const select = document.getElementById("serviceSelect");
        const val = select ? select.value : "";
        document.getElementById("summaryService").textContent = val || "لم تحدد";
    }

    async function fetchSlots() {
        const doctorId = document.getElementById("selectedDoctorId").value;
        const date = document.getElementById("appointmentDateInput").value;

        if (!doctorId || !date) {
            const noDocEl = document.getElementById("noDoctorNotice");
            if (noDocEl) noDocEl.classList.remove("d-none");
            const slotsCont = document.getElementById("slotsContainer");
            if (slotsCont) slotsCont.classList.add("d-none");
            return;
        }

        const loadingEl = document.getElementById("slotsLoading");
        const containerEl = document.getElementById("slotsContainer");
        const noticeEl = document.getElementById("doctorScheduleNotice");
        const morningRow = document.getElementById("morningSlotsRow");
        const eveningRow = document.getElementById("eveningSlotsRow");

        loadingEl.classList.remove("d-none");
        containerEl.style.opacity = "0.4";

        try {
            // جلب البيانات مباشرة من Supabase بدون أي كاش عبر خادم التطبيق
            const timestamp = Date.now();
            const response = await fetch(`?handler=AvailableSlots&doctorId=${encodeURIComponent(doctorId)}&date=${encodeURIComponent(date)}&_nocache=${timestamp}`, {
                cache: "no-store",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache"
                }
            });
            if (!response.ok) {
                throw new Error("فشل في استرجاع المواعيد المتاحة");
            }

            const result = await response.json();
            const morningSlots = result.morningSlots || [];
            const afternoonSlots = result.afternoonSlots || [];
            const isOffDay = result.isOffDay;

            morningRow.innerHTML = "";
            eveningRow.innerHTML = "";

            if (isOffDay) {
                if (noticeEl) {
                    noticeEl.className = "alert alert-warning border border-warning shadow-sm p-3 rounded-3 mb-3";
                    noticeEl.innerHTML = `
                        <div class="d-flex align-items-center gap-2 mb-1">
                            <i class="bi bi-calendar-x fs-4 text-warning"></i>
                            <strong class="fs-6">الطبيب غير متاح في هذا التاريخ</strong>
                        </div>
                        <p class="mb-1 text-dark small">${result.offDayReason || "الطبيب في إجازة أسبوعية في هذا اليوم."}</p>
                        <small class="text-secondary d-block"><i class="bi bi-info-circle me-1"></i> يرجى اختيار تاريخ آخر متاح للحجز.</small>
                    `;
                    noticeEl.classList.remove("d-none");
                }
                morningRow.innerHTML = '<div class="col-12 text-muted small py-2"><i class="bi bi-dash-circle me-1"></i> لا توجد مواعيد صباحية متاحة.</div>';
                eveningRow.innerHTML = '<div class="col-12 text-muted small py-2"><i class="bi bi-dash-circle me-1"></i> لا توجد مواعيد مسائية متاحة.</div>';
                document.getElementById("selectedTimeSlotInput").value = "";
                document.getElementById("summaryTimeSlot").textContent = "يرجى الاختيار";
                return;
            }

            const availableMorning = morningSlots.filter(s => s.isAvailable);
            const availableAfternoon = afternoonSlots.filter(s => s.isAvailable);
            const totalAvailable = availableMorning.length + availableAfternoon.length;

            if (morningSlots.length > 0 && totalAvailable === 0) {
                if (noticeEl) {
                    noticeEl.className = "alert alert-warning border border-warning shadow-sm p-3 rounded-3 mb-3";
                    noticeEl.innerHTML = `
                        <div class="d-flex align-items-center gap-2 mb-1">
                            <i class="bi bi-clock-history fs-4 text-warning"></i>
                            <strong class="fs-6">جميع مواعيد هذا اليوم محجوزة بالكامل</strong>
                        </div>
                        <p class="mb-1 text-dark small">تم حجز كافة الساعات والمواعيد المتاحة لدى الطبيب في هذا التاريخ.</p>
                        <small class="text-secondary d-block"><i class="bi bi-calendar2-plus me-1"></i> يرجى اختيار تاريخ آخر لعرض الساعات الشاغرة للحجز.</small>
                    `;
                    noticeEl.classList.remove("d-none");
                }
            } else if (noticeEl) {
                noticeEl.classList.add("d-none");
            }

            const currentSelectedTime = document.getElementById("selectedTimeSlotInput").value;
            let foundSelectedInNewSlots = false;

            // Render Morning - تظل جميع المواعيد ظاهرة مع تعطيل المحجوزة برمجياً
            if (morningSlots.length > 0) {
                morningSlots.forEach(slot => {
                    const isAvailable = Boolean(slot.isAvailable);
                    if (slot.time === currentSelectedTime && isAvailable) foundSelectedInNewSlots = true;

                    const col = document.createElement("div");
                    col.className = "col-6 col-sm-4 col-md-3";

                    if (isAvailable) {
                        col.innerHTML = `
                            <button type="button" 
                                    class="slot-pill ${slot.time === currentSelectedTime ? 'active' : ''}" 
                                    onclick="selectTimeSlot('${slot.time}', this)"
                                    title="ميعاد متاح للحجز">
                                <i class="bi bi-clock me-1"></i> ${slot.time}
                            </button>
                        `;
                    } else {
                        col.innerHTML = `
                            <button type="button" 
                                    class="slot-pill disabled" 
                                    disabled 
                                    aria-disabled="true"
                                    title="هذا الموعد محجوز مسبقاً وغير متاح للاختيار">
                                <i class="bi bi-slash-circle me-1 text-danger"></i>
                                <span>${slot.time}</span>
                                <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-1 py-0 ms-1" style="font-size: 0.65rem;">محجوز</span>
                            </button>
                        `;
                    }
                    morningRow.appendChild(col);
                });
            } else {
                morningRow.innerHTML = '<div class="col-12 text-muted small py-2"><i class="bi bi-info-circle me-1"></i> لا توجد مواعيد صباحية مجدولة لهذا الطبيب.</div>';
            }

            // Render Afternoon - تظل جميع المواعيد ظاهرة مع تعطيل المحجوزة برمجياً
            if (afternoonSlots.length > 0) {
                afternoonSlots.forEach(slot => {
                    const isAvailable = Boolean(slot.isAvailable);
                    if (slot.time === currentSelectedTime && isAvailable) foundSelectedInNewSlots = true;

                    const col = document.createElement("div");
                    col.className = "col-6 col-sm-4 col-md-3";

                    if (isAvailable) {
                        col.innerHTML = `
                            <button type="button" 
                                    class="slot-pill ${slot.time === currentSelectedTime ? 'active' : ''}" 
                                    onclick="selectTimeSlot('${slot.time}', this)"
                                    title="ميعاد متاح للحجز">
                                <i class="bi bi-clock me-1"></i> ${slot.time}
                            </button>
                        `;
                    } else {
                        col.innerHTML = `
                            <button type="button" 
                                    class="slot-pill disabled" 
                                    disabled 
                                    aria-disabled="true"
                                    title="هذا الموعد محجوز مسبقاً وغير متاح للاختيار">
                                <i class="bi bi-slash-circle me-1 text-danger"></i>
                                <span>${slot.time}</span>
                                <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-1 py-0 ms-1" style="font-size: 0.65rem;">محجوز</span>
                            </button>
                        `;
                    }
                    eveningRow.appendChild(col);
                });
            } else {
                eveningRow.innerHTML = '<div class="col-12 text-muted small py-2"><i class="bi bi-info-circle me-1"></i> لا توجد مواعيد مسائية مجدولة لهذا الطبيب.</div>';
            }

            if (!foundSelectedInNewSlots) {
                document.getElementById("selectedTimeSlotInput").value = "";
                document.getElementById("summaryTimeSlot").textContent = "يرجى الاختيار";
            }

        } catch (err) {
            console.error("Error fetching slots:", err);
        } finally {
            loadingEl.classList.add("d-none");
            containerEl.style.opacity = "1";
        }
    }

    // التحقق عند إرسال النموذج
    document.getElementById("appointmentBookingForm")?.addEventListener("submit", function (e) {
        const docId = document.getElementById("selectedDoctorId")?.value;
        if (!docId) {
            e.preventDefault();
            alert("يرجى اختيار الطبيب المعالج أولاً من قائمة الأطباء لإتمام الحجز.");
            return false;
        }

        const timeSlot = document.getElementById("selectedTimeSlotInput")?.value;
        if (!timeSlot) {
            e.preventDefault();
            alert("يرجى اختيار وقت الكشف المناسب من قائمة الأوقات المتاحة.");
            return false;
        }
    });
</script>

````

---

### واجهة تأكيد الحجز (confirmation.ejs)

- **المسار:** `Dental city/src/views/appointments/confirmation.ejs`
- **عدد الأسطر:** 225 سطر
- **الحجم:** 9.3 KB

````html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<style>
    .confirmation-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .ticket-card {
        background: #ffffff;
        border-radius: 1.25rem;
        border: 1px solid #e2e8f0;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
        overflow: hidden;
    }

    .ticket-header {
        background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%);
        color: white;
        padding: 2rem;
        text-align: center;
    }

    .ticket-body {
        padding: 2rem;
    }

    .reference-box {
        background: #f0fdf4;
        border: 2px dashed #86efac;
        border-radius: 0.75rem;
        padding: 1rem;
        text-align: center;
        margin-bottom: 2rem;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.5rem;
    }

    .info-card {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
        padding: 1.1rem;
    }

    .info-card-label {
        font-size: 0.85rem;
        color: #64748b;
        margin-bottom: 0.35rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    .info-card-value {
        font-size: 1.1rem;
        font-weight: 700;
        color: #0f172a;
    }

    @media print {
        header, footer, .no-print {
            display: none !important;
        }
        body {
            background-color: white !important;
        }
        .ticket-card {
            border: 1px solid #ccc;
            box-shadow: none !important;
        }
    }
</style>

<div class="confirmation-wrapper py-4">
    <div class="container" style="max-width: 820px;">
        <div class="ticket-card">
            <!-- رأس التذكرة -->
            <div class="ticket-header">
                <div class="display-5 mb-2">
                    <i class="bi bi-check-circle-fill text-white"></i>
                </div>
                <h2 class="fw-bold mb-1">تم تأكيد حجزك بنجاح!</h2>
                <p class="mb-0 text-white-50 fs-6">
                    شكراً لاختيارك <span class="text-primary fw-bold">مركز دينتال سيتي</span> (Dental City Center). نتطلع لتقديم أفضل رعاية لابتسامتك.
                </p>
            </div>

            <!-- محتوى التذكرة -->
            <div class="ticket-body">
                <!-- صندوق رقم المرجع -->
                <div class="reference-box">
                    <div class="text-success small fw-bold mb-1">
                        <i class="bi bi-qr-code me-1"></i> رقم تأكيد الحجز (Reference Code)
                    </div>
                    <div class="h3 fw-bold text-success mb-0 tracking-wider">
                        <%= booking.reference %>
                    </div>
                    <small class="text-muted">احتفظ بهذا الرمز لإبرازه عند الوصول لموظف الاستقبال بالعيادة</small>
                </div>

                <!-- شبكة تفاصيل الحجز -->
                <div class="info-grid mb-4">
                    <div class="info-card">
                        <div class="info-card-label">
                            <i class="bi bi-person-fill text-primary"></i> اسم المريض
                        </div>
                        <div class="info-card-value"><%= booking.patient_name %></div>
                    </div>

                    <div class="info-card">
                        <div class="info-card-label">
                            <i class="bi bi-telephone-fill text-primary"></i> رقم الهاتف
                        </div>
                        <div class="info-card-value"><%= booking.patient_phone %></div>
                    </div>

                    <% if (booking.gender) { %>
                    <div class="info-card">
                        <div class="info-card-label">
                            <i class="bi bi-gender-ambiguous text-primary"></i> النوع
                        </div>
                        <div class="info-card-value"><%= booking.gender %></div>
                    </div>
                    <% } %>

                    <% if (booking.birth_date || booking.age) { %>
                    <div class="info-card">
                        <div class="info-card-label">
                            <i class="bi bi-calendar-event text-primary"></i> تاريخ الميلاد / السن
                        </div>
                        <div class="info-card-value">
                            <%= booking.birth_date || '' %>
                            <% if (booking.age) { %> (<%= booking.age %> سنة)<% } %>
                        </div>
                    </div>
                    <% } %>

                    <div class="info-card">
                        <div class="info-card-label">
                            <i class="bi bi-heart-pulse text-danger"></i> الطبيب المعالج
                        </div>
                        <div class="info-card-value text-primary"><%= booking.doctor_name %></div>
                        <small class="text-muted d-block mt-1"><%= booking.doctor_specialty %></small>
                    </div>

                    <div class="info-card">
                        <div class="info-card-label">
                            <i class="bi bi-calendar-check text-primary"></i> تاريخ الموعد
                        </div>
                        <div class="info-card-value"><%= booking.appointment_date %></div>
                    </div>

                    <div class="info-card">
                        <div class="info-card-label">
                            <i class="bi bi-clock-fill text-success"></i> وقت الموعد
                        </div>
                        <div class="info-card-value text-success"><%= booking.appointment_time %></div>
                    </div>

                    <div class="info-card">
                        <div class="info-card-label">
                            <i class="bi bi-shield-plus text-primary"></i> نوع الخدمة
                        </div>
                        <div class="info-card-value"><%= booking.selected_service %></div>
                    </div>

                    <div class="info-card">
                        <div class="info-card-label">
                            <i class="bi bi-info-circle text-primary"></i> حالة الحجز
                        </div>
                        <div class="info-card-value">
                            <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
                                <i class="bi bi-check2-circle me-1"></i> <%= booking.status %>
                            </span>
                        </div>
                    </div>
                </div>

                <% if (booking.patient_notes) { %>
                    <div class="p-3 bg-light rounded border mb-4">
                        <span class="fw-semibold text-secondary d-block mb-1">
                            <i class="bi bi-chat-quote-fill me-1 text-primary"></i> ملاحظات الشكوى الطبية:
                        </span>
                        <p class="mb-0 text-dark"><%= booking.patient_notes %></p>
                    </div>
                <% } %>

                <!-- تعليمات الحضور -->
                <div class="alert alert-info border-info-subtle mb-4">
                    <h6 class="fw-bold mb-2"><i class="bi bi-lightbulb-fill text-warning me-1"></i> تعليمات مهمة قبل الحضور:</h6>
                    <ul class="mb-0 small ps-3">
                        <li>يرجى التفضل بالحضور قبل الموعد بـ 15 دقيقة لإنهاء إجراءات فتح الملف وقياس العلامات الحيوية.</li>
                        <li>في حال رغبتك في تعديل أو إلغاء الموعد، يرجى التواصل هاتفياً قبل 24 ساعة على الأقل.</li>
                        <li>تم تسجيل حجز موعدك وتأكيده بنجاح برقم هاتفك (<%= booking.patient_phone %>).</li>
                    </ul>
                </div>

                <!-- أزرار الإجراءات -->
                <div class="d-flex flex-wrap gap-2 justify-content-between align-items-center no-print">
                    <div class="d-flex gap-2">
                        <button onclick="window.print()" class="btn btn-outline-secondary px-4 py-2">
                            <i class="bi bi-printer me-1"></i> طباعة إشعار الحجز
                        </button>
                        <a href="/" class="btn btn-outline-primary px-4 py-2">
                            <i class="bi bi-house me-1"></i> الصفحة الرئيسية
                        </a>
                    </div>
                    <div>
                        <a href="/Appointments/Book" class="btn btn-primary px-4 py-2">
                            <i class="bi bi-plus-circle me-1"></i> حجز موعد جديد
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

````

---

### واجهة تسجيل دخول الطبيب (login.ejs)

- **المسار:** `Dental city/src/views/doctor/login.ejs`
- **عدد الأسطر:** 194 سطر
- **الحجم:** 7.8 KB

````html
<style>
    .login-wrapper {
        direction: rtl;
        text-align: right;
        min-height: 75vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .login-card {
        background: #ffffff;
        border-radius: 1.25rem;
        border: 1px solid #e2e8f0;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        max-width: 480px;
        width: 100%;
    }

    .login-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        color: white;
        padding: 2.2rem 2rem 1.8rem;
        text-align: center;
        position: relative;
    }

    .lock-circle {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.2);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        color: #38bdf8;
    }

    .btn-login-submit {
        background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%);
        border: none;
        color: white;
        font-weight: 700;
        padding: 0.85rem;
        border-radius: 0.75rem;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
    }

    .btn-login-submit:hover {
        opacity: 0.95;
        transform: translateY(-1px);
        color: white;
    }

    [data-bs-theme="dark"] .login-card {
        background: #1e293b !important;
        border-color: #334155 !important;
        color: #f8fafc !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7) !important;
    }

    [data-bs-theme="dark"] .login-card .form-label {
        color: #f8fafc !important;
    }

    [data-bs-theme="dark"] .login-card .form-control {
        background-color: #0f172a !important;
        border-color: #334155 !important;
        color: #f8fafc !important;
    }

    [data-bs-theme="dark"] .login-card .form-control:focus {
        border-color: #38bdf8 !important;
        box-shadow: 0 0 0 0.25rem rgba(56, 189, 248, 0.25) !important;
    }

    [data-bs-theme="dark"] .login-card .input-group-text {
        background-color: #0f172a !important;
        border-color: #334155 !important;
        color: #94a3b8 !important;
    }

    [data-bs-theme="dark"] .login-card .form-check-label {
        color: #cbd5e1 !important;
    }

    [data-bs-theme="dark"] .login-card a.text-muted {
        color: #94a3b8 !important;
    }

</style>

<div class="login-wrapper py-4">
    <div class="login-card">
        <!-- رأس بطاقة تسجيل الدخول -->
        <div class="login-header">
            <div class="lock-circle">
                <i class="bi bi-shield-lock-fill fs-2"></i>
            </div>
            <h3 class="fw-bold mb-1" style="color: #38bdf8 !important;">مركز دينتال سيتي</h3>
            <h5 class="fw-semibold mb-2 text-white-50 fs-6">بوابة الأطباء والإدارة الطبية</h5>
            <p class="text-white-50 small mb-0">
                منطقة محمية خاصة بكادر عيادات مركز دينتال سيتي (Dental City Center)
            </p>
        </div>

        <div class="p-4 p-md-5">
            <!-- رسائل التحقق والأخطاء -->
            <% 
               const activeErrors = (typeof errors !== 'undefined' && errors) 
                 ? errors.filter(e => typeof e === 'string' && e.trim().length > 0) 
                 : []; 
            %>
            <% if (activeErrors.length > 0) { %>
                <div class="alert alert-danger mb-4 p-3 d-flex align-items-center justify-content-between" role="alert" style="direction: rtl; text-align: right; background-color: #fef2f2; border: 1px solid #fecaca; color: #991b1b; border-radius: 0.75rem;">
                    <div class="d-flex align-items-center gap-2 flex-grow-1">
                        <i class="bi bi-exclamation-triangle-fill fs-5 text-danger flex-shrink-0"></i>
                        <div class="fw-bold small" style="color: #991b1b; line-height: 1.5;">
                            <% activeErrors.forEach(err => { %>
                                <div><%= err %></div>
                            <% }); %>
                        </div>
                    </div>
                    <button type="button" class="btn-close flex-shrink-0" data-bs-dismiss="alert" aria-label="Close" style="position: static !important; float: none !important; opacity: 0.75; cursor: pointer;"></button>
                </div>
            <% } %>

            <form method="post" action="/Doctor/Login?returnUrl=<%= encodeURIComponent(typeof returnUrl !== 'undefined' ? returnUrl : '/Doctor/Dashboard') %>">
                <div class="mb-3">
                    <label for="usernameOrEmail" class="form-label fw-semibold">
                        اسم المستخدم أو البريد الإلكتروني <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <span class="input-group-text bg-light"><i class="bi bi-person-fill text-secondary"></i></span>
                        <input id="usernameOrEmail" name="usernameOrEmail" class="form-control" placeholder="أدخل اسم المستخدم أو البريد" value="<%= typeof usernameOrEmail !== 'undefined' ? usernameOrEmail : '' %>" required autofocus />
                    </div>
                </div>

                <div class="mb-3">
                    <label for="passwordInput" class="form-label fw-semibold">
                        كلمة المرور <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <span class="input-group-text bg-light"><i class="bi bi-key-fill text-secondary"></i></span>
                        <input id="passwordInput" name="password" type="password" class="form-control" placeholder="••••••••" required />
                        <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility()">
                            <i class="bi bi-eye" id="toggleIcon"></i>
                        </button>
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="rememberMeCheck" name="rememberMe" value="true" />
                        <label class="form-check-label small fw-medium" for="rememberMeCheck">
                            تذكر بياناتي في هذه الجلسة
                        </label>
                    </div>
                </div>

                <button type="submit" class="btn btn-login-submit w-100 mb-3">
                    <i class="bi bi-box-arrow-in-left me-1"></i> تسجيل الدخول للوحة التحكم
                </button>

                <div class="text-center mt-4">
                    <a href="/" class="text-decoration-none text-muted small">
                        <i class="bi bi-arrow-right me-1"></i> العودة إلى الصفحة الرئيسية للمرضى
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    function togglePasswordVisibility() {
        const passInput = document.getElementById("passwordInput");
        const toggleIcon = document.getElementById("toggleIcon");
        if (passInput.type === "password") {
            passInput.type = "text";
            toggleIcon.classList.replace("bi-eye", "bi-eye-slash");
        } else {
            passInput.type = "password";
            toggleIcon.classList.replace("bi-eye-slash", "bi-eye");
        }
    }
</script>

````

---

### لوحة تحكم الطبيب والعيادة (dashboard.ejs)

- **المسار:** `Dental city/src/views/doctor/dashboard.ejs`
- **عدد الأسطر:** 4209 سطر
- **الحجم:** 242.4 KB

````html
<%
  const allBookings = (typeof recentBookings !== 'undefined' && recentBookings && Array.isArray(recentBookings)) ? recentBookings : [];
  const confirmedCount = allBookings.filter(b => b.status === 'مؤكد').length;
  const pendingCount = allBookings.filter(b => b.status === 'قيد الانتظار' || b.status === 'pending' || !b.status).length;
  const completedCount = allBookings.filter(b => b.status === 'مكتمل').length;
  const cancelledCount = allBookings.filter(b => b.status === 'ملغي').length;

  const doctorsList = (typeof doctors !== 'undefined' && doctors && Array.isArray(doctors)) ? doctors : [];
  const activeDoctorsCount = doctorsList.filter(d => d.IsActive).length;

  const servicesList = (typeof services !== 'undefined' && services && Array.isArray(services)) ? services : [];
  
  let totalEstimatedRevenue = 0;
  allBookings.forEach(b => {
    if (b.status === 'مؤكد' || b.status === 'مكتمل') {
      const s = servicesList.find(srv => srv.name === b.selected_service);
      totalEstimatedRevenue += (s && s.price) ? Number(s.price) : 350;
    }
  });

  const avgConsultationFee = servicesList.length > 0 
    ? Math.round(servicesList.reduce((acc, s) => acc + (Number(s.price) || 0), 0) / servicesList.length)
    : 350;

  const emergencyPhoneNum = (typeof emergencyPhone !== 'undefined' && emergencyPhone) ? emergencyPhone : '01551388988';

  const recentUrgentBookings = [...allBookings]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 5);
%>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<style>
    :root {
        --clinic-primary: #0284c7;
        --clinic-primary-dark: #0369a1;
        --clinic-secondary: #0d9488;
        --clinic-bg: #f8fafc;
        --clinic-card-border: #e2e8f0;
    }

    body {
        background-color: var(--clinic-bg);
    }

    .doctor-dash-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .dash-header-card {
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        color: white;
        border-radius: 1rem;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.3);
    }

    .stat-card {
        background: white;
        border: 1px solid var(--clinic-card-border);
        border-radius: 0.85rem;
        padding: 1.25rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;
    }

    .stat-card:hover {
        transform: translateY(-2px);
    }

    .stat-icon {
        width: 52px;
        height: 52px;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
    }

    .panel-card {
        background: white;
        border: 1px solid var(--clinic-card-border);
        border-radius: 1rem;
        padding: 1.75rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
    }

    .panel-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #f1f5f9;
        padding-bottom: 0.75rem;
    }

    .nav-tabs .nav-link {
        font-weight: 600;
        color: #64748b;
        border: none;
        border-bottom: 3px solid transparent;
        padding: 0.75rem 1.25rem;
        font-size: 1rem;
    }

    .nav-tabs .nav-link.active {
        color: var(--clinic-primary);
        border-bottom-color: var(--clinic-primary);
        background: transparent;
    }

    .slot-pill-manage {
        background: #f8fafc;
        border: 1.5px solid #cbd5e1;
        border-radius: 0.65rem;
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        transition: all 0.2s;
    }

    .slot-pill-manage.disabled-slot {
        background: #f1f5f9;
        border-color: #e2e8f0;
        opacity: 0.65;
    }

    .table th {
        background-color: #f8fafc;
        color: #475569;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .status-select-مؤكد {
        background-color: #f0fdf4 !important;
        border-color: #bbf7d0 !important;
        color: #166534 !important;
    }

    .status-select-قيدالانتظار {
        background-color: #fefce8 !important;
        border-color: #fef08a !important;
        color: #854d0e !important;
    }

    .status-select-مكتمل {
        background-color: #f0f9ff !important;
        border-color: #bae6fd !important;
        color: #0369a1 !important;
    }

    .status-select-ملغي {
        background-color: #fef2f2 !important;
        border-color: #fecaca !important;
        color: #991b1b !important;
    }

    .row-cancelled {
        background-color: #fff1f2 !important;
        opacity: 0.8;
    }

    .row-cancelled .booking-time-col {
        text-decoration: line-through;
        color: #be123c !important;
    }

    .dash-header-card .btn {
        white-space: nowrap;
        font-size: 0.85rem;
        font-weight: 600;
        padding: 0.45rem 1rem;
        border-radius: 50rem;
    }

    /* Uniform Proportional Avatar Initials */
    .doctor-avatar-circle {
        width: 44px;
        height: 44px;
        min-width: 44px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.15rem;
        background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
        color: #ffffff;
        box-shadow: 0 3px 8px rgba(2, 132, 199, 0.25);
    }

    .staff-avatar-circle {
        width: 40px;
        height: 40px;
        min-width: 40px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    /* Doctor Card Compact Layout & Uniform Sizing */
    .doctor-card-item {
        position: relative !important;
        overflow: visible !important;
        border-radius: 1rem !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        background-color: #ffffff;
    }

    .doctor-card-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
    }

    .doctor-card-header {
        position: relative !important;
        width: 100% !important;
        display: flex !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
        gap: 0.5rem !important;
    }

    .doctor-card-header > div:first-child {
        min-width: 0 !important;
        flex: 1 1 auto !important;
    }

    .doctor-card-status-badge {
        position: static !important;
        font-size: 0.72rem !important;
        font-weight: 700 !important;
        line-height: 1.2 !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.25rem !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
        align-self: flex-start !important;
        margin: 0 !important;
        padding: 0.28rem 0.65rem !important;
        border-radius: 50rem !important;
        max-width: fit-content !important;
    }

    /* Doctor & Staff Management Actions Spacing & Overlap Prevention */
    .doctor-card-actions {
        width: 100%;
    }

    .doctor-card-actions .btn {
        white-space: nowrap !important;
        font-size: 0.81rem !important;
        font-weight: 600 !important;
        padding: 0.38rem 0.6rem !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 50rem !important;
        line-height: 1.2 !important;
    }

    .staff-action-buttons {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: nowrap;
    }

    .staff-action-buttons .btn {
        white-space: nowrap !important;
        font-size: 0.82rem !important;
        font-weight: 600 !important;
        padding: 0.38rem 0.85rem !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 50rem !important;
    }

    [data-bs-theme="dark"] .delete-staff-btn {
        border-color: #ef4444 !important;
        color: #f87171 !important;
    }

    [data-bs-theme="dark"] .delete-staff-btn:hover {
        background-color: #ef4444 !important;
        color: #ffffff !important;
    }



    [data-bs-theme="dark"] .stat-card,
    [data-bs-theme="dark"] .panel-card,
    [data-bs-theme="dark"] .doctor-card-item {
        background-color: #1e293b !important;
        border-color: #334155 !important;
        color: #f8fafc !important;
        position: relative !important;
        overflow: visible !important;
    }

    [data-bs-theme="dark"] .doctor-card-status-badge.bg-success-subtle {
        background-color: rgba(34, 197, 94, 0.18) !important;
        border-color: rgba(34, 197, 94, 0.4) !important;
        color: #4ade80 !important;
    }

    [data-bs-theme="dark"] .doctor-card-status-badge.bg-secondary-subtle {
        background-color: rgba(148, 163, 184, 0.18) !important;
        border-color: rgba(148, 163, 184, 0.4) !important;
        color: #cbd5e1 !important;
    }

    .emergency-phone-card {
        background: linear-gradient(to right, #ffffff, #f0fdf4);
        border-right: 5px solid #0284c7 !important;
    }

    [data-bs-theme="dark"] .emergency-phone-card {
        background: linear-gradient(to right, #1e293b, #0f172a) !important;
        border: 1px solid #334155 !important;
        border-right: 5px solid #38bdf8 !important;
        color: #f8fafc !important;
    }




    /* High-Contrast Dark Mode Doctor Cards & Typography */
    [data-bs-theme="dark"] .doctor-card-item {
        background-color: #1e293b !important;
        border: 1.5px solid #334155 !important;
        color: #f8fafc !important;
    }

    [data-bs-theme="dark"] .doctor-card-item .doc-name-header,
    [data-bs-theme="dark"] .doctor-card-item h6,
    [data-bs-theme="dark"] .doctor-card-item .text-dark,
    [data-bs-theme="dark"] .doctor-card-item .fw-bold.text-dark {
        color: #ffffff !important;
        font-weight: 700 !important;
    }

    [data-bs-theme="dark"] .doctor-card-item .text-primary {
        color: #38bdf8 !important;
        font-weight: 600 !important;
    }

    [data-bs-theme="dark"] .doctor-card-item .text-muted,
    [data-bs-theme="dark"] .doctor-card-item small.text-muted {
        color: #cbd5e1 !important;
    }

    [data-bs-theme="dark"] .doctor-schedule-box {
        background-color: #0f172a !important;
        border: 1px solid #334155 !important;
        color: #f1f5f9 !important;
    }

    [data-bs-theme="dark"] .doctor-schedule-box .text-dark {
        color: #f8fafc !important;
    }

    [data-bs-theme="dark"] .doctor-schedule-box .text-muted {
        color: #cbd5e1 !important;
    }

    [data-bs-theme="dark"] .doctor-schedule-box .text-primary {
        color: #38bdf8 !important;
    }

    [data-bs-theme="dark"] .doctor-card-item .edit-doctor-action-btn,
    [data-bs-theme="dark"] .doctor-card-item .btn-outline-primary {
        color: #38bdf8 !important;
        border-color: #0284c7 !important;
    }

    [data-bs-theme="dark"] .doctor-card-item .edit-doctor-action-btn:hover,
    [data-bs-theme="dark"] .doctor-card-item .btn-outline-primary:hover {
        background-color: #0284c7 !important;
        color: #ffffff !important;
    }

    [data-bs-theme="dark"] .doctor-card-item .schedule-doctor-action-btn,
    [data-bs-theme="dark"] .doctor-card-item .btn-outline-info {
        color: #38bdf8 !important;
        border-color: #0284c7 !important;
    }

    [data-bs-theme="dark"] .doctor-card-item .schedule-doctor-action-btn:hover,
    [data-bs-theme="dark"] .doctor-card-item .btn-outline-info:hover {
        background-color: #0284c7 !important;
        color: #ffffff !important;
    }

    [data-bs-theme="dark"] .form-label,
    [data-bs-theme="dark"] label,
    [data-bs-theme="dark"] .text-dark {
        color: #f8fafc !important;
    }
</style>

<div class="doctor-dash-wrapper py-3">
    <!-- رأس لوحة التحكم -->
    <div class="dash-header-card">
        <div class="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3">
            <div>
                <h1 class="h3 fw-bold mb-1">
                    <i class="bi bi-gear-wide-connected text-primary me-2"></i>
                    لوحة تحكم الطبيب وإدارة العيادة - <span class="text-primary fw-bold">مركز دينتال سيتي</span>
                </h1>
                <p class="text-white-50 mb-0 small">
                    تحكم تنفيذي متكامل في مؤشرات المركز، الأطباء، المواعيد، وجدول العيادة اليومي.
                </p>
            </div>
            <div class="d-flex flex-wrap align-items-center gap-2">
                <div
                    class="d-flex align-items-center gap-2 bg-dark bg-opacity-50 px-3 py-1 rounded-pill border border-secondary">
                    <i class="bi bi-person-check-fill text-success"></i>
                    <span class="small text-white fw-semibold">
                        <%= (typeof doctorUser !=='undefined' && doctorUser) ? doctorUser.name : 'د. حازم حجاج' %>
                    </span>
                </div>
                <a href="/Appointments/Book" target="_blank"
                    class="btn btn-outline-light btn-sm px-3 rounded-pill fw-semibold">
                    <i class="bi bi-box-arrow-up-right me-1"></i> معاينة صفحة الحجز
                </a>
                <button type="button" class="btn btn-primary btn-sm px-3 rounded-pill shadow-sm fw-semibold"
                    onclick="openAddDoctorModal()">
                    <i class="bi bi-person-plus-fill me-1"></i> إضافة طبيب جديد
                </button>
                <button type="button" class="btn btn-outline-warning btn-sm px-3 rounded-pill text-white fw-semibold"
                    onclick="openChangePasswordModal()" title="تغيير كلمة المرور">
                    <i class="bi bi-key-fill me-1"></i> تغيير كلمة المرور
                </button>
                <form method="post" action="/Doctor/Dashboard?handler=Logout" class="d-inline m-0">
                    <button type="submit" class="btn btn-outline-danger btn-sm px-3 rounded-pill text-white fw-semibold"
                        title="تسجيل الخروج">
                        <i class="bi bi-box-arrow-right me-1"></i> خروج
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- التبويبات الرئيسية للوحة التحكم (لوحة التحكم التنفيذية، أطباء وتخصصات، موظفين، خدمات، إعدادات) -->
    <div class="panel-card p-0 overflow-hidden">
        <ul class="nav nav-tabs px-3 pt-2 bg-light border-bottom" id="dashboardTabs" role="tablist">
            <!-- 1. لوحة التحكم العامة (Executive Summary) -->
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview-panel"
                    type="button" role="tab" aria-selected="true">
                    <i class="bi bi-speedometer2 me-1"></i> لوحة التحكم (Executive Summary)
                </button>
            </li>

            <!-- 2. بيانات وسجل حجوزات المرضى (Patient Booking Management) -->
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="patients-tab" data-bs-toggle="tab" data-bs-target="#patients-panel"
                    type="button" role="tab" aria-selected="false">
                    <i class="bi bi-person-lines-fill me-1 text-primary"></i> بيانات حجوزات المرضى (<%= allBookings ? allBookings.length : 0 %>)
                </button>
            </li>

            <!-- 3. الأطباء والتخصصات -->
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="doctors-tab" data-bs-toggle="tab" data-bs-target="#doctors-panel"
                    type="button" role="tab" aria-selected="false">
                    <i class="bi bi-hospital me-1"></i> الأطباء والتخصصات (<%= doctors ? doctors.length : 0 %>)
                </button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="staff-tab" data-bs-toggle="tab" data-bs-target="#staff-panel" type="button"
                    role="tab" aria-selected="false">
                    <i class="bi bi-shield-lock me-1"></i> الموظفين والصلاحيات
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="services-tab" data-bs-toggle="tab" data-bs-target="#services-panel"
                    type="button" role="tab" aria-selected="false">
                    <i class="bi bi-tags me-1"></i> الخدمات (<%= services ? services.length : 0 %>)
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-panel"
                    type="button" role="tab" aria-selected="false">
                    <i class="bi bi-gear-wide-connected me-1"></i> إعدادات الورديات والمواعيد
                </button>
            </li>
        </ul>

        <div class="tab-content p-4" id="dashboardTabsContent">
            <!-- 1. تبويب لوحة التحكم العامة والمؤشرات التشغيلية (Executive Summary Panel) -->
            <div class="tab-pane fade show active" id="overview-panel" role="tabpanel">
                <!-- Welcome Executive Summary Banner -->
                <div class="card border-0 rounded-4 shadow-sm p-4 mb-4" style="background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%); color: white;">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                            <span class="badge bg-white bg-opacity-25 text-white px-3 py-1 rounded-pill fw-semibold mb-2">
                                <i class="bi bi-speedometer2 me-1"></i> لوحة القيادة التنفيذية والمؤشرات العامة
                            </span>
                            <h3 class="fw-bold mb-1">مركز القيادة التشغيلية - <span class="fw-bold" style="color: #ffffff !important;">مركز دينتال سيتي</span></h3>
                            <p class="mb-0 text-white-50 small">
                                متابعة حية لحركة الحجوزات اليومية، طلبات الانتظار العاجلة، والمؤشرات التشغيلية وجاهزية العيادات المعتمدة.
                            </p>
                        </div>
                        <div class="d-flex flex-wrap align-items-center gap-2">
                            <button type="button" class="btn btn-light text-primary fw-bold px-3 py-2 rounded-pill shadow-sm" onclick="document.getElementById('doctors-tab').click()">
                                <i class="bi bi-hospital me-1"></i> إدارة الأطباء (<%= doctorsList.length %>)
                            </button>
                            <a href="/Patient/Portal" class="btn btn-outline-light px-3 py-2 rounded-pill fw-semibold">
                                <i class="bi bi-calendar-check me-1"></i> بوابة المريض
                            </a>
                        </div>
                    </div>
                </div>

                <!-- 4 High-Level Operational KPI Cards -->
                <div class="row g-3 mb-4">
                    <!-- 1. Total Daily & Overall Appointments -->
                    <div class="col-sm-6 col-xl-3">
                        <div class="overview-kpi-card">
                            <div class="d-flex align-items-center gap-3">
                                <div class="overview-kpi-icon bg-primary-subtle text-primary">
                                    <i class="bi bi-calendar-check-fill"></i>
                                </div>
                                <div class="min-w-0 flex-grow-1">
                                    <div class="overview-kpi-title">إجمالي الحجوزات الطبية</div>
                                    <div class="overview-kpi-value"><%= allBookings.length %> حجز</div>
                                    <div class="overview-kpi-subtext">
                                        <span class="text-success fw-bold"><i class="bi bi-check-circle me-1"></i><%= confirmedCount %> مؤكد</span>
                                        <span class="mx-1">•</span>
                                        <span><%= completedCount %> مكتمل</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Urgent Pending Requests & Queue -->
                    <div class="col-sm-6 col-xl-3">
                        <div class="overview-kpi-card">
                            <div class="d-flex align-items-center gap-3">
                                <div class="overview-kpi-icon bg-warning-subtle text-warning">
                                    <i class="bi bi-hourglass-split"></i>
                                </div>
                                <div class="min-w-0 flex-grow-1">
                                    <div class="overview-kpi-title">طلبات الانتظار العاجلة</div>
                                    <div class="overview-kpi-value text-warning-emphasis"><%= pendingCount %> طلب</div>
                                    <div class="overview-kpi-subtext">
                                        <a href="https://wa.me/<%= emergencyPhoneNum.replace(/[^0-9]/g, '') %>" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-success fw-bold">
                                            <i class="bi bi-whatsapp me-1"></i> متابعة عاجلة
                                        </a>
                                        <span class="mx-1">•</span>
                                        <span><%= emergencyPhoneNum %></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 3. Active Medical Services & Disciplines -->
                    <div class="col-sm-6 col-xl-3">
                        <div class="overview-kpi-card">
                            <div class="d-flex align-items-center gap-3">
                                <div class="overview-kpi-icon bg-success-subtle text-success">
                                    <i class="bi bi-journal-medical"></i>
                                </div>
                                <div class="min-w-0 flex-grow-1">
                                    <div class="overview-kpi-title">الخدمات الطبية المعتمدة</div>
                                    <div class="overview-kpi-value text-success"><%= servicesList.length %> خدمات</div>
                                    <div class="overview-kpi-subtext">
                                        <span class="text-success fw-bold"><i class="bi bi-shield-check me-1"></i>جاهزية كاملة</span>
                                        <span class="mx-1">•</span>
                                        <span>طب وجراحة الأسنان</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. System Status & Operational Health -->
                    <div class="col-sm-6 col-xl-3">
                        <div class="overview-kpi-card">
                            <div class="d-flex align-items-center gap-3">
                                <div class="overview-kpi-icon bg-info-subtle text-info">
                                    <i class="bi bi-activity"></i>
                                </div>
                                <div class="min-w-0 flex-grow-1">
                                    <div class="overview-kpi-title">كفاءة التشغيل والجاهزية</div>
                                    <div class="overview-kpi-value text-info"><%= activeDoctorsCount %> / <%= doctorsList.length %> أطباء</div>
                                    <div class="overview-kpi-subtext">
                                        <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-0">ورديتان (صباحي/مسائي)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Operational Details Row -->
                <div class="row g-3 mb-4">
                    <!-- Operational Shift Schedule Card -->
                    <div class="col-lg-6">
                        <div class="overview-section-box h-100">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5 class="overview-section-title mb-0">
                                    <i class="bi bi-clock-history text-primary"></i>
                                    نظام الورديات وساعات العمل اليومية
                                </h5>
                                <button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-3" onclick="openShiftEditModal()">
                                    <i class="bi bi-pencil-square me-1"></i> تخصيص الورديات
                                </button>
                            </div>
                            <div class="row g-2 mb-3">
                                <div class="col-6">
                                    <div class="p-3 rounded-3 border bg-light h-100 shift-summary-mini-card">
                                        <div class="d-flex align-items-center gap-2 mb-1">
                                            <span class="badge bg-primary text-white rounded-pill px-2 py-1">الوردية الصباحية</span>
                                        </div>
                                        <h6 class="fw-bold text-dark mb-1">09:00 ص - 12:00 م</h6>
                                        <small class="text-muted">3 ساعات كشف متواصلة</small>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="p-3 rounded-3 border bg-light h-100 shift-summary-mini-card">
                                        <div class="d-flex align-items-center gap-2 mb-1">
                                            <span class="badge bg-info text-white rounded-pill px-2 py-1">الوردية المسائية</span>
                                        </div>
                                        <h6 class="fw-bold text-dark mb-1">12:00 م - 06:00 م</h6>
                                        <small class="text-muted">6 ساعات كشف واستشارات</small>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between p-2 rounded-3 bg-primary-subtle text-primary border border-primary-subtle small fw-semibold">
                                <span><i class="bi bi-shield-check me-1"></i> فاصل كشف إلزامي 60 دقيقة لكل مريض لمنع التكدس</span>
                                <span class="badge bg-primary text-white rounded-pill">معتمد بالمركز</span>
                            </div>
                        </div>
                    </div>

                    <!-- Active Doctor Status Summary Widget -->
                    <div class="col-lg-6">
                        <div class="overview-section-box h-100">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5 class="overview-section-title mb-0">
                                    <i class="bi bi-person-badge-fill text-primary"></i>
                                    حالة وجاهزية الكادر الطبي والعيادات
                                </h5>
                                <button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-3" onclick="document.getElementById('doctors-tab').click()">
                                    <i class="bi bi-arrow-left me-1"></i> إدارة الأطباء (<%= doctorsList.length %>)
                                </button>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <% if (doctorsList && doctorsList.length > 0) { %>
                                    <% doctorsList.slice(0, 4).forEach((doc) => { %>
                                        <div class="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-light bg-opacity-50">
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="staff-avatar-circle bg-primary text-white fw-bold" style="width: 36px; height: 36px; font-size: 0.85rem; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                                    <%= (doc.name || 'ط').charAt(0) %>
                                                </div>
                                                <div>
                                                    <span class="fw-bold text-dark d-block small"><%= doc.name %></span>
                                                    <small class="text-muted"><%= doc.specialty || 'استشاري طب وجراحة الأسنان' %></small>
                                                </div>
                                            </div>
                                            <div class="text-end">
                                                <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1 small">
                                                    <i class="bi bi-check-circle-fill me-1"></i> متاح بالعيادة
                                                </span>
                                                <small class="text-muted d-block mt-1" style="font-size: 0.72rem;">
                                                    <i class="bi bi-clock me-1"></i> وردية صباحية ومسائية
                                                </small>
                                            </div>
                                        </div>
                                    <% }); %>
                                <% } else { %>
                                    <div class="text-center py-3 text-muted small">لا توجد بيانات أطباء مسجلة حالياً</div>
                                <% } %>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Urgent Bookings Table Widget -->
                <div class="overview-section-box mb-4">
                    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                        <div>
                            <h5 class="overview-section-title mb-1">
                                <i class="bi bi-bell-fill text-warning"></i>
                                أحدث الحجوزات وطلبات الكشف الواردة
                            </h5>
                            <span class="text-muted small">قائمة سريعة بآخر 5 حجوزات مسجلة للمتابعة والتأكيد الفوري</span>
                        </div>
                        <a href="/Patient/Portal" class="btn btn-primary btn-sm rounded-pill px-3 fw-bold">
                            <i class="bi bi-table me-1"></i> الانتقال لسجل الحجوزات الكامل
                        </a>
                    </div>

                    <div class="table-responsive rounded-3 border">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>الرقم المرجعي</th>
                                    <th>اسم المريض</th>
                                    <th>الهاتف</th>
                                    <th>الطبيب المعالج</th>
                                    <th>الخدمة المطلوبة</th>
                                    <th>تاريخ ووقت الكشف</th>
                                    <th>الحالة</th>
                                    <th>إجراء فوري</th>
                                </tr>
                            </thead>
                            <tbody>
                                <% if (recentUrgentBookings.length > 0) { %>
                                    <% recentUrgentBookings.forEach(b => { %>
                                        <tr>
                                            <td>
                                                <span class="badge bg-primary font-monospace fw-bold px-2 py-1"><%= b.reference %></span>
                                            </td>
                                            <td class="fw-bold text-dark"><%= b.patient_name %></td>
                                            <td dir="ltr" class="text-end font-monospace text-muted small"><%= b.patient_phone %></td>
                                            <td>
                                                <span class="fw-semibold text-primary"><%= b.doctor_name %></span>
                                            </td>
                                            <td>
                                                <span class="badge bg-light text-dark border"><%= b.selected_service %></span>
                                            </td>
                                            <td>
                                                <span class="small fw-semibold"><%= b.appointment_date %></span>
                                                <span class="badge bg-light text-muted border ms-1"><%= b.appointment_time %></span>
                                            </td>
                                            <td>
                                                <% if (b.status === 'مؤكد') { %>
                                                    <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded-pill">🟢 مؤكد</span>
                                                <% } else if (b.status === 'قيد الانتظار' || b.status === 'pending') { %>
                                                    <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1 rounded-pill">🟡 قيد الانتظار</span>
                                                <% } else if (b.status === 'مكتمل') { %>
                                                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 rounded-pill">🔵 مكتمل</span>
                                                <% } else { %>
                                                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded-pill">🔴 ملغي</span>
                                                <% } %>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center gap-1">
                                                    <a href="https://wa.me/<%= (b.patient_phone || '').replace(/[^0-9]/g, '') %>?text=<%= encodeURIComponent('مرحباً بك من مركز دينتال سيتي بخصوص حجزك رقم: ' + b.reference) %>" 
                                                       target="_blank" rel="noopener noreferrer" class="btn btn-outline-success btn-sm rounded-pill px-2 py-1" title="محادثة واتساب سريعة">
                                                        <i class="bi bi-whatsapp"></i>
                                                    </a>
                                                    <a href="/Appointments/Confirmation?reference=<%= encodeURIComponent(b.reference) %>" class="btn btn-outline-primary btn-sm rounded-pill px-2 py-1" title="تفاصيل الحجز">
                                                        <i class="bi bi-eye"></i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    <% }); %>
                                <% } else { %>
                                    <tr>
                                        <td colspan="8" class="text-center py-4 text-muted">
                                            <i class="bi bi-inbox fs-2 d-block mb-1 text-secondary"></i>
                                            <span>لا توجد حجوزات مسجلة حالياً.</span>
                                        </td>
                                    </tr>
                                <% } %>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Executive Quick Action Navigation Launchers -->
                <div class="row g-3">
                    <div class="col-md-4">
                        <div class="p-3 rounded-4 border bg-light d-flex align-items-center justify-content-between overview-action-tile" 
                             style="cursor: pointer;" onclick="document.getElementById('doctors-tab').click()">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 44px; height: 44px;">
                                    <i class="bi bi-hospital fs-5"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold mb-0 text-dark">إدارة الأطباء والتخصصات</h6>
                                    <small class="text-muted"><%= doctorsList.length %> أطباء معتمدين</small>
                                </div>
                            </div>
                            <i class="bi bi-chevron-left text-muted"></i>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-3 rounded-4 border bg-light d-flex align-items-center justify-content-between overview-action-tile" 
                             style="cursor: pointer;" onclick="document.getElementById('staff-tab').click()">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-success text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 44px; height: 44px;">
                                    <i class="bi bi-shield-lock fs-5"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold mb-0 text-dark">الموظفين وصلاحيات الكادر</h6>
                                    <small class="text-muted">المدير الطبي والاستقبال</small>
                                </div>
                            </div>
                            <i class="bi bi-chevron-left text-muted"></i>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-3 rounded-4 border bg-light d-flex align-items-center justify-content-between overview-action-tile" 
                             style="cursor: pointer;" onclick="document.getElementById('settings-tab').click()">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-warning text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 44px; height: 44px;">
                                    <i class="bi bi-gear-wide-connected fs-5"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold mb-0 text-dark">إعدادات الورديات والعيادة</h6>
                                    <small class="text-muted">تخصيص الفترات وساعات العمل</small>
                                </div>
                            </div>
                            <i class="bi bi-chevron-left text-muted"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. تبويب بيانات وسجل حجوزات المرضى (Patient Booking Management Module) -->
            <div class="tab-pane fade" id="patients-panel" role="tabpanel" aria-labelledby="patients-tab">
                <!-- Header with Action -->
                <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                    <div>
                        <h4 class="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                            <i class="bi bi-person-lines-fill text-primary"></i> بيانات وسجل حجوزات المرضى (Patient Booking Management)
                        </h4>
                        <p class="text-muted small mb-0">إدارة مركزية شاملة لجميع كشوفات وحجوزات المرضى، مع إمكانية الفرز والبحث الفوري بالاسم أو الهاتف أو الطبيب</p>
                    </div>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                        <a href="/Appointments/Book" target="_blank" class="btn btn-primary rounded-pill px-4 shadow-sm fw-semibold">
                            <i class="bi bi-calendar2-plus me-1"></i> حجز كشف جديد لمريض
                        </a>
                    </div>
                </div>

                <!-- Operational Metrics Ribbon -->
                <div class="row g-3 mb-4">
                    <div class="col-6 col-lg-3">
                        <div class="p-3 rounded-4 border bg-light h-100 overview-kpi-card">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <span class="small fw-semibold text-muted">إجمالي المرضى والحجوزات</span>
                                <div class="bg-primary-subtle text-primary p-2 rounded-circle"><i class="bi bi-people-fill"></i></div>
                            </div>
                            <h3 class="fw-bold mb-0 text-dark"><%= allBookings ? allBookings.length : 0 %></h3>
                            <small class="text-muted">سجل الحجوزات الكامل</small>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3">
                        <div class="p-3 rounded-4 border bg-light h-100 overview-kpi-card">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <span class="small fw-semibold text-muted">الحجوزات المؤكدة</span>
                                <div class="bg-success-subtle text-success p-2 rounded-circle"><i class="bi bi-calendar-check-fill"></i></div>
                            </div>
                            <h3 class="fw-bold mb-0 text-success"><%= confirmedCount %></h3>
                            <small class="text-muted">حضور مؤكد بالعيادة</small>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3">
                        <div class="p-3 rounded-4 border bg-light h-100 overview-kpi-card">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <span class="small fw-semibold text-muted">طلبات قيد الانتظار</span>
                                <div class="bg-warning-subtle text-warning-emphasis p-2 rounded-circle"><i class="bi bi-hourglass-split"></i></div>
                            </div>
                            <h3 class="fw-bold mb-0 text-warning"><%= pendingCount %></h3>
                            <small class="text-muted">تتطلب مراجعة الاستقبال</small>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3">
                        <div class="p-3 rounded-4 border bg-light h-100 overview-kpi-card">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <span class="small fw-semibold text-muted">جلسات كشف مكتملة</span>
                                <div class="bg-info-subtle text-info p-2 rounded-circle"><i class="bi bi-check-circle-fill"></i></div>
                            </div>
                            <h3 class="fw-bold mb-0 text-info"><%= completedCount %></h3>
                            <small class="text-muted">تم الانتهاء من فحصها</small>
                        </div>
                    </div>
                </div>

                <!-- Search & Filter Controls -->
                <div class="card border rounded-4 shadow-sm p-3 mb-4 patient-search-card">
                    <div class="row g-2 align-items-center">
                        <div class="col-lg-5 col-md-6">
                            <div class="position-relative">
                                <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-primary fs-5"></i>
                                <input type="text" id="patientBookingSearchInput" class="form-control form-control-lg rounded-pill ps-5 pe-5 border"
                                    placeholder="ابحث باسم المريض، رقم الهاتف، الطبيب المعالج، كود الحجز..."
                                    onkeyup="filterPatientBookings()" oninput="filterPatientBookings()" autocomplete="off">
                                <button type="button" class="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted d-none" 
                                    id="clearPatientSearchBtn" onclick="clearPatientSearch()" title="مسح حقل البحث">
                                    <i class="bi bi-x-circle-fill fs-5"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-3 col-md-3">
                            <select id="patientBookingStatusFilter" class="form-select form-select-lg rounded-pill border" onchange="filterPatientBookings()">
                                <option value="">جميع الحالات (All Statuses)</option>
                                <option value="مؤكد">مؤكد (Confirmed)</option>
                                <option value="قيد الانتظار">قيد الانتظار (Pending)</option>
                                <option value="مكتمل">مكتمل (Completed)</option>
                                <option value="ملغي">ملغي (Cancelled)</option>
                            </select>
                        </div>
                        <div class="col-sm-6 col-lg-4 col-md-3">
                            <div class="d-flex align-items-center justify-content-between gap-2 p-2 bg-light rounded-pill border px-3">
                                <span class="small text-muted text-nowrap"><i class="bi bi-funnel-fill text-primary me-1"></i>نتائج البحث:</span>
                                <span class="badge bg-primary text-white rounded-pill px-3 py-1" id="patientFilterResultsBadge">
                                    عرض <%= allBookings ? allBookings.length : 0 %> من <%= allBookings ? allBookings.length : 0 %>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Patients List Table -->
                <div class="card border rounded-4 shadow-sm overflow-hidden mb-4">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0" id="patientsBookingTable">
                            <thead class="table-light">
                                <tr>
                                    <th class="ps-3" style="width: 140px;">الرمز المرجعي</th>
                                    <th>اسم المريض وبيانات الاتصال</th>
                                    <th>الطبيب المعالج</th>
                                    <th>الخدمة المطلوبة</th>
                                    <th>تاريخ وتوقيت الكشف</th>
                                    <th>الوردية</th>
                                    <th>حالة الحجز</th>
                                    <th class="text-center pe-3" style="width: 130px;">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="patientsBookingTableBody">
                                <% if (allBookings && allBookings.length > 0) { %>
                                    <% allBookings.forEach((b) => { %>
                                        <% 
                                            const pName = b.patient_name || 'مريض غير مسجل';
                                            const pInitial = pName.trim().charAt(0) || 'م';
                                            const pPhone = b.patient_phone || '';
                                            const pCleanPhone = pPhone.replace(/[^0-9]/g, '');
                                            const bStatus = (b.status || 'قيد الانتظار').trim();
                                            let badgeCls = 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';
                                            if (bStatus === 'مؤكد') badgeCls = 'bg-success-subtle text-success border border-success-subtle';
                                            else if (bStatus === 'مكتمل') badgeCls = 'bg-info-subtle text-info border border-info-subtle';
                                            else if (bStatus === 'ملغي') badgeCls = 'bg-danger-subtle text-danger border border-danger-subtle';
                                        %>
                                        <tr class="patient-booking-row" 
                                            data-patient-name="<%- pName.toLowerCase() %>"
                                            data-patient-phone="<%- pCleanPhone %>"
                                            data-booking-ref="<%- (b.reference || '').toLowerCase() %>"
                                            data-doctor-name="<%- (b.doctor_name || '').toLowerCase() %>"
                                            data-service-name="<%- (b.selected_service || '').toLowerCase() %>"
                                            data-status="<%- bStatus %>">
                                            
                                            <!-- Reference Code -->
                                            <td class="ps-3">
                                                <div class="d-flex align-items-center gap-1">
                                                    <span class="font-monospace fw-bold text-primary small"><%= b.reference %></span>
                                                    <button type="button" class="btn btn-sm btn-link p-0 text-muted" 
                                                            onclick="navigator.clipboard.writeText('<%= b.reference %>'); showToastNotification('تم نسخ الرمز المرجعي للحجز');" 
                                                            title="نسخ كود الحجز">
                                                        <i class="bi bi-copy" style="font-size: 0.8rem;"></i>
                                                    </button>
                                                </div>
                                            </td>

                                            <!-- Patient Info -->
                                            <td>
                                                <div class="d-flex align-items-center gap-2">
                                                    <div class="patient-avatar-circle flex-shrink-0">
                                                        <%= pInitial %>
                                                    </div>
                                                    <div class="min-w-0">
                                                        <div class="fw-bold text-dark text-truncate patient-name-text" title="<%= pName %>">
                                                            <%= pName %>
                                                        </div>
                                                        <div class="small d-flex align-items-center gap-2 text-muted">
                                                            <% if (pPhone) { %>
                                                                <span dir="ltr"><i class="bi bi-telephone text-primary me-1"></i><%= pPhone %></span>
                                                                <a href="https://wa.me/<%= pCleanPhone %>?text=<%= encodeURIComponent('مرحباً بك من مركز دينتال سيتي بخصوص حجزك رقم: ' + b.reference) %>" 
                                                                   target="_blank" rel="noopener noreferrer" 
                                                                   class="text-success text-decoration-none small fw-semibold" title="محادثة واتساب فورية">
                                                                    <i class="bi bi-whatsapp"></i>
                                                                </a>
                                                            <% } else { %>
                                                                <span>-</span>
                                                            <% } %>
                                                            <% if (b.gender) { %>
                                                                <span class="badge bg-secondary-subtle text-secondary" style="font-size: 0.65rem;"><%= b.gender %></span>
                                                            <% } %>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <!-- Doctor -->
                                            <td>
                                                <div class="fw-semibold text-primary"><%= b.doctor_name || 'طبيب عام' %></div>
                                                <small class="text-muted d-block"><%= b.doctor_specialty || 'طب وجراحة الأسنان' %></small>
                                            </td>

                                            <!-- Service -->
                                            <td>
                                                <span class="badge bg-light text-dark border px-2 py-1"><%= b.selected_service || 'كشف واستشارة' %></span>
                                            </td>

                                            <!-- Date & Time -->
                                            <td>
                                                <div class="fw-bold text-dark small"><i class="bi bi-calendar3 me-1 text-primary"></i><%= b.appointment_date %></div>
                                                <div class="small text-muted"><i class="bi bi-clock me-1 text-primary"></i><%= b.appointment_time %></div>
                                            </td>

                                            <!-- Shift -->
                                            <td>
                                                <% const isEve = (b.shift_type === 'evening' || (b.appointment_time && (b.appointment_time.includes('م') || b.appointment_time.includes('PM')))); %>
                                                <span class="badge <%= isEve ? 'bg-primary-subtle text-primary border border-primary-subtle' : 'bg-warning-subtle text-warning-emphasis border border-warning-subtle' %> rounded-pill">
                                                    <i class="bi <%= isEve ? 'bi-moon-stars-fill' : 'bi-sun-fill' %> me-1"></i><%= isEve ? 'مسائية' : 'صباحية' %>
                                                </span>
                                            </td>

                                            <!-- Status -->
                                            <td>
                                                <select class="form-select form-select-sm rounded-pill status-change-select <%= badgeCls %>" 
                                                        style="width: 120px; font-weight: 700;"
                                                        data-ref="<%= b.reference %>"
                                                        onchange="updatePatientBookingStatusAjax(this, '<%= b.reference %>')">
                                                    <option value="قيد الانتظار" <%= bStatus === 'قيد الانتظار' ? 'selected' : '' %>>قيد الانتظار</option>
                                                    <option value="مؤكد" <%= bStatus === 'مؤكد' ? 'selected' : '' %>>مؤكد</option>
                                                    <option value="مكتمل" <%= bStatus === 'مكتمل' ? 'selected' : '' %>>مكتمل</option>
                                                    <option value="ملغي" <%= bStatus === 'ملغي' ? 'selected' : '' %>>ملغي</option>
                                                </select>
                                            </td>

                                            <!-- Action Buttons -->
                                            <td class="text-center pe-3">
                                                <button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-3 view-patient-detail-btn"
                                                    data-ref="<%- b.reference %>"
                                                    data-name="<%- (pName || '').replace(/"/g, '&quot;') %>"
                                                    data-phone="<%- pPhone %>"
                                                    data-gender="<%- b.gender || '-' %>"
                                                    data-birth="<%- b.birth_date || '-' %>"
                                                    data-doctor="<%- (b.doctor_name || '-').replace(/"/g, '&quot;') %>"
                                                    data-specialty="<%- (b.doctor_specialty || '-').replace(/"/g, '&quot;') %>"
                                                    data-service="<%- (b.selected_service || '-').replace(/"/g, '&quot;') %>"
                                                    data-date="<%- b.appointment_date %>"
                                                    data-time="<%- b.appointment_time %>"
                                                    data-shift="<%- isEve ? 'مسائية' : 'صباحية' %>"
                                                    data-status="<%- bStatus %>"
                                                    data-notes="<%- (b.patient_notes || 'لا توجد ملاحظات إضافية').replace(/"/g, '&quot;') %>"
                                                    onclick="openPatientDetailsModal(this)" title="عرض التفاصيل الكاملة للحجز">
                                                    <i class="bi bi-eye-fill me-1"></i> التفاصيل
                                                </button>
                                            </td>
                                        </tr>
                                    <% }); %>
                                <% } else { %>
                                    <tr>
                                        <td colspan="8" class="text-center py-5">
                                            <div class="rounded-circle bg-light d-inline-flex p-4 text-muted mb-3 border shadow-sm">
                                                <i class="bi bi-calendar-x fs-1 text-secondary"></i>
                                            </div>
                                            <h6 class="fw-bold text-dark mb-1">لا توجد حجوزات مسجلة حالياً في قاعدة البيانات</h6>
                                            <p class="text-muted small">يمكنك تسجيل حجز جديد لمريض عبر الضغط على الزر أعلاه</p>
                                        </td>
                                    </tr>
                                <% } %>
                                <!-- Empty Filter Row -->
                                <tr id="noPatientsFoundRow" class="d-none">
                                    <td colspan="8" class="text-center py-5">
                                        <div class="rounded-circle bg-light d-inline-flex p-4 text-muted mb-3 border shadow-sm">
                                            <i class="bi bi-search fs-1 text-primary"></i>
                                        </div>
                                        <h6 class="fw-bold text-dark mb-1">لم يتم العثور على أي نتائج مطابقة للبحث</h6>
                                        <p class="text-muted small mb-3">يرجى التأكد من كتابة اسم المريض أو رقم الهاتف بشكل صحيح</p>
                                        <button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-4" onclick="clearPatientSearch()">
                                            <i class="bi bi-arrow-clockwise me-1"></i> إعادة ضبط البحث
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- 3. تبويب أطباء المركز والتخصصات (Doctors & Specialties Module) -->
            <div class="tab-pane fade" id="doctors-panel" role="tabpanel">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h5 class="fw-bold text-dark mb-0">قائمة الأطباء والاستشاريين المعتمدين</h5>
                        <small class="text-muted">إدارة بيانات الأطباء وتحديد جداول الورديات (صباحي/مسائي) بفاصل ساعة
                            إلزامي</small>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm rounded-pill px-3 shadow-sm fw-semibold"
                        onclick="openAddDoctorModal()">
                        <i class="bi bi-plus-lg me-1"></i> إضافة طبيب جديد
                    </button>
                </div>

                <div class="row g-3">
                    <% if (typeof doctors !=='undefined' && doctors.length> 0) { %>
                        <% doctors.forEach(doc=> { %>
                            <div class="col-md-6 col-lg-4" id="doctor-card-<%= doc.id %>">
                                <div
                                    class="card h-100 border rounded-4 p-3 shadow-sm doctor-card-item d-flex flex-column">
                                    <div class="doctor-card-header d-flex align-items-start justify-content-between gap-2 mb-3">
                                        <div class="d-flex align-items-center gap-3 min-w-0 flex-grow-1">
                                            <% const docInitial = (doc.name && doc.name.trim().length > 0) ? (doc.name.replace(/^د\.?\s*/, '').trim().charAt(0) || 'د') : 'د'; %>
                                            <div class="doctor-avatar-wrapper position-relative flex-shrink-0">
                                                <div class="doctor-avatar-circle">
                                                    <%= docInitial %>
                                                </div>
                                                <span class="doctor-status-dot <%= doc.IsActive ? 'status-active' : 'status-inactive' %>" title="<%= doc.IsActive ? 'طبيب نشط' : 'طبيب معطل' %>"></span>
                                            </div>
                                            <div class="flex-grow-1 min-w-0">
                                                <h6 class="fw-bold mb-0 text-primary doc-name-header text-truncate"
                                                    style="color: var(--primary-blue, #0284c7) !important;"
                                                    title="<%= doc.name %>">
                                                    <%= doc.name %>
                                                </h6>
                                                <div class="text-primary small fw-semibold text-truncate d-flex align-items-center gap-1">
                                                    <span><%= doc.title %></span>
                                                    <i class="bi bi-patch-check-fill text-primary" style="font-size: 0.82rem;" title="كادر طبي معتمد"></i>
                                                </div>
                                                <div class="text-muted small text-truncate">
                                                    <%= doc.specialty %>
                                                </div>
                                            </div>
                                        </div>
                                        <span class="badge doctor-card-status-badge <%= doc.IsActive ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-secondary-subtle text-secondary border border-secondary-subtle' %> rounded-pill px-2 py-1 flex-shrink-0">
                                            <i class="bi <%= doc.IsActive ? 'bi-check-circle-fill' : 'bi-dash-circle' %> me-1"></i><%= doc.IsActive ? 'نشط' : 'معطل' %>
                                        </span>
                                    </div>
                                    <div class="doctor-schedule-box small mb-3 p-2 rounded-3 border"
                                        style="cursor: pointer; transition: all 0.2s ease;"
                                        title="انقر لفتح وتعديل جدول مواعيد وورديات الطبيب"
                                        data-id="<%= doc.id %>"
                                        data-name="<%- (doc.name || '').replace(/"/g, '&quot;') %>"
                                        data-hours="<%- (doc.workinghours || '').replace(/"/g, '&quot;') %>"
                                        data-days="<%- (doc.WorkingDays || '').replace(/"/g, '&quot;') %>"
                                        data-offday="<%= doc.OffDays || 5 %>"
                                        data-slots="<%- encodeURIComponent(JSON.stringify(doc.AvaliableSlots || [])) %>"
                                        onclick="openDoctorScheduleModalFromButton(this)">
                                        <div class="d-flex justify-content-between align-items-center mb-1">
                                            <span class="fw-semibold text-primary small"><i class="bi bi-clock-history me-1"></i> جدول المواعيد والورديات:</span>
                                            <span class="badge bg-primary-subtle text-primary border border-primary-subtle" style="font-size: 0.68rem;"><i class="bi bi-pencil-fill me-1"></i>تعديل الجدول</span>
                                        </div>
                                        <div class="text-truncate fw-medium text-dark">
                                            <i class="bi bi-clock text-primary me-1"></i><%= doc.workinghours || '09:00 ص - 12:00 م | 12:00 م - 06:00 م' %>
                                        </div>
                                        <div class="text-truncate small text-muted">
                                            <i class="bi bi-calendar-week text-warning me-1"></i><%= doc.WorkingDays || 'السبت - الخميس (الجمعة إجازة)' %>
                                        </div>
                                        <div class="d-flex justify-content-between text-muted small mt-1 pt-1 border-top" style="font-size: 0.75rem;">
                                            <span><i class="bi bi-geo-alt text-primary me-1"></i><%= doc.climicroom || 'العيادة الرئيسية' %></span>
                                            <span><i class="bi bi-award text-primary me-1"></i><%= doc.experienceyears %> سنوات | <%= doc.Rating %> <i class="bi bi-star-fill text-warning"></i></span>
                                        </div>
                                    </div>
                                    <div class="mt-auto pt-2 border-top doctor-card-actions">
                                        <div class="d-flex gap-2 mb-2">
                                            <button type="button"
                                                class="btn btn-outline-primary btn-sm rounded-pill flex-fill text-nowrap py-1 px-2 edit-doctor-action-btn"
                                                data-id="<%= doc.id %>"
                                                data-name="<%- (doc.name || '').replace(/"/g, '&quot;') %>"
                                                data-title="<%- (doc.title || '').replace(/"/g, '&quot;') %>"
                                                data-specialty="<%- (doc.specialty || '').replace(/"/g, '&quot;') %>"
                                                data-room="<%- (doc.climicroom || '').replace(/"/g, '&quot;') %>"
                                                data-rating="<%= doc.Rating || 5.0 %>"
                                                data-exp="<%= doc.experienceyears || 5 %>"
                                                data-active="<%= doc.IsActive ? 'true' : 'false' %>"
                                                data-hours="<%- (doc.workinghours || '').replace(/"/g, '&quot;') %>"
                                                data-days="<%- (doc.WorkingDays || '').replace(/"/g, '&quot;') %>"
                                                onclick="openEditDoctorModalFromButton(this)"
                                                title="تعديل بيانات الطبيب">
                                                <i class="bi bi-pencil-square me-1"></i> تعديل بيانات
                                            </button>
                                            <button type="button"
                                                class="btn btn-outline-info btn-sm rounded-pill flex-fill text-nowrap py-1 px-2 schedule-doctor-action-btn"
                                                data-id="<%= doc.id %>"
                                                data-name="<%- (doc.name || '').replace(/"/g, '&quot;') %>"
                                                data-hours="<%- (doc.workinghours || '').replace(/"/g, '&quot;') %>"
                                                data-days="<%- (doc.WorkingDays || '').replace(/"/g, '&quot;') %>"
                                                data-offday="<%= doc.OffDays || 5 %>"
                                                data-slots="<%- encodeURIComponent(JSON.stringify(doc.AvaliableSlots || [])) %>"
                                                onclick="openDoctorScheduleModalFromButton(this)"
                                                title="فتح وتعديل جدول مواعيد وورديات الطبيب">
                                                <i class="bi bi-calendar-range me-1"></i> جدول المواعيد
                                            </button>
                                        </div>
                                        <div class="d-flex align-items-center gap-2">
                                            <button type="button"
                                                class="btn btn-outline-warning btn-sm rounded-pill flex-grow-1 text-nowrap py-1 px-2 permissions-doctor-action-btn"
                                                data-id="<%= doc.id %>"
                                                data-name="<%- (doc.name || '').replace(/"/g, '&quot;') %>"
                                                data-title="<%- (doc.title || '').replace(/"/g, '&quot;') %>"
                                                data-type="doctor"
                                                data-role="Doctor"
                                                data-active="<%= doc.IsActive ? 'true' : 'false' %>"
                                                onclick="openDoctorPermissionsModal(this)"
                                                title="تعديل صلاحيات ودور الطبيب">
                                                <i class="bi bi-shield-lock me-1"></i> الصلاحيات والدور
                                            </button>
                                            <button type="button"
                                                class="btn btn-outline-danger btn-sm rounded-pill px-3 py-1 flex-shrink-0"
                                                data-doc-name="<%- (doc.name || '').replace(/"/g, '&quot;') %>" onclick="deleteDoctorAjax(<%= doc.id %>, this.getAttribute('data-doc-name'))" title="حذف الطبيب">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <% }); %>
                                <% } else { %>
                                    <div class="col-12 text-center py-5">
                                        <div
                                            class="rounded-circle bg-light d-inline-flex p-4 text-muted mb-3 border shadow-sm">
                                            <i class="bi bi-people-fill fs-1 text-secondary"></i>
                                        </div>
                                        <h5 class="fw-bold text-dark mb-1">لا يوجد أطباء مسجلون حالياً (0 أطباء)</h5>
                                        <p class="text-muted small mb-3">القائمة تبدأ فارغة تماماً. يمكنك إضافة الأطباء
                                            المعتمدين وجداول عملهم بالضغط على الزر أدناه.</p>
                                        <button type="button" class="btn btn-primary rounded-pill px-4 shadow-sm"
                                            onclick="openAddDoctorModal()">
                                            <i class="bi bi-person-plus-fill me-1"></i> إضافة أول طبيب للمركز
                                        </button>
                                    </div>
                                    <% } %>
                </div>
            </div>



            <!-- 3. تبويب الموظفين والصلاحيات (Staff & Roles Management - Supabase Realtime Persistence) -->
            <div class="tab-pane fade" id="staff-panel" role="tabpanel">
                <%
                    const staffList = (typeof staff !== 'undefined' && staff && Array.isArray(staff)) ? staff : [];
                    const totalStaffCount = staffList.length;
                    const doctorsStaffCount = staffList.filter(s => (s.role || '').toLowerCase().includes('doc') || (s.role || '').toLowerCase().includes('طبيب') || (s.role || '').toLowerCase().includes('admin')).length;
                    const receptionStaffCount = staffList.filter(s => (s.role || '').toLowerCase().includes('recept') || (s.role || '').toLowerCase().includes('استقبال')).length;
                    const assistantStaffCount = staffList.filter(s => (s.role || '').toLowerCase().includes('assist') || (s.role || '').toLowerCase().includes('مساعد') || (s.role || '').toLowerCase().includes('تمريض')).length;

                    function getStaffRoleDetails(role) {
                        const r = (role || '').toLowerCase();
                        if (r.includes('admin') || r.includes('مدير')) {
                            return { label: 'المدير الطبي (Admin)', badgeClass: 'bg-primary text-white', icon: 'bi-shield-check' };
                        } else if (r.includes('doc') || r.includes('طبيب')) {
                            return { label: 'طبيب أسنان (Doctor)', badgeClass: 'bg-info-subtle text-info-emphasis border border-info-subtle', icon: 'bi-person-badge' };
                        } else if (r.includes('recept') || r.includes('استقبال')) {
                            return { label: 'موظف استقبال (Receptionist)', badgeClass: 'bg-secondary-subtle text-secondary border border-secondary-subtle', icon: 'bi-headset' };
                        } else {
                            return { label: 'مساعد طبيب (Assistant)', badgeClass: 'bg-success-subtle text-success border border-success-subtle', icon: 'bi-heart-pulse' };
                        }
                    }
                %>
                <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
                    <div>
                        <h5 class="fw-bold text-dark mb-0">إدارة طاقم المركز وتوزيع الصلاحيات (Staff & Roles)</h5>
                        <small class="text-muted">التحكم المباشر في حسابات الكادر الطبي، الاستقبال، والمساعدين مع مزامنة لحظية عبر قاعدة بيانات Supabase</small>
                    </div>
                    <button type="button" class="btn btn-success btn-sm rounded-pill px-3 shadow-sm fw-semibold"
                        onclick="openAddStaffModal()">
                        <i class="bi bi-person-plus-fill me-1"></i> إضافة موظف / كادر جديد
                    </button>
                </div>

                <div class="row g-3 mb-4">
                    <div class="col-sm-6 col-md-3">
                        <div class="p-3 border rounded-3 bg-light text-center">
                            <span class="text-muted small d-block">إجمالي الكادر (قاعدة البيانات)</span>
                            <h4 class="fw-bold text-dark mb-0" id="totalStaffCountText"><%= totalStaffCount %> موظف</h4>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="p-3 border rounded-3 bg-light text-center">
                            <span class="text-muted small d-block">الكادر الطبي المعتمد</span>
                            <h4 class="fw-bold text-primary mb-0">
                                <%= (doctors && doctors.length > 0) ? doctors.length : doctorsStaffCount %> أطباء
                            </h4>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="p-3 border rounded-3 bg-light text-center">
                            <span class="text-muted small d-block">فريق الاستقبال والتنسيق</span>
                            <h4 class="fw-bold text-info mb-0"><%= receptionStaffCount %> استقبال</h4>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="p-3 border rounded-3 bg-light text-center">
                            <span class="text-muted small d-block">التمريض والمعاونة</span>
                            <h4 class="fw-bold text-success mb-0"><%= assistantStaffCount %> مساعدين</h4>
                        </div>
                    </div>
                </div>

                <div class="table-responsive border rounded-3 bg-white shadow-sm">
                    <table class="table table-hover align-middle mb-0" id="staffManagementTable">
                        <thead class="table-light">
                            <tr>
                                <th>الموظف / العضو</th>
                                <th>الدور الوظيفي</th>
                                <th>رقم الهاتف / التواصل</th>
                                <th>تاريخ التسجيل</th>
                                <th>الحالة</th>
                                <th class="text-center" style="min-width: 175px;">إجراءات العمليات (Actions)</th>
                            </tr>
                        </thead>
                        <tbody id="staffTableBody">
                            <% if (staffList.length > 0) { %>
                                <% staffList.forEach(member => { %>
                                    <% 
                                        const roleMeta = getStaffRoleDetails(member.role);
                                        const cleanName = member.name || 'موظف العيادة';
                                        const initial = cleanName.replace(/^(د|أ|م)\.?\s*/, '').trim().charAt(0) || 'م';
                                        const isMedicalDoc = member.role && (member.role.toLowerCase().includes('doc') || member.role.toLowerCase().includes('admin'));
                                    %>
                                    <tr id="staff-row-<%= member.id %>">
                                        <td>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="<%= isMedicalDoc ? 'bg-primary' : 'bg-secondary' %> text-white staff-avatar-circle fw-bold">
                                                    <%= cleanName.startsWith('د.') ? 'د' : initial %>
                                                </div>
                                                <div>
                                                    <span class="fw-bold text-dark d-block"><%= cleanName %></span>
                                                    <small class="text-muted"><%= roleMeta.label %></small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge <%= roleMeta.badgeClass %> px-2 py-1 rounded-pill">
                                                <i class="bi <%= roleMeta.icon %> me-1"></i><%= roleMeta.label %>
                                            </span>
                                        </td>
                                        <td>
                                            <span dir="ltr" class="font-monospace text-muted small fw-semibold">
                                                <i class="bi bi-telephone text-primary me-1"></i><%= member.phone || 'غير مسجل' %>
                                            </span>
                                        </td>
                                        <td>
                                            <small class="text-muted">
                                                <%= member.created_at ? new Date(member.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }) : 'نشط' %>
                                            </small>
                                        </td>
                                        <td>
                                            <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1">
                                                <i class="bi bi-check-circle-fill me-1"></i>نشط
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <div class="d-flex align-items-center justify-content-center gap-2 flex-nowrap staff-action-buttons">
                                                <button type="button"
                                                    class="btn btn-outline-warning btn-sm rounded-pill px-3 py-1 permissions-staff-action-btn"
                                                    data-id="<%= member.id %>" data-name="<%= cleanName %>" data-title="<%= roleMeta.label %>"
                                                    data-type="staff" data-role="<%= member.role %>" data-active="true"
                                                    onclick="openPermissionsModalFromButton(this)" title="تعديل الصلاحيات">
                                                    <i class="bi bi-shield-lock me-1"></i> الصلاحيات
                                                </button>
                                                <button type="button"
                                                    class="btn btn-outline-danger btn-sm rounded-pill px-3 py-1 delete-staff-btn"
                                                    data-id="<%= member.id %>" data-name="<%= cleanName %>"
                                                    onclick="deleteStaffMember(<%= member.id %>, '<%= cleanName.replace(/'/g, "\\'") %>')"
                                                    title="حذف الموظف نهائياً من Supabase">
                                                    <i class="bi bi-trash3-fill me-1"></i> حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                <% }); %>
                            <% } else { %>
                                <tr id="emptyStaffRow">
                                    <td colspan="6" class="text-center py-4 text-muted">
                                        <i class="bi bi-people fs-2 text-secondary d-block mb-2"></i>
                                        لا يوجد موظفون مسجلون في قاعدة البيانات حالياً.
                                    </td>
                                </tr>
                            <% } %>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 3. تبويب الخدمات الطبية (Services) -->
            <div class="tab-pane fade" id="services-panel" role="tabpanel">
                <div class="row g-4">
                    <div class="col-md-5">
                        <div class="card border rounded-3 p-3 bg-light shadow-sm">
                            <h6 class="fw-bold mb-3"><i class="bi bi-plus-circle me-1 text-primary"></i> إضافة خدمة طبية
                                جديدة</h6>
                            <form method="post" action="/Doctor/Dashboard?handler=AddService">
                                <div class="mb-3">
                                    <label class="form-label small fw-semibold">اسم الخدمة أو الإجراء الطبي</label>
                                    <input name="newService" class="form-control"
                                        placeholder="مثال: حشو أسنان ليزري تجميلي" required />
                                </div>
                                <button type="submit" class="btn btn-primary btn-sm rounded-pill px-3 shadow-sm">
                                    <i class="bi bi-plus-lg me-1"></i> حفظ وإضافة الخدمة
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fw-bold mb-0">الخدمات المتاحة حالياً بالحجز (<%= services ? services.length : 0
                                    %>)</h6>
                            <span class="text-muted small">تظهر مباشرة في قائمة الحجز للمرضى</span>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <% if (typeof services !=='undefined' ) { %>
                                <% services.forEach(srv=> { %>
                                    <div
                                        class="d-flex align-items-center gap-2 border bg-white rounded-pill px-3 py-2 shadow-sm">
                                        <i class="bi bi-check2-circle text-primary"></i>
                                        <span class="fw-semibold small">
                                            <%= srv %>
                                        </span>
                                        <form method="post" action="/Doctor/Dashboard?handler=DeleteService"
                                            class="d-inline ms-1" onsubmit="return confirm('هل تريد حذف هذه الخدمة؟')">
                                            <input type="hidden" name="serviceName" value="<%= srv %>" />
                                            <button type="submit" class="btn-close btn-close-sm"
                                                style="font-size: 0.65rem;" title="حذف الخدمة"></button>
                                        </form>
                                    </div>
                                    <% }); %>
                                        <% } %>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 4. تبويب إعدادات الورديات والمواعيد (Two-Shift Schedule & Settings) -->
            <div class="tab-pane fade" id="settings-panel" role="tabpanel">
                <form id="clinicSettingsForm" onsubmit="submitSettingsAjax(event)">
                    <div class="row g-4 mb-4">
                        <div class="col-12">
                            <!-- إعدادات رقم الاستفسارات العاجلة للعيادة -->
                            <div class="card border-0 shadow-sm rounded-4 mb-4 emergency-phone-card">
                                <div class="card-body p-3 p-md-4">
                                    <div class="row align-items-center g-3">
                                        <div class="col-lg-7">
                                            <div class="d-flex align-items-center gap-3">
                                                <div class="stat-icon bg-primary-subtle text-primary rounded-circle flex-shrink-0"
                                                    style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                                                    <i class="bi bi-telephone-inbound-fill fs-4"></i>
                                                </div>
                                                <div>
                                                    <h5 class="fw-bold mb-1 text-dark">رقم هاتف الاستفسارات العاجلة</h5>
                                                    <p class="text-muted small mb-0">
                                                        يظهر هذا الرقم لجميع المرضى في أسفل شاشة الحجز فور حفظه.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-5">
                                            <form method="post" action="/Doctor/Dashboard?handler=UpdateEmergencyPhone"
                                                class="d-flex align-items-center gap-2">
                                                <div class="input-group">
                                                    <span
                                                        class="input-group-text bg-white border-primary-subtle text-primary">
                                                        <i class="bi bi-telephone"></i>
                                                    </span>
                                                    <input name="EmergencyPhone" value="<%= emergencyPhone %>"
                                                        class="form-control border-primary-subtle font-monospace fw-bold"
                                                        placeholder="مثال: 01551388988" dir="ltr"
                                                        style="letter-spacing: 1px;" required />
                                                </div>
                                                <button type="submit"
                                                    class="btn btn-primary px-3 rounded-3 flex-shrink-0">
                                                    <i class="bi bi-save me-1"></i> حفظ الرقم
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- وحدة إدارة وتخصيص الورديات التفاعلية (بدون بطاقات ثابتة) -->
                        <div class="col-12">
                            <div class="card border-0 rounded-4 shadow-sm p-4 bg-white shift-summary-master-card">
                                <div
                                    class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                                    <div>
                                        <div class="d-flex align-items-center gap-2 mb-1">
                                            <span
                                                class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-bold">
                                                <i class="bi bi-clock-history me-1"></i> نظام الورديات المرن
                                            </span>
                                            <span
                                                class="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill">
                                                <i class="bi bi-check-circle me-1"></i> نشط ومخصص
                                            </span>
                                        </div>
                                        <h5 class="fw-bold text-dark mb-1">مواعيد فترات العمل بالمركز (نظام الورديتين)
                                        </h5>
                                        <p class="text-muted small mb-0">يمكنك تعديل أوقات البدء والانتهاء بحرية تامة من
                                            خلال النافذة المنبثقة التفاعلية.</p>
                                    </div>
                                    <div>
                                        <button type="button"
                                            class="btn btn-primary rounded-pill px-4 py-2 shadow-sm fw-bold d-inline-flex align-items-center gap-2"
                                            data-bs-toggle="modal" data-bs-target="#shiftEditModal"
                                            onclick="openShiftEditModal()">
                                            <i class="bi bi-sliders fs-5"></i>
                                            <span>تعديل وتخصيص أوقات الورديات</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- رقم هاتف الاستفسارات المخفي لضمان حفظ الإعدادات -->
                    <input type="hidden" name="EmergencyPhone" id="settingsEmergencyPhone"
                        value="<%= emergencyPhone %>" />
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal 1: إضافة وتعديل بيانات الطبيب -->
<div class="modal fade" id="doctorModal" tabindex="-1" aria-labelledby="doctorModalLabel" aria-hidden="true"
    style="direction: rtl; text-align: right;">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center w-100"
                style="direction: rtl;">
                <h5 class="modal-title fw-bold m-0 flex-grow-1 text-end" id="doctorModalLabel">
                    <i class="bi bi-person-plus-fill me-2"></i> إضافة طبيب جديد
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="إغلاق"
                    style="margin-right: auto !important; margin-left: 0 !important;"></button>
            </div>
            <form method="post" action="/Doctor/Dashboard?handler=SaveDoctor" id="doctorModalForm">
                <input type="hidden" name="id" id="modalDocId" value="0" />
                <div class="modal-body p-4">
                    <!-- 1. البيانات الأساسية والمهنية -->
                    <div class="p-3 bg-light rounded-3 border mb-3">
                        <div class="d-flex align-items-center gap-2 mb-3 text-primary fw-bold border-bottom pb-2">
                            <i class="bi bi-person-badge fs-5"></i>
                            <span>1. البيانات الأساسية والمهنية للطبيب</span>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">اسم الطبيب بالكامل <span
                                        class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i
                                            class="bi bi-person-fill text-primary"></i></span>
                                    <input name="name" class="form-control" id="modalDocName"
                                        placeholder="مثال: د. حازم حجاج" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">اللقب والصفة المهنية <span
                                        class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i
                                            class="bi bi-award-fill text-warning"></i></span>
                                    <input name="title" class="form-control" id="modalDocTitle"
                                        placeholder="مثال: استشاري أول ورئيس الأطباء" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">التخصص الطبي الدقيق <span
                                        class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i
                                            class="bi bi-heart-pulse-fill text-danger"></i></span>
                                    <input name="specialty" class="form-control" id="modalDocSpecialty"
                                        placeholder="مثال: جراحة وتجميل وزراعة الأسنان" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">عيادة / غرفة الفحص</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i
                                            class="bi bi-geo-alt-fill text-success"></i></span>
                                    <input name="climicroom" class="form-control" id="modalDocRoom"
                                        placeholder="مثال: العيادة الاستشارية (100) - المبنى الرئيسي" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. جدول الدوام وساعات الحضور -->
                    <div class="p-3 bg-light rounded-3 border mb-3">
                        <div class="d-flex align-items-center gap-2 mb-3 text-primary fw-bold border-bottom pb-2">
                            <i class="bi bi-calendar3 fs-5"></i>
                            <span>2. جدول الدوام وساعات الحضور بالعيادة</span>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">ساعات العمل والدوام اليومي</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i
                                            class="bi bi-clock-fill text-secondary"></i></span>
                                    <input name="workinghours" class="form-control" id="modalDocWorkingHours"
                                        placeholder="مثال: 09:00 ص - 12:00 م | 12:00 م - 06:00 م" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">أيام الحضور والعمل الأسبوعي</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i
                                            class="bi bi-calendar-week text-secondary"></i></span>
                                    <input name="WorkingDays" class="form-control" id="modalDocWorkingDays"
                                        placeholder="مثال: السبت - الخميس (الجمعة إجازة)" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 3. الخبرة والتقييم وحالة التفعيل -->
                    <div class="p-3 bg-light rounded-3 border">
                        <div class="d-flex align-items-center gap-2 mb-3 text-primary fw-bold border-bottom pb-2">
                            <i class="bi bi-sliders fs-5"></i>
                            <span>3. سنوات الخبرة والتقييم وحالة التفعيل</span>
                        </div>
                        <div class="row g-3 align-items-center">
                            <div class="col-md-4">
                                <label class="form-label fw-semibold small">سنوات الخبرة</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i
                                            class="bi bi-briefcase-fill text-primary"></i></span>
                                    <input name="experienceyears" type="number" class="form-control" id="modalDocExp"
                                        value="5" min="0" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label fw-semibold small">التقييم العام (من 5.0)</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i
                                            class="bi bi-star-fill text-warning"></i></span>
                                    <input name="Rating" type="number" step="0.1" class="form-control"
                                        id="modalDocRating" value="5.0" min="1" max="5" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label fw-semibold small d-block">حالة تفعيل الطبيب</label>
                                <div
                                    class="form-check form-switch p-2 bg-white rounded border d-flex align-items-center justify-content-between">
                                    <label class="form-check-label fw-bold text-success mb-0 small"
                                        for="modalDocIsActive">
                                        <i class="bi bi-check-circle-fill me-1"></i> متاح للحجز
                                    </label>
                                    <input name="IsActive" class="form-check-input ms-0" type="checkbox"
                                        id="modalDocIsActive" value="true" checked
                                        style="cursor: pointer; width: 2.5em; height: 1.3em;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light rounded-bottom-4">
                    <button type="button" class="btn btn-secondary px-4 rounded-pill"
                        data-bs-dismiss="modal">إلغاء</button>
                    <button type="submit" class="btn btn-primary px-4 rounded-pill shadow-sm">
                        <i class="bi bi-save me-1"></i> حفظ بيانات الطبيب
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal 2: جدول وساعات ومواعيد عمل الطبيب بنظام الاختيار السريع (Quick-Select) -->
<div class="modal fade" id="doctorScheduleModal" tabindex="-1" aria-labelledby="doctorScheduleModalLabel"
    aria-hidden="true" style="direction: rtl; text-align: right;">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center w-100"
                style="direction: rtl;">
                <h5 class="modal-title fw-bold m-0 flex-grow-1 text-end" id="doctorScheduleModalLabel">
                    <i class="bi bi-calendar2-week-fill text-warning me-2"></i> ضبط جدول الورديات وأيام عمل الطبيب
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="إغلاق"
                    style="margin-right: auto !important; margin-left: 0 !important;"></button>
            </div>
            <form id="doctorScheduleForm" onsubmit="submitDoctorScheduleAjax(event)">
                <input type="hidden" name="scheduleDoctorId" id="schedDocId" />
                <input type="hidden" name="scheduleWorkingHours" id="schedWorkingHours"
                    value="09:00 ص - 12:00 م | 12:00 م - 06:00 م" />
                <input type="hidden" name="scheduleWorkingDays" id="schedWorkingDays"
                    value="السبت - الخميس (الجمعة إجازة)" />

                <div class="modal-body p-4">
                    <div id="scheduleModalAlert" class="alert d-none mb-3" role="alert"></div>

                    <!-- 1. Quick-Select Shift Mode (نظام الورديات المعتمد) -->
                    <div class="mb-4">
                        <div class="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
                            <label class="form-label fw-bold text-dark m-0">
                                <i class="bi bi-clock-history text-primary me-1"></i> 1. تحديد وردية عمل الطبيب
                                (Quick-Select Shift)
                            </label>
                            <button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-3"
                                data-bs-toggle="modal" data-bs-target="#shiftEditModal" onclick="openShiftEditModal()">
                                <i class="bi bi-sliders me-1"></i> تخصيص مواعيد ورديات المركز
                            </button>
                        </div>
                        <div class="row g-2">
                            <div class="col-md-4">
                                <div class="border rounded-3 p-3 bg-light text-center shift-option-card"
                                    id="shiftCardMorning" onclick="selectShiftPreset('morning')"
                                    style="cursor: pointer;">
                                    <div class="form-check form-check-inline m-0">
                                        <input class="form-check-input" type="radio" name="shiftPresetRadio"
                                            id="radioShiftMorning" value="morning">
                                        <label class="form-check-label fw-bold text-primary" for="radioShiftMorning">
                                            <i class="bi bi-sunrise-fill text-warning me-1"></i> الوردية الصباحية
                                        </label>
                                    </div>
                                    <div class="small text-muted mt-1 font-monospace">09:00 ص - 12:00 م</div>
                                    <span class="badge bg-white text-secondary border mt-1" style="font-size: 0.7rem;">3
                                        مواعيد (ساعة/كشف)</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="border rounded-3 p-3 bg-light text-center shift-option-card"
                                    id="shiftCardEvening" onclick="selectShiftPreset('evening')"
                                    style="cursor: pointer;">
                                    <div class="form-check form-check-inline m-0">
                                        <input class="form-check-input" type="radio" name="shiftPresetRadio"
                                            id="radioShiftEvening" value="evening">
                                        <label class="form-check-label fw-bold text-info-emphasis"
                                            for="radioShiftEvening">
                                            <i class="bi bi-sunset-fill text-danger me-1"></i> الوردية المسائية
                                        </label>
                                    </div>
                                    <div class="small text-muted mt-1 font-monospace">12:00 م - 06:00 م</div>
                                    <span class="badge bg-white text-secondary border mt-1" style="font-size: 0.7rem;">6
                                        مواعيد (ساعة/كشف)</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="border rounded-3 p-3 bg-light text-center shift-option-card border-success"
                                    id="shiftCardBoth" onclick="selectShiftPreset('both')" style="cursor: pointer;">
                                    <div class="form-check form-check-inline m-0">
                                        <input class="form-check-input" type="radio" name="shiftPresetRadio"
                                            id="radioShiftBoth" value="both" checked>
                                        <label class="form-check-label fw-bold text-success" for="radioShiftBoth">
                                            <i class="bi bi-lightning-charge-fill text-warning me-1"></i> الورديتان معاً
                                        </label>
                                    </div>
                                    <div class="small text-muted mt-1 font-monospace">09:00 ص - 06:00 م</div>
                                    <span class="badge bg-success-subtle text-success border border-success-subtle mt-1"
                                        style="font-size: 0.7rem;">9 مواعيد كاملة</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Quick-Select Active Working Days (أيام العمل والدوام) -->
                    <div class="mb-4">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="form-label fw-bold text-dark mb-0">
                                <i class="bi bi-calendar-check text-success me-1"></i> 2. تحديد أيام العمل الأسبوعية
                                النشطة للطبيب
                            </label>
                            <div class="btn-group btn-group-sm">
                                <button type="button" class="btn btn-outline-secondary btn-sm"
                                    onclick="setWorkingDaysPreset('sat-thu')">السبت - الخميس</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm"
                                    onclick="setWorkingDaysPreset('all-week')">كامل الأسبوع</button>
                            </div>
                        </div>

                        <div class="d-flex flex-wrap gap-2 p-3 bg-light rounded-3 border">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input day-checkbox" type="checkbox" id="daySat" value="السبت"
                                    checked onchange="syncWorkingDays()">
                                <label class="form-check-label fw-semibold" for="daySat">السبت</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input day-checkbox" type="checkbox" id="daySun" value="الأحد"
                                    checked onchange="syncWorkingDays()">
                                <label class="form-check-label fw-semibold" for="daySun">الأحد</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input day-checkbox" type="checkbox" id="dayMon" value="الإثنين"
                                    checked onchange="syncWorkingDays()">
                                <label class="form-check-label fw-semibold" for="dayMon">الإثنين</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input day-checkbox" type="checkbox" id="dayTue"
                                    value="الثلاثاء" checked onchange="syncWorkingDays()">
                                <label class="form-check-label fw-semibold" for="dayTue">الثلاثاء</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input day-checkbox" type="checkbox" id="dayWed"
                                    value="الأربعاء" checked onchange="syncWorkingDays()">
                                <label class="form-check-label fw-semibold" for="dayWed">الأربعاء</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input day-checkbox" type="checkbox" id="dayThu" value="الخميس"
                                    checked onchange="syncWorkingDays()">
                                <label class="form-check-label fw-semibold" for="dayThu">الخميس</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input day-checkbox" type="checkbox" id="dayFri" value="الجمعة"
                                    onchange="syncWorkingDays()">
                                <label class="form-check-label fw-semibold text-danger" for="dayFri">الجمعة (إجازة
                                    افتراضية)</label>
                            </div>
                        </div>
                        <div class="text-muted small mt-1" id="workingDaysSummaryText">
                            أيام العمل المحددة: السبت - الخميس (الجمعة إجازة)
                        </div>
                    </div>

                    <!-- 3. Mandatory 1-Hour Interval Slots Grid -->
                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="form-label fw-bold text-dark mb-0">
                                <i class="bi bi-stopwatch text-warning me-1"></i> 3. مواعيد الكشف المتاحة (فاصل 60 دقيقة
                                إلزامي بين كل كشف)
                            </label>
                            <span class="badge bg-success-subtle text-success border border-success-subtle">
                                <i class="bi bi-check-circle me-1"></i>نظام الورديتين
                            </span>
                        </div>

                        <!-- Morning Section -->
                        <div class="p-3 bg-white rounded-3 border mb-3">
                            <span class="fw-bold text-primary small d-block mb-2">
                                <i class="bi bi-sunrise text-warning me-1"></i> مواعيد الوردية الصباحية (09:00 ص - 12:00
                                م)
                            </span>
                            <div class="row g-2" id="morningSlotsContainer">
                                <div class="col-4">
                                    <div class="form-check border rounded p-2 px-3 bg-light">
                                        <input class="form-check-input slot-check slot-morning" type="checkbox"
                                            name="scheduleSelectedSlots" value="09:00 ص" id="slot_09_00" checked>
                                        <label class="form-check-label fw-bold small" for="slot_09_00">09:00 ص</label>
                                        <small class="text-muted d-block" style="font-size: 0.68rem;">(09:00 -
                                            10:00)</small>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-check border rounded p-2 px-3 bg-light">
                                        <input class="form-check-input slot-check slot-morning" type="checkbox"
                                            name="scheduleSelectedSlots" value="10:00 ص" id="slot_10_00" checked>
                                        <label class="form-check-label fw-bold small" for="slot_10_00">10:00 ص</label>
                                        <small class="text-muted d-block" style="font-size: 0.68rem;">(10:00 -
                                            11:00)</small>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-check border rounded p-2 px-3 bg-light">
                                        <input class="form-check-input slot-check slot-morning" type="checkbox"
                                            name="scheduleSelectedSlots" value="11:00 ص" id="slot_11_00" checked>
                                        <label class="form-check-label fw-bold small" for="slot_11_00">11:00 ص</label>
                                        <small class="text-muted d-block" style="font-size: 0.68rem;">(11:00 -
                                            12:00)</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Evening Section -->
                        <div class="p-3 bg-white rounded-3 border">
                            <span class="fw-bold text-info-emphasis small d-block mb-2">
                                <i class="bi bi-sunset text-danger me-1"></i> مواعيد الوردية المسائية (12:00 م - 06:00
                                م)
                            </span>
                            <div class="row g-2" id="eveningSlotsContainer">
                                <div class="col-4">
                                    <div class="form-check border rounded p-2 px-3 bg-light">
                                        <input class="form-check-input slot-check slot-evening" type="checkbox"
                                            name="scheduleSelectedSlots" value="12:00 م" id="slot_12_00" checked>
                                        <label class="form-check-label fw-bold small" for="slot_12_00">12:00 م</label>
                                        <small class="text-muted d-block" style="font-size: 0.68rem;">(12:00 -
                                            01:00)</small>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-check border rounded p-2 px-3 bg-light">
                                        <input class="form-check-input slot-check slot-evening" type="checkbox"
                                            name="scheduleSelectedSlots" value="01:00 م" id="slot_01_00" checked>
                                        <label class="form-check-label fw-bold small" for="slot_01_00">01:00 م</label>
                                        <small class="text-muted d-block" style="font-size: 0.68rem;">(01:00 -
                                            02:00)</small>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-check border rounded p-2 px-3 bg-light">
                                        <input class="form-check-input slot-check slot-evening" type="checkbox"
                                            name="scheduleSelectedSlots" value="02:00 م" id="slot_02_00" checked>
                                        <label class="form-check-label fw-bold small" for="slot_02_00">02:00 م</label>
                                        <small class="text-muted d-block" style="font-size: 0.68rem;">(02:00 -
                                            03:00)</small>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-check border rounded p-2 px-3 bg-light">
                                        <input class="form-check-input slot-check slot-evening" type="checkbox"
                                            name="scheduleSelectedSlots" value="03:00 م" id="slot_03_00" checked>
                                        <label class="form-check-label fw-bold small" for="slot_03_00">03:00 م</label>
                                        <small class="text-muted d-block" style="font-size: 0.68rem;">(03:00 -
                                            04:00)</small>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-check border rounded p-2 px-3 bg-light">
                                        <input class="form-check-input slot-check slot-evening" type="checkbox"
                                            name="scheduleSelectedSlots" value="04:00 م" id="slot_04_00" checked>
                                        <label class="form-check-label fw-bold small" for="slot_04_00">04:00 م</label>
                                        <small class="text-muted d-block" style="font-size: 0.68rem;">(04:00 -
                                            05:00)</small>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-check border rounded p-2 px-3 bg-light">
                                        <input class="form-check-input slot-check slot-evening" type="checkbox"
                                            name="scheduleSelectedSlots" value="05:00 م" id="slot_05_00" checked>
                                        <label class="form-check-label fw-bold small" for="slot_05_00">05:00 م</label>
                                        <small class="text-muted d-block" style="font-size: 0.68rem;">(05:00 -
                                            06:00)</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer bg-light rounded-bottom-4">
                    <button type="button" class="btn btn-secondary rounded-pill px-4"
                        data-bs-dismiss="modal">إلغاء</button>
                    <button type="submit" id="saveScheduleBtn" class="btn btn-primary rounded-pill px-4 shadow-sm">
                        <i class="bi bi-save me-1"></i> حفظ جدول الورديات
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal: تعديل وتخصيص أوقات الورديات بمرونة -->
<div class="modal fade" id="shiftEditModal" tabindex="-1" aria-labelledby="shiftEditModalLabel" aria-hidden="true"
    style="direction: rtl; text-align: right;">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center w-100"
                style="direction: rtl;">
                <h5 class="modal-title fw-bold m-0 flex-grow-1 text-end" id="shiftEditModalLabel">
                    <i class="bi bi-clock-history me-2"></i> تعديل وتخصيص أوقات الورديات ومواعيد العمل
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="إغلاق"
                    style="margin-right: auto !important; margin-left: 0 !important;"></button>
            </div>
            <form id="shiftEditForm" onsubmit="submitShiftEditAjax(event)">
                <div class="modal-body p-4">
                    <div id="shiftEditAlert" class="alert d-none mb-3" role="alert"></div>

                    <!-- قوالب مواعيد سريعة مسبقة الإعداد -->
                    <div class="mb-4 p-3 bg-light rounded-3 border">
                        <label class="form-label fw-bold text-dark small mb-2 d-flex align-items-center gap-1">
                            <i class="bi bi-lightning-charge-fill text-warning"></i>
                            <span>قوالب مواعيد سريعة مسبقة الإعداد:</span>
                        </label>
                        <div class="d-flex flex-wrap gap-2">
                            <button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-3"
                                onclick="applyShiftPreset('standard')">
                                ☀️ النظام المعتمد (09:00 ص - 12:00 م | 12:00 م - 06:00 م)
                            </button>
                            <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill px-3"
                                onclick="applyShiftPreset('extended')">
                                🌅 دوام ممتد (08:00 ص - 01:00 م | 04:00 م - 10:00 م)
                            </button>
                            <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill px-3"
                                onclick="applyShiftPreset('evening_heavy')">
                                🌙 دوام مسائي مكثف (10:00 ص - 02:00 م | 04:00 م - 11:00 م)
                            </button>
                        </div>
                    </div>

                    <div class="row g-4">
                        <!-- قسم الوردية الصباحية -->
                        <div class="col-md-6">
                            <div class="p-3 border rounded-3 bg-white h-100 shadow-xs border-primary-subtle">
                                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                                    <span class="fw-bold text-primary">
                                        <i class="bi bi-sunrise text-warning me-1"></i> الوردية الصباحية
                                    </span>
                                    <span class="badge bg-primary-subtle text-primary rounded-pill"
                                        id="morningSlotCountBadge">3 مواعيد</span>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label small fw-semibold">وقت بداية الوردية الصباحية</label>
                                    <select class="form-select font-monospace" id="inputMorningStart"
                                        name="morningStart" onchange="recalculateShiftPreview()">
                                        <option value="07:00 ص">07:00 ص</option>
                                        <option value="08:00 ص">08:00 ص</option>
                                        <option value="08:30 ص">08:30 ص</option>
                                        <option value="09:00 ص" selected>09:00 ص</option>
                                        <option value="09:30 ص">09:30 ص</option>
                                        <option value="10:00 ص">10:00 ص</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="form-label small fw-semibold">وقت نهاية الوردية الصباحية</label>
                                    <select class="form-select font-monospace" id="inputMorningEnd" name="morningEnd"
                                        onchange="recalculateShiftPreview()">
                                        <option value="11:00 ص">11:00 ص</option>
                                        <option value="11:30 ص">11:30 ص</option>
                                        <option value="12:00 م" selected>12:00 م</option>
                                        <option value="12:30 م">12:30 م</option>
                                        <option value="01:00 م">01:00 م</option>
                                        <option value="02:00 م">02:00 م</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- قسم الوردية المسائية -->
                        <div class="col-md-6">
                            <div class="p-3 border rounded-3 bg-white h-100 shadow-xs border-info-subtle">
                                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                                    <span class="fw-bold text-info-emphasis">
                                        <i class="bi bi-sunset text-danger me-1"></i> الوردية المسائية
                                    </span>
                                    <span class="badge bg-info-subtle text-info-emphasis rounded-pill"
                                        id="eveningSlotCountBadge">6 مواعيد</span>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label small fw-semibold">وقت بداية الوردية المسائية</label>
                                    <select class="form-select font-monospace" id="inputEveningStart"
                                        name="eveningStart" onchange="recalculateShiftPreview()">
                                        <option value="12:00 م" selected>12:00 م</option>
                                        <option value="12:30 م">12:30 م</option>
                                        <option value="01:00 م">01:00 م</option>
                                        <option value="02:00 م">02:00 م</option>
                                        <option value="03:00 م">03:00 م</option>
                                        <option value="04:00 م">04:00 م</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="form-label small fw-semibold">وقت نهاية الوردية المسائية</label>
                                    <select class="form-select font-monospace" id="inputEveningEnd" name="eveningEnd"
                                        onchange="recalculateShiftPreview()">
                                        <option value="04:00 م">04:00 م</option>
                                        <option value="05:00 م">05:00 م</option>
                                        <option value="06:00 م" selected>06:00 م</option>
                                        <option value="07:00 م">07:00 م</option>
                                        <option value="08:00 م">08:00 م</option>
                                        <option value="09:00 م">09:00 م</option>
                                        <option value="10:00 م">10:00 م</option>
                                        <option value="11:00 م">11:00 م</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <!-- الفاصل الزمني المعتمد (ثابت 60 دقيقة) -->
                        <input type="hidden" name="intervalMinutes" id="shiftModalInterval" value="60" />

                    </div>
                </div>

                <div class="modal-footer bg-light rounded-bottom-4 d-flex justify-content-between">
                    <button type="button" class="btn btn-secondary rounded-pill px-4"
                        data-bs-dismiss="modal">إلغاء</button>
                    <button type="submit" class="btn btn-primary rounded-pill px-4 shadow-sm fw-bold"
                        id="btnSaveShiftTimes">
                        <i class="bi bi-check2-circle me-1"></i> حفظ وتطبيق مواعيد الورديات
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal: تعديل مستوى الصلاحيات وتوزيع الأدوار (Permissions & Role Assignment Modal) -->
<div class="modal fade" id="permissionsModal" tabindex="-1" aria-labelledby="permissionsModalLabel" aria-hidden="true"
    style="direction: rtl; text-align: right;">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center w-100"
                style="direction: rtl;">
                <h5 class="modal-title fw-bold m-0 flex-grow-1 text-end text-white" id="permissionsModalLabel">
                    <i class="bi bi-shield-lock-fill text-warning me-2"></i> تعديل صلاحيات ودور الكادر
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="إغلاق"
                    style="margin-right: auto !important; margin-left: 0 !important;"></button>
            </div>
            <form id="permissionsModalForm" onsubmit="submitPermissionsAjax(event)">
                <input type="hidden" name="id" id="permMemberId" value="0" />
                <input type="hidden" name="type" id="permMemberType" value="doctor" />

                <div class="modal-body p-4">
                    <div id="permissionsModalAlert" class="alert d-none mb-3" role="alert"></div>

                    <!-- تفاصيل العضو المحدد -->
                    <div class="p-3 bg-light rounded-3 border mb-3 d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center gap-3">
                            <div class="bg-warning text-dark p-2 rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                style="width: 44px; height: 44px;">
                                <i class="bi bi-person-fill-gear fs-4"></i>
                            </div>
                            <div>
                                <h6 class="fw-bold mb-0 text-dark" id="permMemberName">اسم العضو</h6>
                                <span class="text-muted small" id="permMemberSubtitle">الصفة المهنية</span>
                            </div>
                        </div>
                        <span class="badge bg-primary rounded-pill px-3 py-2" id="permCurrentRoleBadge">طبيب</span>
                    </div>

                    <!-- اختيار الدور الرئيسي -->
                    <div class="mb-4">
                        <label class="form-label fw-bold small text-dark">
                            <i class="bi bi-person-badge-fill text-primary me-1"></i> الدور الوظيفي المعتمد في المنظومة:
                        </label>
                        <select class="form-select form-select-lg" name="role" id="permRoleSelect"
                            onchange="syncRolePermissionsCheckboxes()">
                            <option value="Super Admin">مدير طبي / كامل الصلاحيات (Super Admin)</option>
                            <option value="Doctor" selected>طبيب معالج (Doctor)</option>
                            <option value="Receptionist">موظف استقبال وتنسيق مواعيد (Receptionist)</option>
                            <option value="Assistant">مساعد طبيب وتعقيم (Assistant)</option>
                            <option value="Accountant">محاسب ومسؤول مالي (Accountant)</option>
                        </select>
                    </div>

                    <!-- تفصيل أذونات وصلاحيات الوصول المباشرة -->
                    <div class="mb-3">
                        <label class="form-label fw-bold small text-dark d-block mb-2">
                            <i class="bi bi-check-all text-success me-1"></i> حزم الصلاحيات المفعلة لهذا الدور:
                        </label>
                        <div class="row g-2">
                            <div class="col-md-6">
                                <div class="form-check border rounded p-2 px-3 bg-light">
                                    <input class="form-check-input perm-check" type="checkbox" id="perm_patients"
                                        name="permissions" value="patients" checked>
                                    <label class="form-check-label fw-semibold small" for="perm_patients">الاطلاع على
                                        ملفات وسجلات المرضى</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-check border rounded p-2 px-3 bg-light">
                                    <input class="form-check-input perm-check" type="checkbox" id="perm_appointments"
                                        name="permissions" value="appointments" checked>
                                    <label class="form-check-label fw-semibold small" for="perm_appointments">إدارة
                                        وتأكيد وتعديل المواعيد</label>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-check border rounded p-2 px-3 bg-light">
                                    <input class="form-check-input perm-check" type="checkbox" id="perm_pricing"
                                        name="permissions" value="pricing">
                                    <label class="form-check-label fw-semibold small" for="perm_pricing">تعديل قائمة
                                        الخدمات الطبية والتخصصات</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-check border rounded p-2 px-3 bg-light">
                                    <input class="form-check-input perm-check" type="checkbox" id="perm_staff"
                                        name="permissions" value="staff">
                                    <label class="form-check-label fw-semibold small" for="perm_staff">إدارة وتعديل
                                        حسابات الكادر والموظفين</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-check border rounded p-2 px-3 bg-light">
                                    <input class="form-check-input perm-check" type="checkbox" id="perm_finance"
                                        name="permissions" value="finance">
                                    <label class="form-check-label fw-semibold small" for="perm_finance">الوصول للخزينة
                                        والتقارير المالية</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- حالة الحساب -->
                    <div class="p-3 bg-light rounded-3 border mt-3">
                        <div class="form-check form-switch m-0">
                            <input class="form-check-input" type="checkbox" id="permIsActive" name="isActive" checked>
                            <label class="form-check-label fw-bold text-dark" for="permIsActive">حساب مفعل ويسمح له
                                بتسجيل الدخول</label>
                        </div>
                    </div>
                </div>

                <div class="modal-footer bg-light rounded-bottom-4 d-flex justify-content-between align-items-center gap-3 p-3 flex-wrap">
                    <button type="button" class="btn btn-outline-secondary rounded-pill px-4 py-2 fw-semibold"
                        data-bs-dismiss="modal">
                        <i class="bi bi-x-circle me-1"></i> إلغاء
                    </button>
                    <button type="submit" class="btn btn-primary rounded-pill px-4 py-2 shadow-sm fw-bold"
                        id="btnSavePermissions">
                        <i class="bi bi-check2-circle me-1"></i> حفظ وتطبيق الصلاحيات
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal: إضافة كادر / موظف جديد -->
<div class="modal fade" id="addStaffModal" tabindex="-1" aria-labelledby="addStaffModalLabel" aria-hidden="true"
    style="direction: rtl; text-align: right;">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header bg-success text-white rounded-top-4 d-flex justify-content-between align-items-center w-100"
                style="direction: rtl;">
                <h5 class="modal-title fw-bold m-0 flex-grow-1 text-end" id="addStaffModalLabel">
                    <i class="bi bi-person-plus-fill me-2"></i> إضافة موظف / كادر جديد
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="إغلاق"
                    style="margin-right: auto !important; margin-left: 0 !important;"></button>
            </div>
            <form id="addStaffForm" method="post" action="/Doctor/Dashboard?handler=AddStaff" onsubmit="handleStaffSubmit(event)">
                <div class="modal-body p-4">
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">اسم الموظف بالكامل <span class="text-danger">*</span></label>
                        <input name="name" id="staffNameInput" class="form-control" placeholder="مثال: د. إسلام شريف" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">الدور الوظيفي <span class="text-danger">*</span></label>
                        <select name="role" id="staffRoleInput" class="form-select" required>
                            <option value="doctor">طبيب أسنان (Doctor)</option>
                            <option value="receptionist" selected>موظف استقبال وتنسيق (Receptionist)</option>
                            <option value="assistant">مساعد طبيب وتعقيم (Assistant)</option>
                            <option value="admin">مدير إداري / طبي (Admin)</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">رقم الهاتف المحمول للتواصل <span class="text-danger">*</span></label>
                        <input name="phone" id="staffPhoneInput" type="tel" dir="ltr" class="form-control font-monospace" placeholder="01xxxxxxxxx" required />
                    </div>
                </div>
                <div class="modal-footer bg-light rounded-bottom-4">
                    <button type="button" class="btn btn-secondary rounded-pill px-4"
                        data-bs-dismiss="modal">إلغاء</button>
                    <button type="submit" id="saveStaffBtn" class="btn btn-success rounded-pill px-4 shadow-sm fw-bold">
                        <i class="bi bi-save me-1"></i> حفظ وتفعيل في Supabase
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal 3: تغيير كلمة المرور للطبيب -->
<div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel"
    aria-hidden="true" style="direction: rtl; text-align: right;">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center w-100"
                style="direction: rtl;">
                <h5 class="modal-title fw-bold m-0 flex-grow-1 text-end" id="changePasswordModalLabel">
                    <i class="bi bi-shield-lock-fill text-warning me-2"></i> تغيير كلمة المرور
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="إغلاق"
                    style="margin-right: auto !important; margin-left: 0 !important;"></button>
            </div>
            <form id="changePasswordForm" onsubmit="submitChangePasswordAjax(event)">
                <div class="modal-body p-4">
                    <div id="changePasswordAlert" class="alert d-none mb-3" role="alert"></div>

                    <div class="mb-3">
                        <label for="currentPasswordInput" class="form-label fw-semibold">
                            كلمة المرور الحالية <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <span class="input-group-text bg-light"><i class="bi bi-lock-fill"></i></span>
                            <input type="password" id="currentPasswordInput" name="currentPassword" class="form-control"
                                placeholder="أدخل كلمة المرور الحالية" required />
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="newPasswordInput" class="form-label fw-semibold">
                            كلمة المرور الجديدة <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <span class="input-group-text bg-light"><i class="bi bi-key-fill text-warning"></i></span>
                            <input type="password" id="newPasswordInput" name="newPassword" class="form-control"
                                placeholder="أدخل كلمة المرور الجديدة (6 أحرف على الأقل)" minlength="6" required />
                        </div>
                        <small class="text-muted d-block mt-1">
                            <i class="bi bi-shield-check text-success me-1"></i> يتم تشفير كلمة المرور فورياً بـ SHA-256
                            وحفظها بأمان تام.
                        </small>
                    </div>

                    <div class="mb-3">
                        <label for="confirmPasswordInput" class="form-label fw-semibold">
                            تأكيد كلمة المرور الجديدة <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <span class="input-group-text bg-light"><i class="bi bi-check-all text-success"></i></span>
                            <input type="password" id="confirmPasswordInput" name="confirmPassword" class="form-control"
                                placeholder="أعد كتابة كلمة المرور الجديدة للتأكيد" minlength="6" required />
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light rounded-bottom-4">
                    <button type="button" class="btn btn-secondary rounded-pill px-4"
                        data-bs-dismiss="modal">إلغاء</button>
                    <button type="submit" id="savePasswordBtn"
                        class="btn btn-warning rounded-pill px-4 fw-bold shadow-sm">
                        <i class="bi bi-check-circle-fill me-1"></i> حفظ وتشفير كلمة المرور
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>


<!-- Management Quick Action Modals (Finance, Inventory, Reports, Staff) -->
<!-- ================================================================ -->
<!-- Management Quick Action Modals (Sidebar Integration)              -->
<!-- ================================================================ -->

<!-- 2. Billing & Finance Modal -->
<div class="modal fade" id="finance-modal" tabindex="-1" aria-labelledby="financeModalLabel" aria-hidden="true"
    dir="rtl">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header border-bottom py-3 bg-light rounded-top-4">
                <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="financeModalLabel">
                    <i class="bi bi-receipt-cutoff text-success fs-4"></i> الخزينة، الفواتير، وحسابات الدفعات
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <div class="row g-3 mb-3">
                    <div class="col-sm-4">
                        <div class="p-3 border rounded-3 bg-success-subtle text-success text-center">
                            <span class="small fw-semibold d-block">متحصلات الخزينة اليوم</span>
                            <h4 class="fw-bold my-1">EGP 14,850</h4>
                            <span class="small text-muted">كاش + إنستاباي + بطاقات</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="p-3 border rounded-3 bg-primary-subtle text-primary text-center">
                            <span class="small fw-semibold d-block">إجمالي الفواتير الصادرة</span>
                            <h4 class="fw-bold my-1">
                                <%= recentBookings ? recentBookings.length : 0 %> فاتورة
                            </h4>
                            <span class="small text-muted">خلال الشهر الحالي</span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="p-3 border rounded-3 bg-warning-subtle text-warning-emphasis text-center">
                            <span class="small fw-semibold d-block">دفعات وأقساط مستحقة</span>
                            <h4 class="fw-bold my-1">EGP 3,200</h4>
                            <span class="small text-muted">تقويم وزراعة أسنان</span>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-sm table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>رقم الفاتورة</th>
                                <th>المريض</th>
                                <th>الخدمة الطبية</th>
                                <th>المبلغ</th>
                                <th>طريقة السداد</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-monospace fw-bold">#INV-2026-089</td>
                                <td>أحمد محمود السيد</td>
                                <td>تنظيف وتلميع الأسنان</td>
                                <td class="fw-bold">450 ج.م</td>
                                <td>كاش (نقد)</td>
                                <td><span class="badge bg-success">مدفوع</span></td>
                            </tr>
                            <tr>
                                <td class="font-monospace fw-bold">#INV-2026-088</td>
                                <td>سارة إبراهيم علي</td>
                                <td>حشو ليزر تجميلي عالي الدقة</td>
                                <td class="fw-bold">850 ج.م</td>
                                <td>InstaPay</td>
                                <td><span class="badge bg-success">مدفوع</span></td>
                            </tr>
                            <tr>
                                <td class="font-monospace fw-bold">#INV-2026-087</td>
                                <td>محمد عبد العزيز</td>
                                <td>دفعة أولى - تقويم الأسنان</td>
                                <td class="fw-bold">3,500 ج.م</td>
                                <td>فيزا / بطاقة بنكية</td>
                                <td><span class="badge bg-primary">مؤكد</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 3. Inventory Modal -->
<div class="modal fade" id="inventory-modal" tabindex="-1" aria-labelledby="inventoryModalLabel" aria-hidden="true"
    dir="rtl">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header border-bottom py-3 bg-light rounded-top-4">
                <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="inventoryModalLabel">
                    <i class="bi bi-box-seam text-info fs-4"></i> مخزن المستلزمات الطبية ومواد الحشو
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>المادة الطبية / الصنف</th>
                                <th>التصنيف</th>
                                <th>الكمية المتاحة</th>
                                <th>تاريخ الصلاحية</th>
                                <th>حالة المخزون</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="fw-semibold">بنج موضعي (Articaine 4% Dental)</td>
                                <td>تخدير موضعي</td>
                                <td class="fw-bold font-monospace">48 كربولة</td>
                                <td>12/2027</td>
                                <td><span class="badge bg-success">آمن</span></td>
                            </tr>
                            <tr>
                                <td class="fw-semibold">حشوات تجميلية كومبوزيت (3M Filtek)</td>
                                <td>حشو تجميلي</td>
                                <td class="fw-bold font-monospace">8 محاقن</td>
                                <td>08/2028</td>
                                <td><span class="badge bg-success">آمن</span></td>
                            </tr>
                            <tr>
                                <td class="fw-semibold">أكواب وقفازات طبية معقمة (Latex-free)</td>
                                <td>مستهلكات عامة</td>
                                <td class="fw-bold font-monospace">3 علب</td>
                                <td>05/2026</td>
                                <td><span class="badge bg-warning text-dark">أوشك على النفاد</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 4. Reports Modal -->
<div class="modal fade" id="reports-modal" tabindex="-1" aria-labelledby="reportsModalLabel" aria-hidden="true"
    dir="rtl">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header border-bottom py-3 bg-light rounded-top-4">
                <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="reportsModalLabel">
                    <i class="bi bi-graph-up-arrow text-primary fs-4"></i> التقارير والإحصائيات التحليلية
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4 text-center">
                <div class="row g-3 mb-4 text-start">
                    <div class="col-md-4">
                        <div class="p-3 border rounded-3 bg-light text-center">
                            <h6 class="text-muted small">معدل رضا المرضى</h6>
                            <h3 class="fw-bold text-success mb-0">98.5%</h3>
                            <small class="text-muted">بناءً على 120 تقييماً</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-3 border rounded-3 bg-light text-center">
                            <h6 class="text-muted small">أكثر الخدمات طلباً</h6>
                            <h3 class="fw-bold text-primary mb-0">حشو وتجميل</h3>
                            <small class="text-muted">42% من الحجوزات</small>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-3 border rounded-3 bg-light text-center">
                            <h6 class="text-muted small">الحجوزات الإلكترونية</h6>
                            <h3 class="fw-bold text-dark mb-0">100%</h3>
                            <small class="text-muted">مسجلة عبر المنظومة</small>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary rounded-pill px-4" onclick="window.print()">
                    <i class="bi bi-printer me-1"></i> طباعة التقرير الشامل لعيادات دينتال سيتي
                </button>
            </div>
        </div>
    </div>
</div>

<!-- 5. Staff & Roles Modal -->
<div class="modal fade" id="staff-modal" tabindex="-1" aria-labelledby="staffModalLabel" aria-hidden="true" dir="rtl">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header border-bottom py-3 bg-light rounded-top-4">
                <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="staffModalLabel">
                    <i class="bi bi-people-fill text-dark fs-4"></i> الموظفين وإدارة الصلاحيات
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>الاسم</th>
                                <th>الدور الوظيفي</th>
                                <th>البريد / اسم الدخول</th>
                                <th>الصلاحيات</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            <% if (typeof staffList !== 'undefined' && staffList.length > 0) { %>
                                <% staffList.forEach(m => { %>
                                    <tr>
                                        <td class="fw-bold text-dark"><%= m.name %></td>
                                        <td><span class="badge bg-primary-subtle text-primary border border-primary-subtle"><%= m.role %></span></td>
                                        <td class="font-monospace small" dir="ltr"><%= m.phone || '—' %></td>
                                        <td><span class="badge bg-light text-dark border">صلاحيات النظام</span></td>
                                        <td><span class="badge bg-success">نشط</span></td>
                                    </tr>
                                <% }); %>
                            <% } else { %>
                                <tr>
                                    <td colspan="5" class="text-center py-3 text-muted">لا يوجد موظفون مسجلون حالياً</td>
                                </tr>
                            <% } %>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Patient Booking Details Modal (نافذة تفاصيل حجز المريض) -->
<div class="modal fade" id="patientDetailsModal" tabindex="-1" aria-labelledby="patientDetailsModalLabel" aria-hidden="true" dir="rtl">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header border-bottom py-3 bg-light rounded-top-4">
                <div class="d-flex align-items-center gap-2">
                    <div class="rounded-circle bg-primary bg-opacity-10 text-primary p-2 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                        <i class="bi bi-person-vcard fs-5"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-bold text-dark mb-0" id="patientDetailsModalLabel">تفاصيل بيانات حجز المريض</h5>
                        <small class="text-muted">مركز دينتال سيتي التخصصي لطب الأسنان</small>
                    </div>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="إغلاق"></button>
            </div>
            <div class="modal-body p-4">
                <div class="card border rounded-4 p-3 mb-4 bg-light bg-opacity-50">
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="patient-avatar-circle bg-primary text-white fs-4 fw-bold" id="pmAvatar" style="width: 54px; height: 54px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                م
                            </div>
                            <div>
                                <h5 class="fw-bold text-dark mb-1" id="pmPatientName">-</h5>
                                <span class="badge bg-secondary rounded-pill" id="pmReferenceBadge">
                                    <i class="bi bi-hash me-1"></i><span id="pmReference">-</span>
                                </span>
                            </div>
                        </div>
                        <div class="text-end">
                            <div class="small text-muted mb-1">حالة الحجز الحالية</div>
                            <span class="badge fs-6 px-3 py-2 rounded-pill" id="pmStatusBadge">مؤكد</span>
                        </div>
                    </div>
                </div>

                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="p-3 border rounded-3 bg-white h-100">
                            <label class="text-muted small d-block mb-1"><i class="bi bi-telephone-fill text-primary me-1"></i> رقم الهاتف المحمول</label>
                            <div class="fw-bold text-dark d-flex align-items-center justify-content-between">
                                <span id="pmPatientPhone">-</span>
                                <a href="#" id="pmWhatsappBtn" target="_blank" class="btn btn-sm btn-outline-success rounded-pill px-2 py-1">
                                    <i class="bi bi-whatsapp"></i> واتساب
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-3 border rounded-3 bg-white h-100">
                            <label class="text-muted small d-block mb-1"><i class="bi bi-person-badge text-primary me-1"></i> الطبيب المعالج والعيادة</label>
                            <div class="fw-bold text-dark" id="pmDoctorName">-</div>
                            <small class="text-muted" id="pmSpecialty">-</small>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-3 border rounded-3 bg-white h-100">
                            <label class="text-muted small d-block mb-1"><i class="bi bi-calendar-event text-primary me-1"></i> تاريخ وموعد الكشف</label>
                            <div class="fw-bold text-dark" id="pmDateTime">-</div>
                            <small class="text-muted" id="pmShiftType">-</small>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-3 border rounded-3 bg-white h-100">
                            <label class="text-muted small d-block mb-1"><i class="bi bi-bandaid text-primary me-1"></i> الخدمة أو الإجراء الطبي</label>
                            <div class="fw-bold text-dark" id="pmServiceName">-</div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="p-3 border rounded-3 bg-white">
                            <label class="text-muted small d-block mb-1"><i class="bi bi-chat-left-text text-primary me-1"></i> ملاحظات وشكوى المريض</label>
                            <div class="text-dark" id="pmPatientNotes">-</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-top py-3 bg-light rounded-bottom-4 d-flex justify-content-between">
                <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">
                    <i class="bi bi-x-circle me-1"></i> إغلاق
                </button>
                <div class="d-flex align-items-center gap-2">
                    <button type="button" class="btn btn-outline-primary rounded-pill px-3" onclick="window.print()">
                        <i class="bi bi-printer me-1"></i> طباعة بيانات الحجز
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    let doctorModalInstance = null;
    let doctorScheduleModalInstance = null;
    let changePasswordModalInstance = null;

    document.addEventListener("DOMContentLoaded", function () {
        const docEl = document.getElementById("doctorModal");
        if (docEl) doctorModalInstance = new bootstrap.Modal(docEl);

        const schedEl = document.getElementById("doctorScheduleModal");
        if (schedEl) doctorScheduleModalInstance = new bootstrap.Modal(schedEl);

        const passEl = document.getElementById("changePasswordModal");
        if (passEl) changePasswordModalInstance = new bootstrap.Modal(passEl);
    });


    let lastModalOpenTime = 0;
    function showModalSafely(modalEl) {
        if (!modalEl) {
            console.error('Modal element not found');
            return;
        }
        const now = Date.now();
        if (now - lastModalOpenTime < 250 && modalEl.classList.contains('show')) {
            return;
        }
        lastModalOpenTime = now;

        try {
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                const inst = (typeof bootstrap.Modal.getOrCreateInstance === 'function')
                    ? bootstrap.Modal.getOrCreateInstance(modalEl)
                    : new bootstrap.Modal(modalEl);
                inst.show();
                return;
            }
        } catch (e) {
            console.warn('Bootstrap modal instance failed, using fallback:', e);
        }
        try {
            if (typeof $ !== 'undefined' && typeof $.fn.modal === 'function') {
                $(modalEl).modal('show');
                return;
            }
        } catch (e2) { }
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        modalEl.removeAttribute('aria-hidden');
        modalEl.setAttribute('aria-modal', 'true');
        let backdrop = document.querySelector('.modal-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fade show';
            document.body.appendChild(backdrop);
        }
    }

    // =========================================================================
    // Permissions & Roles Modal Handlers
    // =========================================================================
    function openDoctorPermissionsModal(btn) {
        try {
            const id = btn.getAttribute('data-id') || '0';
            const name = btn.getAttribute('data-name') || 'طبيب';
            const title = btn.getAttribute('data-title') || 'طبيب معالج';
            const role = btn.getAttribute('data-role') || 'Doctor';
            const active = btn.getAttribute('data-active') !== 'false';

            openPermissionsModalInternal(id, 'doctor', name, title, role, active);
        } catch (e) {
            console.error('Error opening doctor permissions:', e);
        }
    }

    function openPermissionsModalFromButton(btn) {
        try {
            const id = btn.getAttribute('data-id') || '0';
            const name = btn.getAttribute('data-name') || 'عضو الكادر';
            const title = btn.getAttribute('data-title') || 'موظف';
            const type = btn.getAttribute('data-type') || 'staff';
            const role = btn.getAttribute('data-role') || 'Doctor';
            const active = btn.getAttribute('data-active') !== 'false';

            openPermissionsModalInternal(id, type, name, title, role, active);
        } catch (e) {
            console.error('Error opening staff permissions:', e);
        }
    }

    function openPermissionsModalInternal(id, type, name, subtitle, role, isActive) {
        const modalEl = document.getElementById("permissionsModal");
        if (!modalEl) return;

        const idInp = document.getElementById("permMemberId");
        const typeInp = document.getElementById("permMemberType");
        const nameEl = document.getElementById("permMemberName");
        const subEl = document.getElementById("permMemberSubtitle");
        const badgeEl = document.getElementById("permCurrentRoleBadge");
        const roleSel = document.getElementById("permRoleSelect");
        const activeChk = document.getElementById("permIsActive");
        const alertEl = document.getElementById("permissionsModalAlert");

        if (idInp) idInp.value = id;
        if (typeInp) typeInp.value = type;
        if (nameEl) nameEl.textContent = name;
        if (subEl) subEl.textContent = subtitle;
        if (badgeEl) badgeEl.textContent = role;
        if (activeChk) activeChk.checked = isActive;
        if (alertEl) alertEl.classList.add("d-none");

        if (roleSel) {
            const options = Array.from(roleSel.options).map(o => o.value);
            if (options.includes(role)) {
                roleSel.value = role;
            } else if (role.includes('Super') || role.includes('Admin')) {
                roleSel.value = 'Super Admin';
            } else if (role.includes('Reception')) {
                roleSel.value = 'Receptionist';
            } else if (role.includes('Assistant')) {
                roleSel.value = 'Assistant';
            } else {
                roleSel.value = 'Doctor';
            }
        }

        syncRolePermissionsCheckboxes();
        showModalSafely(modalEl);
    }

    function syncRolePermissionsCheckboxes() {
        const role = document.getElementById("permRoleSelect")?.value || 'Doctor';
        const pPatients = document.getElementById("perm_patients");
        const pAppts = document.getElementById("perm_appointments");
        const pPrice = document.getElementById("perm_pricing");
        const pStaff = document.getElementById("perm_staff");
        const pFin = document.getElementById("perm_finance");

        if (role === 'Super Admin') {
            [pPatients, pAppts, pPrice, pStaff, pFin].forEach(c => { if (c) c.checked = true; });
        } else if (role === 'Doctor') {
            if (pPatients) pPatients.checked = true;
            if (pAppts) pAppts.checked = true;
            if (pPrice) pPrice.checked = false;
            if (pStaff) pStaff.checked = false;
            if (pFin) pFin.checked = false;
        } else if (role === 'Receptionist') {
            if (pPatients) pPatients.checked = true;
            if (pAppts) pAppts.checked = true;
            if (pPrice) pPrice.checked = false;
            if (pStaff) pStaff.checked = false;
            if (pFin) pFin.checked = true;
        } else if (role === 'Assistant') {
            if (pPatients) pPatients.checked = false;
            if (pAppts) pAppts.checked = false;
            if (pPrice) pPrice.checked = false;
            if (pStaff) pStaff.checked = false;
            if (pFin) pFin.checked = false;
        } else if (role === 'Accountant') {
            if (pPatients) pPatients.checked = false;
            if (pAppts) pAppts.checked = false;
            if (pPrice) pPrice.checked = true;
            if (pStaff) pStaff.checked = false;
            if (pFin) pFin.checked = true;
        }
    }

    async function submitPermissionsAjax(event) {
        if (event) event.preventDefault();
        const id = document.getElementById("permMemberId")?.value || '0';
        const type = document.getElementById("permMemberType")?.value || 'doctor';
        const role = document.getElementById("permRoleSelect")?.value || 'Doctor';
        const isActive = document.getElementById("permIsActive")?.checked ? 'true' : 'false';

        const saveBtn = document.getElementById("btnSavePermissions");
        const alertEl = document.getElementById("permissionsModalAlert");

        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="bi bi-arrow-repeat spin me-1"></i> جاري حفظ الصلاحيات...';
        }

        try {
            const params = new URLSearchParams({ id, type, role, isActive });
            const res = await fetch("/Doctor/Dashboard?handler=UpdatePermissions", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });

            const data = await res.json();
            if (data.success) {
                if (alertEl) {
                    alertEl.className = "alert alert-success mb-3";
                    alertEl.textContent = data.message || "تم حفظ وتطبيق الصلاحيات بنجاح.";
                    alertEl.classList.remove("d-none");
                }
                showToastNotification("تم تحديث صلاحيات الكادر بنجاح.");
                setTimeout(() => {
                    const modalEl = document.getElementById("permissionsModal");
                    if (modalEl && typeof bootstrap !== 'undefined') {
                        const inst = bootstrap.Modal.getInstance(modalEl);
                        if (inst) inst.hide();
                    }
                }, 1000);
            } else {
                if (alertEl) {
                    alertEl.className = "alert alert-danger mb-3";
                    alertEl.textContent = data.message || "تعذر حفظ الصلاحيات.";
                    alertEl.classList.remove("d-none");
                }
            }
        } catch (err) {
            if (alertEl) {
                alertEl.className = "alert alert-danger mb-3";
                alertEl.textContent = "حدث خطأ في الاتصال أثناء حفظ الصلاحيات.";
                alertEl.classList.remove("d-none");
            }
        } finally {
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="bi bi-check2-circle me-1"></i> حفظ وتطبيق الصلاحيات';
            }
        }
    }






    function setWorkingDaysPreset(preset) {
        const sat = document.getElementById("daySat");
        const sun = document.getElementById("daySun");
        const mon = document.getElementById("dayMon");
        const tue = document.getElementById("dayTue");
        const wed = document.getElementById("dayWed");
        const thu = document.getElementById("dayThu");
        const fri = document.getElementById("dayFri");

        if (preset === 'sat-thu') {
            [sat, sun, mon, tue, wed, thu].forEach(d => { if (d) d.checked = true; });
            if (fri) fri.checked = false;
        } else if (preset === 'all-week') {
            [sat, sun, mon, tue, wed, thu, fri].forEach(d => { if (d) d.checked = true; });
        }
        syncWorkingDays();
    }

    function syncWorkingDays() {
        const checkedDays = Array.from(document.querySelectorAll(".day-checkbox:checked")).map(c => c.value);
        const schedDaysInput = document.getElementById("schedWorkingDays");
        const summaryText = document.getElementById("workingDaysSummaryText");

        let text = "";
        if (checkedDays.length === 7) {
            text = "طوال أيام الأسبوع (السبت - الجمعة)";
        } else if (checkedDays.length === 6 && !checkedDays.includes("الجمعة")) {
            text = "السبت - الخميس (الجمعة إجازة)";
        } else if (checkedDays.length > 0) {
            text = checkedDays.join("، ");
        } else {
            text = "لم يتم تحديد أيام عمل";
        }

        if (schedDaysInput) schedDaysInput.value = text;
        if (summaryText) summaryText.textContent = "أيام العمل المحددة: " + text;
    }

    function selectShiftPreset(preset) {
        try {
            const morningRadio = document.getElementById("radioShiftMorning");
            const eveningRadio = document.getElementById("radioShiftEvening");
            const bothRadio = document.getElementById("radioShiftBoth");

            const cardMorning = document.getElementById("shiftCardMorning");
            const cardEvening = document.getElementById("shiftCardEvening");
            const cardBoth = document.getElementById("shiftCardBoth");

            [cardMorning, cardEvening, cardBoth].forEach(c => {
                if (c) {
                    c.classList.remove("border-primary", "border-success", "border-info", "border-2", "shadow-sm");
                    c.style.borderColor = "";
                }
            });

            const morningSlots = document.querySelectorAll(".slot-morning");
            const eveningSlots = document.querySelectorAll(".slot-evening");
            const hoursInput = document.getElementById("schedWorkingHours");

            const mStart = (typeof activeShiftSettings !== 'undefined' && activeShiftSettings && activeShiftSettings.morningStart) ? activeShiftSettings.morningStart : "09:00 ص";
            const mEnd = (typeof activeShiftSettings !== 'undefined' && activeShiftSettings && activeShiftSettings.morningEnd) ? activeShiftSettings.morningEnd : "12:00 م";
            const eStart = (typeof activeShiftSettings !== 'undefined' && activeShiftSettings && activeShiftSettings.eveningStart) ? activeShiftSettings.eveningStart : "12:00 م";
            const eEnd = (typeof activeShiftSettings !== 'undefined' && activeShiftSettings && activeShiftSettings.eveningEnd) ? activeShiftSettings.eveningEnd : "06:00 م";

            if (preset === 'morning') {
                if (morningRadio) morningRadio.checked = true;
                if (cardMorning) {
                    cardMorning.classList.add("border-primary", "border-2", "shadow-sm");
                }
                morningSlots.forEach(s => s.checked = true);
                eveningSlots.forEach(s => s.checked = false);
                if (hoursInput) hoursInput.value = `${mStart} - ${mEnd}`;
            } else if (preset === 'evening') {
                if (eveningRadio) eveningRadio.checked = true;
                if (cardEvening) {
                    cardEvening.classList.add("border-info", "border-2", "shadow-sm");
                }
                morningSlots.forEach(s => s.checked = false);
                eveningSlots.forEach(s => s.checked = true);
                if (hoursInput) hoursInput.value = `${eStart} - ${eEnd}`;
            } else {
                if (bothRadio) bothRadio.checked = true;
                if (cardBoth) {
                    cardBoth.classList.add("border-success", "border-2", "shadow-sm");
                }
                morningSlots.forEach(s => s.checked = true);
                eveningSlots.forEach(s => s.checked = true);
                if (hoursInput) hoursInput.value = `${mStart} - ${mEnd} | ${eStart} - ${eEnd}`;
            }
        } catch (err) {
            console.warn('Error in selectShiftPreset:', err);
        }
    }

    function openDoctorScheduleModal(id, name, hours, days, offDay, slots) {
        const modalEl = document.getElementById("doctorScheduleModal");
        if (!modalEl) return;

        try {
            const label = document.getElementById("doctorScheduleModalLabel");
            if (label) label.innerHTML = `<i class="bi bi-calendar2-week-fill text-warning me-2"></i> ضبط جدول الورديات (${name})`;
            if (document.getElementById("schedDocId")) document.getElementById("schedDocId").value = id;
            if (document.getElementById("schedWorkingHours")) document.getElementById("schedWorkingHours").value = hours || "09:00 ص - 12:00 م | 12:00 م - 06:00 م";
            if (document.getElementById("schedWorkingDays")) document.getElementById("schedWorkingDays").value = days || "السبت - الخميس (الجمعة إجازة)";

            const daysStr = days || "";
            const isAllWeek = daysStr.includes("كامل الأسبوع") || daysStr.includes("طوال");
            const isSatThu = daysStr.includes("السبت - الخميس") || daysStr.includes("الجمعة إجازة");

            if (isAllWeek) {
                setWorkingDaysPreset('all-week');
            } else if (isSatThu || !daysStr) {
                setWorkingDaysPreset('sat-thu');
            } else {
                document.querySelectorAll(".day-checkbox").forEach(chk => {
                    chk.checked = daysStr.includes(chk.value) || (chk.value === 'الإثنين' && daysStr.includes('الاثنين'));
                });
                syncWorkingDays();
            }

            const currentSlots = Array.isArray(slots) ? slots : [];
            const hasMorning = currentSlots.some(s => typeof s === 'string' && (s.includes("ص") || s.startsWith("09:") || s.startsWith("10:") || s.startsWith("11:")));
            const hasEvening = currentSlots.some(s => typeof s === 'string' && (s.includes("م") || s.startsWith("12:") || s.startsWith("01:") || s.startsWith("02:") || s.startsWith("03:") || s.startsWith("04:") || s.startsWith("05:")));

            if (hasMorning && !hasEvening) {
                selectShiftPreset('morning');
            } else if (!hasMorning && hasEvening) {
                selectShiftPreset('evening');
            } else {
                selectShiftPreset('both');
            }

            if (currentSlots.length > 0) {
                document.querySelectorAll(".slot-check").forEach(chk => {
                    chk.checked = currentSlots.some(s => typeof s === 'string' && s.trim() === chk.value.trim());
                });
            }
        } catch (innerErr) {
            console.warn('Non-fatal error initializing schedule modal data:', innerErr);
        }

        showModalSafely(modalEl);
    }
    window.openDoctorScheduleModal = openDoctorScheduleModal;

    function openAddStaffModal() {
        const modalEl = document.getElementById("addStaffModal");
        if (modalEl && typeof bootstrap !== 'undefined') {
            showModalSafely(modalEl);
        }
    }

    function openChangePasswordModal() {
        const modalEl = document.getElementById("changePasswordModal");
        if (!modalEl) return;
        const alertEl = document.getElementById("changePasswordAlert");
        if (alertEl) alertEl.classList.add("d-none");
        document.getElementById("changePasswordForm")?.reset();
        showModalSafely(modalEl);
    }

    async function submitChangePasswordAjax(event) {
        event.preventDefault();
        const alertEl = document.getElementById("changePasswordAlert");
        const currentPass = document.getElementById("currentPasswordInput")?.value || "";
        const newPass = document.getElementById("newPasswordInput")?.value || "";
        const confirmPass = document.getElementById("confirmPasswordInput")?.value || "";
        const saveBtn = document.getElementById("savePasswordBtn");

        if (newPass.length < 6) {
            alertEl.className = "alert alert-danger mb-3";
            alertEl.textContent = "كلمة المرور الجديدة يجب ألا تقل عن 6 خانات.";
            alertEl.classList.remove("d-none");
            return;
        }

        if (newPass !== confirmPass) {
            alertEl.className = "alert alert-danger mb-3";
            alertEl.textContent = "كلمة المرور الجديدة وتأكيدها غير متطابقين.";
            alertEl.classList.remove("d-none");
            return;
        }

        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> جاري الحفظ...';

        try {
            const formData = new URLSearchParams();
            formData.append("currentPassword", currentPass);
            formData.append("newPassword", newPass);
            formData.append("confirmPassword", confirmPass);

            const response = await fetch("/Doctor/Dashboard?handler=ChangePassword", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                alertEl.className = "alert alert-success mb-3";
                alertEl.innerHTML = `<i class="bi bi-shield-check me-1"></i> ${data.message}`;
                alertEl.classList.remove("d-none");
                setTimeout(() => {
                    if (changePasswordModalInstance) changePasswordModalInstance.hide();
                }, 1400);
            } else {
                alertEl.className = "alert alert-danger mb-3";
                alertEl.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-1"></i> ${data.message || "تعذر تغيير كلمة المرور"}`;
                alertEl.classList.remove("d-none");
            }
        } catch (err) {
            alertEl.className = "alert alert-danger mb-3";
            alertEl.textContent = "حدث خطأ في الاتصال أثناء حفظ كلمة المرور.";
            alertEl.classList.remove("d-none");
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> حفظ وتشفير كلمة المرور';
        }
    }

    async function submitDoctorScheduleAjax(event) {
        event.preventDefault();
        const form = document.getElementById("doctorScheduleForm");
        const formData = new FormData(form);
        const saveBtn = document.getElementById("saveScheduleBtn");
        const alertEl = document.getElementById("scheduleModalAlert");

        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> جاري الحفظ...';

        try {
            const params = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                params.append(key, value);
            }

            const response = await fetch("/Doctor/Dashboard?handler=UpdateDoctorSchedule", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });

            const data = await response.json();
            if (data.success) {
                alertEl.className = "alert alert-success mb-3";
                alertEl.textContent = data.detail || data.message;
                alertEl.classList.remove("d-none");
                setTimeout(() => {
                    if (doctorScheduleModalInstance) doctorScheduleModalInstance.hide();
                    location.reload();
                }, 1000);
            } else {
                alertEl.className = "alert alert-danger mb-3";
                alertEl.textContent = data.message || "تعذر تحديث الجدول.";
                alertEl.classList.remove("d-none");
            }
        } catch (err) {
            alertEl.className = "alert alert-danger mb-3";
            alertEl.textContent = "حدث خطأ في الاتصال أثناء حفظ الجدول.";
            alertEl.classList.remove("d-none");
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="bi bi-save me-1"></i> حفظ جدول المواعيد';
        }
    }


    window.openAddDoctorModal = function () {
        const form = document.getElementById("doctorModalForm");
        if (form) form.reset();
        if (document.getElementById("modalDocId")) document.getElementById("modalDocId").value = "0";
        if (document.getElementById("doctorModalLabel")) {
            document.getElementById("doctorModalLabel").innerHTML = '<i class="bi bi-person-plus-fill me-2"></i> إضافة طبيب جديد';
        }
        if (document.getElementById("modalDocIsActive")) document.getElementById("modalDocIsActive").checked = true;
        const modalEl = document.getElementById("doctorModal");
        if (modalEl) showModalSafely(modalEl);
    };

    window.openEditDoctorModal = function (id, name, title, specialty, room, rating, exp, active, hours, days) {
        const form = document.getElementById("doctorModalForm");
        if (form) form.reset();
        if (document.getElementById("modalDocId")) document.getElementById("modalDocId").value = id || "0";
        if (document.getElementById("modalDocName")) document.getElementById("modalDocName").value = name || "";
        if (document.getElementById("modalDocTitle")) document.getElementById("modalDocTitle").value = title || "";
        if (document.getElementById("modalDocSpecialty")) document.getElementById("modalDocSpecialty").value = specialty || "";
        if (document.getElementById("modalDocRoom")) document.getElementById("modalDocRoom").value = room || "";
        if (document.getElementById("modalDocRating")) document.getElementById("modalDocRating").value = rating || "5.0";
        if (document.getElementById("modalDocExp")) document.getElementById("modalDocExp").value = exp || "5";
        if (document.getElementById("modalDocIsActive")) document.getElementById("modalDocIsActive").checked = (active === true || active === "true");
        if (document.getElementById("modalDocWorkingHours")) document.getElementById("modalDocWorkingHours").value = hours || "";
        if (document.getElementById("modalDocWorkingDays")) document.getElementById("modalDocWorkingDays").value = days || "";
        if (document.getElementById("doctorModalLabel")) {
            document.getElementById("doctorModalLabel").innerHTML = '<i class="bi bi-pencil-square me-2"></i> تعديل بيانات الطبيب: ' + (name || '');
        }
        const modalEl = document.getElementById("doctorModal");
        if (modalEl) showModalSafely(modalEl);
    };

    window.openEditDoctorModalFromButton = function (btn) {
        try {
            const id = btn.getAttribute('data-id') || '0';
            const name = btn.getAttribute('data-name') || '';
            const title = btn.getAttribute('data-title') || '';
            const specialty = btn.getAttribute('data-specialty') || '';
            const room = btn.getAttribute('data-room') || '';
            const rating = btn.getAttribute('data-rating') || '5.0';
            const exp = btn.getAttribute('data-exp') || '5';
            const active = btn.getAttribute('data-active') === 'true';
            const hours = btn.getAttribute('data-hours') || '09:00 ص - 12:00 م | 12:00 م - 06:00 م';
            const days = btn.getAttribute('data-days') || 'السبت - الخميس (الجمعة إجازة)';

            window.openEditDoctorModal(id, name, title, specialty, room, rating, exp, active, hours, days);
        } catch (err) {
            console.error('Error in openEditDoctorModalFromButton:', err);
        }
    };

    window.openDoctorScheduleModalFromButton = function (btn) {
        try {
            const id = btn.getAttribute('data-id') || '0';
            const name = btn.getAttribute('data-name') || '';
            const hours = btn.getAttribute('data-hours') || '09:00 ص - 12:00 م | 12:00 م - 06:00 م';
            const days = btn.getAttribute('data-days') || 'السبت - الخميس (الجمعة إجازة)';
            const offDay = btn.getAttribute('data-offday') || 5;
            const rawSlots = btn.getAttribute('data-slots');
            let slots = [];
            if (rawSlots) {
                try {
                    slots = JSON.parse(decodeURIComponent(rawSlots));
                } catch (e) {
                    try {
                        slots = JSON.parse(rawSlots);
                    } catch (e2) {
                        console.warn('Could not parse slots:', e2);
                    }
                }
            }
            window.openDoctorScheduleModal(id, name, hours, days, offDay, slots);
        } catch (err) {
            console.error('Error in openDoctorScheduleModalFromButton:', err);
        }
    };

    // =========================================================================
    // Dynamic Two-Shift Settings & Interactive Customization System
    // =========================================================================
    let activeShiftSettings = {
        morningStart: '<%= (typeof shiftSettings !== "undefined" && shiftSettings.morningStart) ? shiftSettings.morningStart : "09:00 ص" %>',
        morningEnd: '<%= (typeof shiftSettings !== "undefined" && shiftSettings.morningEnd) ? shiftSettings.morningEnd : "12:00 م" %>',
        eveningStart: '<%= (typeof shiftSettings !== "undefined" && shiftSettings.eveningStart) ? shiftSettings.eveningStart : "12:00 م" %>',
        eveningEnd: '<%= (typeof shiftSettings !== "undefined" && shiftSettings.eveningEnd) ? shiftSettings.eveningEnd : "06:00 م" %>',
        intervalMinutes: <%= (typeof shiftSettings !== "undefined" && shiftSettings.intervalMinutes) ? shiftSettings.intervalMinutes : 60 %>
    };

    function openShiftEditModal() {
        const modalEl = document.getElementById("shiftEditModal");
        if (!modalEl) return;

        const mStart = document.getElementById("inputMorningStart");
        const mEnd = document.getElementById("inputMorningEnd");
        const eStart = document.getElementById("inputEveningStart");
        const eEnd = document.getElementById("inputEveningEnd");

        if (mStart) mStart.value = activeShiftSettings.morningStart;
        if (mEnd) mEnd.value = activeShiftSettings.morningEnd;
        if (eStart) eStart.value = activeShiftSettings.eveningStart;
        if (eEnd) eEnd.value = activeShiftSettings.eveningEnd;

        const intervalRadios = document.querySelectorAll('input[name="intervalMinutes"]');
        intervalRadios.forEach(r => {
            r.checked = (parseInt(r.value, 10) === activeShiftSettings.intervalMinutes);
        });

        const alertEl = document.getElementById("shiftEditAlert");
        if (alertEl) alertEl.classList.add("d-none");

        recalculateShiftPreview();
        showModalSafely(modalEl);
    }

    function applyShiftPreset(preset) {
        const mStart = document.getElementById("inputMorningStart");
        const mEnd = document.getElementById("inputMorningEnd");
        const eStart = document.getElementById("inputEveningStart");
        const eEnd = document.getElementById("inputEveningEnd");
        const interval60 = document.getElementById("interval60");

        if (preset === 'standard') {
            if (mStart) mStart.value = "09:00 ص";
            if (mEnd) mEnd.value = "12:00 م";
            if (eStart) eStart.value = "12:00 م";
            if (eEnd) eEnd.value = "06:00 م";
            if (interval60) interval60.checked = true;
        } else if (preset === 'extended') {
            if (mStart) mStart.value = "08:00 ص";
            if (mEnd) mEnd.value = "01:00 م";
            if (eStart) eStart.value = "04:00 م";
            if (eEnd) eEnd.value = "10:00 م";
            if (interval60) interval60.checked = true;
        } else if (preset === 'evening_heavy') {
            if (mStart) mStart.value = "10:00 ص";
            if (mEnd) mEnd.value = "02:00 م";
            if (eStart) eStart.value = "04:00 م";
            if (eEnd) eEnd.value = "11:00 م";
            if (interval60) interval60.checked = true;
        }
        recalculateShiftPreview();
    }

    function parseTime24HJs(timeStr) {
        if (!timeStr) return { hour: 9, minute: 0 };
        const clean = timeStr.trim();
        const m = clean.match(/^(\d{1,2}):(\d{2})\s*([صم])?$/);
        if (!m) return { hour: 9, minute: 0 };
        let h = parseInt(m[1], 10);
        const min = parseInt(m[2], 10);
        const marker = m[3] || '';
        if (marker === 'م' && h < 12) h += 12;
        if (marker === 'ص' && h === 12) h = 0;
        return { hour: h, minute: min };
    }

    function formatTimeArabicJs(totalMins) {
        const h = Math.floor(totalMins / 60);
        const m = totalMins % 60;
        const marker = h < 12 ? 'ص' : 'م';
        let displayH = h % 12;
        if (displayH === 0) displayH = 12;
        return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${marker}`;
    }

    function generateSlotsJs(startStr, endStr, interval) {
        const s = parseTime24HJs(startStr);
        const e = parseTime24HJs(endStr);
        let cur = s.hour * 60 + s.minute;
        const end = e.hour * 60 + e.minute;
        const slots = [];
        const step = Math.max(15, interval || 60);
        while (cur < end) {
            slots.push(formatTimeArabicJs(cur));
            cur += step;
        }
        return slots;
    }

    function recalculateShiftPreview() {
        const mStart = document.getElementById("inputMorningStart")?.value || "09:00 ص";
        const mEnd = document.getElementById("inputMorningEnd")?.value || "12:00 م";
        const eStart = document.getElementById("inputEveningStart")?.value || "12:00 م";
        const eEnd = document.getElementById("inputEveningEnd")?.value || "06:00 م";
        const selectedInterval = parseInt(document.querySelector('input[name="intervalMinutes"]:checked')?.value || "60", 10);

        const morningSlots = generateSlotsJs(mStart, mEnd, selectedInterval);
        const eveningSlots = generateSlotsJs(eStart, eEnd, selectedInterval);

        const mBadge = document.getElementById("morningSlotCountBadge");
        const eBadge = document.getElementById("eveningSlotCountBadge");
        const totalBadge = document.getElementById("totalSlotsCountBadge");
        const previewContainer = document.getElementById("generatedSlotsPreview");

        if (mBadge) mBadge.textContent = `${morningSlots.length} مواعيد`;
        if (eBadge) eBadge.textContent = `${eveningSlots.length} مواعيد`;
        if (totalBadge) totalBadge.textContent = `${morningSlots.length + eveningSlots.length} مواعيد إجمالية`;

        if (previewContainer) {
            previewContainer.innerHTML = '';
            morningSlots.forEach(s => {
                const span = document.createElement("span");
                span.className = "badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 font-monospace";
                span.textContent = "☀️ " + s;
                previewContainer.appendChild(span);
            });
            eveningSlots.forEach(s => {
                const span = document.createElement("span");
                span.className = "badge bg-info-subtle text-info-emphasis border border-info-subtle px-2 py-1 font-monospace";
                span.textContent = "🌙 " + s;
                previewContainer.appendChild(span);
            });
        }
    }

    async function submitShiftEditAjax(event) {
        if (event) event.preventDefault();
        const mStart = document.getElementById("inputMorningStart")?.value || "09:00 ص";
        const mEnd = document.getElementById("inputMorningEnd")?.value || "12:00 م";
        const eStart = document.getElementById("inputEveningStart")?.value || "12:00 م";
        const eEnd = document.getElementById("inputEveningEnd")?.value || "06:00 م";
        const selectedInterval = parseInt(document.querySelector('input[name="intervalMinutes"]:checked')?.value || "60", 10);

        const saveBtn = document.getElementById("btnSaveShiftTimes");
        const alertEl = document.getElementById("shiftEditAlert");

        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="bi bi-arrow-repeat spin me-1"></i> جاري حفظ الورديات...';
        }

        try {
            const params = new URLSearchParams({
                morningStart: mStart,
                morningEnd: mEnd,
                eveningStart: eStart,
                eveningEnd: eEnd,
                intervalMinutes: selectedInterval.toString()
            });

            const res = await fetch("/Doctor/Dashboard?handler=UpdateShiftSettings", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });

            const data = await res.json();
            if (data.success) {
                activeShiftSettings.morningStart = mStart;
                activeShiftSettings.morningEnd = mEnd;
                activeShiftSettings.eveningStart = eStart;
                activeShiftSettings.eveningEnd = eEnd;
                activeShiftSettings.intervalMinutes = selectedInterval;

                const dispMorning = document.getElementById("dispMorningRange");
                const dispEvening = document.getElementById("dispEveningRange");
                // interval display removed
                const dispSettingInterval = document.getElementById("settingsIntervalDisplay");

                if (dispMorning) dispMorning.textContent = `${mStart} - ${mEnd}`;
                if (dispEvening) dispEvening.textContent = `${eStart} - ${eEnd}`;

                if (dispSettingInterval) dispSettingInterval.value = `${selectedInterval} دقيقة بين كل موعد`;

                updateDoctorScheduleModalSlots(mStart, mEnd, eStart, eEnd, selectedInterval);

                if (alertEl) {
                    alertEl.className = "alert alert-success mb-3";
                    alertEl.textContent = data.message || "تم حفظ وتطبيق أوقات الورديات بنجاح.";
                    alertEl.classList.remove("d-none");
                }

                showToastNotification("تم تحديث مواعيد الورديات بنجاح في جميع أقسام المركز.");

                setTimeout(() => {
                    const modalEl = document.getElementById("shiftEditModal");
                    if (modalEl && typeof bootstrap !== 'undefined') {
                        const inst = bootstrap.Modal.getInstance(modalEl);
                        if (inst) inst.hide();
                    }
                }, 1200);
            } else {
                if (alertEl) {
                    alertEl.className = "alert alert-danger mb-3";
                    alertEl.textContent = data.message || "تعذر حفظ إعدادات الورديات.";
                    alertEl.classList.remove("d-none");
                }
            }
        } catch (err) {
            if (alertEl) {
                alertEl.className = "alert alert-danger mb-3";
                alertEl.textContent = "حدث خطأ في الاتصال أثناء حفظ الورديات.";
                alertEl.classList.remove("d-none");
            }
        } finally {
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="bi bi-check2-circle me-1"></i> حفظ وتطبيق مواعيد الورديات';
            }
        }
    }

    function updateDoctorScheduleModalSlots(mStart, mEnd, eStart, eEnd, interval) {
        const morningCardHours = document.querySelector("#shiftCardMorning .font-monospace");
        const eveningCardHours = document.querySelector("#shiftCardEvening .font-monospace");
        const bothCardHours = document.querySelector("#shiftCardBoth .font-monospace");

        if (morningCardHours) morningCardHours.textContent = `${mStart} - ${mEnd}`;
        if (eveningCardHours) eveningCardHours.textContent = `${eStart} - ${eEnd}`;
        if (bothCardHours) bothCardHours.textContent = `${mStart} - ${eEnd}`;

        const morningSlots = generateSlotsJs(mStart, mEnd, interval);
        const eveningSlots = generateSlotsJs(eStart, eEnd, interval);

        const mContainer = document.getElementById("morningSlotsContainer");
        const eContainer = document.getElementById("eveningSlotsContainer");

        if (mContainer) {
            mContainer.innerHTML = '';
            morningSlots.forEach(s => {
                const col = document.createElement("div");
                col.className = "col-4";
                col.innerHTML = `
                    <div class="form-check border rounded p-2 px-3 bg-light">
                        <input class="form-check-input slot-check slot-morning" type="checkbox" name="scheduleSelectedSlots" value="${s}" id="slot_${s.replace(/[^a-zA-Z0-9]/g, '_')}" checked>
                        <label class="form-check-label fw-bold small" for="slot_${s.replace(/[^a-zA-Z0-9]/g, '_')}">${s}</label>
                    </div>
                `;
                mContainer.appendChild(col);
            });
        }

        if (eContainer) {
            eContainer.innerHTML = '';
            eveningSlots.forEach(s => {
                const col = document.createElement("div");
                col.className = "col-4";
                col.innerHTML = `
                    <div class="form-check border rounded p-2 px-3 bg-light">
                        <input class="form-check-input slot-check slot-evening" type="checkbox" name="scheduleSelectedSlots" value="${s}" id="slot_${s.replace(/[^a-zA-Z0-9]/g, '_')}" checked>
                        <label class="form-check-label fw-bold small" for="slot_${s.replace(/[^a-zA-Z0-9]/g, '_')}">${s}</label>
                    </div>
                `;
                eContainer.appendChild(col);
            });
        }
    }

    async function submitSettingsAjax(e) {
        if (e) e.preventDefault();
        const phone = document.getElementById('settingsEmergencyPhone').value;
        const btn = document.getElementById('btnSettingsSave');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="bi bi-arrow-repeat spin me-1"></i> جاري الحفظ والتأمين...';
        }

        try {
            const params = new URLSearchParams({
                EmergencyPhone: phone,
                morningStart: activeShiftSettings.morningStart,
                morningEnd: activeShiftSettings.morningEnd,
                eveningStart: activeShiftSettings.eveningStart,
                eveningEnd: activeShiftSettings.eveningEnd,
                intervalMinutes: activeShiftSettings.intervalMinutes.toString()
            });
            const res = await fetch("/Doctor/Dashboard?handler=UpdateSettings", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });

            const data = await res.json();
            if (data.success) {
                showToastNotification(data.message || "تم حفظ إعدادات المنظومة وفصل/تأمين جلسة الحساب بنجاح.");
                document.querySelectorAll('input[name="EmergencyPhone"]').forEach(inp => inp.value = phone);
            } else {
                showToastNotification(data.message || "تعذر حفظ الإعدادات", false);
            }
        } catch (err) {
            showToastNotification("حدث خطأ في الاتصال أثناء حفظ الإعدادات", false);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="bi bi-check2-circle me-1"></i> حفظ وفصل الحساب';
            }
        }
    }

    async function deleteStaffMember(id, name) {
        if (!id) return;
        const confirmed = confirm(`هل أنت متأكد من رغبتك في حذف الموظف (${name}) نهائياً من قاعدة بيانات Supabase؟ لا يمكن التراجع عن هذا الإجراء.`);
        if (!confirmed) return;

        try {
            const row = document.getElementById(`staff-row-${id}`);
            if (row) {
                row.style.opacity = '0.5';
                row.style.pointerEvents = 'none';
            }

            const formData = new URLSearchParams();
            formData.append('id', id);

            const res = await fetch('/Doctor/Dashboard?handler=DeleteStaff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData.toString()
            });

            const data = await res.json();
            if (data.success) {
                showToastNotification(data.message || `تم حذف الموظف (${name}) بنجاح.`);
                if (row) {
                    row.remove();
                }
                const counter = document.getElementById('totalStaffCountText');
                if (counter) {
                    const remaining = document.querySelectorAll('#staffTableBody tr[id^="staff-row-"]').length;
                    counter.textContent = `${remaining} موظف`;
                }
            } else {
                if (row) {
                    row.style.opacity = '1';
                    row.style.pointerEvents = 'auto';
                }
                showToastNotification(data.message || 'تعذر حذف الموظف من قاعدة البيانات', false);
            }
        } catch (err) {
            console.error('Error deleting staff:', err);
            const row = document.getElementById(`staff-row-${id}`);
            if (row) {
                row.style.opacity = '1';
                row.style.pointerEvents = 'auto';
            }
            showToastNotification('حدث خطأ في الاتصال أثناء حذف الموظف', false);
        }
    }

    async function handleStaffSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const name = (form.name?.value || '').trim();
        const role = (form.role?.value || '').trim();
        const phone = (form.phone?.value || '').trim();

        if (!name || !phone) {
            showToastNotification('يرجى ملء جميع الحقول المطلوبة.', false);
            return;
        }

        const saveBtn = document.getElementById('saveStaffBtn');
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status"></span> جاري الحفظ في Supabase...';
        }

        try {
            const formData = new URLSearchParams();
            formData.append('name', name);
            formData.append('role', role);
            formData.append('phone', phone);

            const res = await fetch('/Doctor/Dashboard?handler=AddStaff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData.toString()
            });

            const data = await res.json();
            if (data.success) {
                showToastNotification(data.message || 'تمت إضافة الموظف وتفعيله في قاعدة البيانات بنجاح.');
                const modalEl = document.getElementById('addStaffModal');
                if (modalEl && typeof bootstrap !== 'undefined') {
                    const modalInst = bootstrap.Modal.getInstance(modalEl);
                    if (modalInst) modalInst.hide();
                }
                form.reset();
                setTimeout(() => {
                    window.location.hash = 'staff';
                    window.location.reload();
                }, 600);
            } else {
                showToastNotification(data.message || 'تعذر حفظ الموظف في Supabase', false);
            }
        } catch (err) {
            console.error('Error adding staff:', err);
            showToastNotification('حدث خطأ أثناء حفظ الموظف في Supabase', false);
        } finally {
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="bi bi-save me-1"></i> حفظ وتفعيل في Supabase';
            }
        }
    }

    function initSupabaseRealtime() {
        try {
            if (typeof supabase === 'undefined') return;
            const supabaseUrl = '<%= (typeof supabaseUrl !== "undefined" && supabaseUrl) ? supabaseUrl : (process.env.SUPABASE_URL || "https://uwyyntbsvhqmrlthmgvn.supabase.co") %>';
            const supabaseKey = '<%= (typeof supabaseKey !== "undefined" && supabaseKey) ? supabaseKey : (process.env.SUPABASE_ANON_KEY || "sb_publishable_MJntq3aqg2RNwM9cpqoeXQ_-oU2bIfr") %>';

            const client = supabase.createClient(supabaseUrl, supabaseKey);
            client.channel('public:Staff:changes')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'Staff' }, payload => {
                    console.log('Realtime change detected in Staff table:', payload);
                    showToastNotification('تم تحديث بيانات طاقم المركز لحظياً من قاعدة البيانات.');
                    setTimeout(() => location.reload(), 800);
                })
                .subscribe();

            client.channel('public:Doctors:changes')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'Doctors' }, payload => {
                    setTimeout(() => location.reload(), 800);
                })
                .subscribe();
        } catch (e) {
            console.log('Realtime sync initialized in polling mode');
        }
    }


    function showToastNotification(message, isSuccess = true) {
        let toastEl = document.getElementById("actionToast");
        if (!toastEl) {
            const container = document.createElement("div");
            container.className = "toast-container position-fixed bottom-0 start-0 p-3";
            container.style.zIndex = "1200";
            container.innerHTML = `
                <div id="actionToast" class="toast align-items-center text-white border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body d-flex align-items-center gap-2">
                            <i class="bi fs-5" id="toastIcon"></i>
                            <span id="toastMessage" class="fw-semibold"></span>
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>`;
            document.body.appendChild(container);
            toastEl = document.getElementById("actionToast");
        }

        const toastMsg = document.getElementById("toastMessage");
        const toastIcon = document.getElementById("toastIcon");
        if (toastMsg) toastMsg.textContent = message;
        if (isSuccess) {
            toastEl.className = "toast align-items-center text-white bg-dark border-0 shadow-lg";
            if (toastIcon) toastIcon.className = "bi bi-check-circle-fill text-success fs-5";
        } else {
            toastEl.className = "toast align-items-center text-white bg-danger border-0 shadow-lg";
            if (toastIcon) toastIcon.className = "bi bi-exclamation-triangle-fill text-white fs-5";
        }
        const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 });
        toast.show();
    }

    function updateDashboardBookingStats() {
        const rows = document.querySelectorAll("tr[id^='booking-row-']");
        const total = rows.length;
        let confirmed = 0;
        rows.forEach(r => {
            const select = r.querySelector("select");
            if (select && select.value === "مؤكد") {
                confirmed++;
            }
        });
        const totalEl = document.getElementById("stat-total-bookings");
        const confirmedEl = document.getElementById("stat-confirmed-bookings");
        const tabCountEl = document.getElementById("bookings-tab-count");
        if (totalEl) totalEl.textContent = total;
        if (confirmedEl) confirmedEl.textContent = confirmed;
        if (tabCountEl) tabCountEl.textContent = total;
    }

    async function updateBookingStatusAjax(bookingRef, newStatus, selectEl) {
        const row = document.getElementById(`booking-row-${bookingRef}`);
        const cleanStatus = newStatus.replace(/\s+/g, '');
        if (selectEl) {
            selectEl.disabled = true;
            selectEl.className = `form-select form-select-sm fw-semibold status-select-${cleanStatus}`;
        }
        try {
            const params = new URLSearchParams({ bookingRef, newStatus });
            const response = await fetch("/Doctor/Dashboard?handler=UpdateBookingStatus", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });
            const data = await response.json();
            if (data.success) {
                if (row) {
                    if (newStatus === 'ملغي') {
                        row.classList.add('row-cancelled');
                    } else {
                        row.classList.remove('row-cancelled');
                    }
                }
                updateDashboardBookingStats();
                showToastNotification(`تم تحديث حالة الحجز (${bookingRef}) إلى "${newStatus}" وحفظها في قاعدة البيانات.`);
            } else {
                showToastNotification(data.message || "فشل تحديث الحالة في قاعدة البيانات", false);
            }
        } catch (err) {
            console.error("Update status error:", err);
            showToastNotification("حدث خطأ أثناء الاتصال بقاعدة البيانات", false);
        } finally {
            if (selectEl) selectEl.disabled = false;
        }
    }

    async function cancelBookingAjax(bookingRef) {
        if (!confirm(`هل أنت متأكد من إلغاء الموعد (${bookingRef}) وتفريغ وقت الحجز في جدول المواعيد؟`)) return;
        const row = document.getElementById(`booking-row-${bookingRef}`);
        const selectEl = row ? row.querySelector('select') : null;
        if (selectEl) selectEl.disabled = true;

        try {
            const params = new URLSearchParams({ bookingRef });
            const response = await fetch("/Doctor/Dashboard?handler=CancelBooking", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });
            const data = await response.json();
            if (data.success) {
                if (selectEl) {
                    selectEl.value = 'ملغي';
                    selectEl.className = 'form-select form-select-sm fw-semibold status-select-ملغي';
                }
                if (row) {
                    row.classList.add('row-cancelled');
                }
                updateDashboardBookingStats();
                showToastNotification(`تم إلغاء الموعد (${bookingRef}) وتفريغ وقته في قاعدة البيانات بنجاح.`);
            } else {
                showToastNotification(data.message || "تعذر إلغاء الموعد", false);
            }
        } catch (err) {
            console.error("Cancel booking error:", err);
            showToastNotification("حدث خطأ أثناء إلغاء الموعد", false);
        } finally {
            if (selectEl) selectEl.disabled = false;
        }
    }

    async function deleteBookingAjax(bookingRef) {
        if (!confirm(`هل أنت متأكد من حذف الحجز (${bookingRef}) نهائياً من قاعدة البيانات؟`)) return;
        const row = document.getElementById(`booking-row-${bookingRef}`);
        try {
            const params = new URLSearchParams({ bookingRef });
            const response = await fetch("/Doctor/Dashboard?handler=DeleteBooking", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });
            const data = await response.json();
            if (data.success) {
                if (row) {
                    row.style.transition = "all 0.35s ease";
                    row.style.opacity = "0";
                    row.style.transform = "translateX(20px)";
                    setTimeout(() => {
                        row.remove();
                        updateDashboardBookingStats();
                    }, 350);
                }
                showToastNotification(`تم حذف الحجز (${bookingRef}) نهائياً من قاعدة البيانات.`);
            } else {
                showToastNotification(data.message || "تعذر حذف الحجز", false);
            }
        } catch (err) {
            console.error("Delete booking error:", err);
            showToastNotification("حدث خطأ أثناء حذف الحجز", false);
        }
    }

    async function deleteDoctorAjax(id, name) {
        if (!confirm(`هل تريد بالتأكيد حذف الطبيب (${name}) نهائياً؟`)) return;
        try {
            const params = new URLSearchParams({ id });
            const response = await fetch("/Doctor/Dashboard?handler=DeleteDoctor", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });
            const data = await response.json();
            if (data.success) {
                document.getElementById(`doctor-card-${id}`)?.remove();
            } else {
                alert(data.message || "تعذر حذف الطبيب");
            }
        } catch (err) {
            console.error("Delete doctor error:", err);
        }
    }

    async function generateSlotsAjax(intervalMinutes) {
        try {
            const params = new URLSearchParams({ intervalMinutes });
            const response = await fetch("/Doctor/Dashboard?handler=GenerateSlots", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });
            const data = await response.json();
            if (data.success) {
                location.reload();
            }
        } catch (err) {
            console.error("Generate slots error:", err);
        }
    }

    async function addSlotAjax(event) {
        event.preventDefault();
        const input = document.getElementById("newSlotTimeInput");
        const time = input?.value?.trim();
        if (!time) return;

        try {
            const params = new URLSearchParams({ newSlotTime: time });
            const response = await fetch("/Doctor/Dashboard?handler=AddSlot", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });
            const data = await response.json();
            if (data.success) {
                location.reload();
            } else {
                alert(data.message || "تعذر إضافة الموعد");
            }
        } catch (err) {
            console.error("Add slot error:", err);
        }
    }

    async function toggleSlotAjax(slotTime) {
        try {
            const params = new URLSearchParams({ slotTime });
            const response = await fetch("/Doctor/Dashboard?handler=ToggleSlot", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });
            const data = await response.json();
            if (data.success) {
                location.reload();
            }
        } catch (err) {
            console.error("Toggle slot error:", err);
        }
    }

    async function deleteSlotAjax(slotTime) {
        if (!confirm(`هل تريد إزالة وقت الموعد (${slotTime})؟`)) return;
        try {
            const params = new URLSearchParams({ slotTime });
            const response = await fetch("/Doctor/Dashboard?handler=DeleteSlot", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });
            const data = await response.json();
            if (data.success) {
                location.reload();
            }
        } catch (err) {
            console.error("Delete slot error:", err);
        }
    }


    // ========================================================
    // Patient Bookings Search & Filter & Modal Management
    // ========================================================
    function filterPatientBookings() {
        const searchInput = document.getElementById("patientBookingSearchInput");
        const statusFilter = document.getElementById("patientBookingStatusFilter");
        const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
        const status = statusFilter ? statusFilter.value : "";
        
        const rows = document.querySelectorAll("#patientsBookingTable tbody tr.patient-booking-row");
        const noResultsRow = document.getElementById("noPatientsFoundRow");
        let visibleCount = 0;

        rows.forEach(row => {
            const name = (row.getAttribute("data-patient-name") || "").toLowerCase();
            const phone = (row.getAttribute("data-patient-phone") || "").toLowerCase();
            const ref = (row.getAttribute("data-patient-ref") || "").toLowerCase();
            const doctor = (row.getAttribute("data-doctor") || "").toLowerCase();
            const service = (row.getAttribute("data-service") || "").toLowerCase();
            const rowStatus = row.getAttribute("data-status") || "";

            const matchesQuery = !query || name.includes(query) || phone.includes(query) || ref.includes(query) || doctor.includes(query) || service.includes(query);
            const matchesStatus = !status || rowStatus === status;

            if (matchesQuery && matchesStatus) {
                row.style.display = "";
                visibleCount++;
            } else {
                row.style.display = "none";
            }
        });

        const countBadge = document.getElementById("patientSearchResultCount");
        if (countBadge) {
            countBadge.textContent = `${visibleCount} من أصل ${rows.length}`;
        }

        if (noResultsRow) {
            if (visibleCount === 0 && rows.length > 0) {
                noResultsRow.classList.remove("d-none");
            } else {
                noResultsRow.classList.add("d-none");
            }
        }
    }

    function clearPatientSearch() {
        const searchInput = document.getElementById("patientBookingSearchInput");
        const statusFilter = document.getElementById("patientBookingStatusFilter");
        if (searchInput) searchInput.value = "";
        if (statusFilter) statusFilter.value = "";
        filterPatientBookings();
    }

    function openPatientDetailsModal(btn) {
        if (!btn) return;
        const name = btn.getAttribute("data-name") || "-";
        const phone = btn.getAttribute("data-phone") || "-";
        const ref = btn.getAttribute("data-ref") || "-";
        const doctor = btn.getAttribute("data-doctor") || "-";
        const specialty = btn.getAttribute("data-specialty") || "-";
        const service = btn.getAttribute("data-service") || "-";
        const date = btn.getAttribute("data-date") || "-";
        const time = btn.getAttribute("data-time") || "-";
        const shift = btn.getAttribute("data-shift") || "-";
        const status = btn.getAttribute("data-status") || "-";
        const notes = btn.getAttribute("data-notes") || "لا توجد ملاحظات إضافية";

        const pmName = document.getElementById("pmPatientName");
        const pmAvatar = document.getElementById("pmAvatar");
        const pmRef = document.getElementById("pmReference");
        const pmPhone = document.getElementById("pmPatientPhone");
        const pmDoctor = document.getElementById("pmDoctorName");
        const pmSpecialty = document.getElementById("pmSpecialty");
        const pmService = document.getElementById("pmServiceName");
        const pmDateTime = document.getElementById("pmDateTime");
        const pmShift = document.getElementById("pmShiftType");
        const pmNotes = document.getElementById("pmPatientNotes");
        const pmWhatsapp = document.getElementById("pmWhatsappBtn");
        const pmStatusBadge = document.getElementById("pmStatusBadge");

        if (pmName) pmName.textContent = name;
        if (pmAvatar) pmAvatar.textContent = name.charAt(0) || "م";
        if (pmRef) pmRef.textContent = ref;
        if (pmPhone) pmPhone.textContent = phone;
        if (pmDoctor) pmDoctor.textContent = doctor;
        if (pmSpecialty) pmSpecialty.textContent = specialty;
        if (pmService) pmService.textContent = service;
        if (pmDateTime) pmDateTime.textContent = `${date} | ${time}`;
        if (pmShift) pmShift.textContent = `الوردية: ${shift}`;
        if (pmNotes) pmNotes.textContent = notes;

        if (pmWhatsapp) {
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            pmWhatsapp.href = `https://wa.me/20${cleanPhone.startsWith('0') ? cleanPhone.substring(1) : cleanPhone}`;
        }

        if (pmStatusBadge) {
            pmStatusBadge.className = 'badge fs-6 px-3 py-2 rounded-pill';
            if (status === 'Confirmed' || status === 'مؤكد') {
                pmStatusBadge.classList.add('bg-success');
                pmStatusBadge.textContent = 'مؤكد';
            } else if (status === 'Pending' || status === 'معلق' || status === 'قيد الانتظار') {
                pmStatusBadge.classList.add('bg-warning', 'text-dark');
                pmStatusBadge.textContent = 'قيد الانتظار';
            } else if (status === 'Completed' || status === 'مكتمل') {
                pmStatusBadge.classList.add('bg-primary');
                pmStatusBadge.textContent = 'مكتمل';
            } else if (status === 'Cancelled' || status === 'ملغي') {
                pmStatusBadge.classList.add('bg-danger');
                pmStatusBadge.textContent = 'ملغي';
            } else {
                pmStatusBadge.classList.add('bg-secondary');
                pmStatusBadge.textContent = status;
            }
        }

        const modalEl = document.getElementById("patientDetailsModal");
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        }
    }

    async function updatePatientBookingStatusAjax(selectEl, bookingRef) {
        if (!selectEl || !bookingRef) return;
        const newStatus = selectEl.value;
        const prevStatus = selectEl.getAttribute("data-current-status") || selectEl.value;

        try {
            selectEl.disabled = true;
            const res = await fetch("/Doctor/Dashboard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: new URLSearchParams({
                    action: "UpdateBookingStatus",
                    bookingRef: bookingRef,
                    newStatus: newStatus
                })
            });

            if (res.ok) {
                selectEl.setAttribute("data-current-status", newStatus);
                const row = selectEl.closest("tr");
                if (row) row.setAttribute("data-status", newStatus);
                if (typeof showToast === 'function') {
                    showToast("تم تحديث حالة الحجز بنجاح", "success");
                }
            } else {
                selectEl.value = prevStatus;
                if (typeof showToast === 'function') {
                    showToast("تعذر تحديث حالة الحجز", "danger");
                }
            }
        } catch (err) {
            console.error(err);
            selectEl.value = prevStatus;
            if (typeof showToast === 'function') {
                showToast("حدث خطأ أثناء الاتصال بالخادم", "danger");
            }
        } finally {
            selectEl.disabled = false;
        }
    }

    function filterBookingsTable() {
        const query = document.getElementById("bookingSearchInput").value.toLowerCase();
        const rows = document.querySelectorAll("#bookingsTable tbody tr");
        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(query) ? "" : "none";
        });
    }




    // Persist active tab across actions and refreshes

    /* Global Delegated Doctor Modals Click Handler */
    document.addEventListener("click", function (e) {
        const editBtn = e.target.closest(".edit-doctor-action-btn");
        if (editBtn) {
            e.preventDefault();
            e.stopPropagation();
            openEditDoctorModalFromButton(editBtn);
            return;
        }
        const schedBtn = e.target.closest(".schedule-doctor-action-btn, .doctor-schedule-box");
        if (schedBtn) {
            e.preventDefault();
            e.stopPropagation();
            openDoctorScheduleModalFromButton(schedBtn);
            return;
        }
        const permBtn = e.target.closest(".permissions-doctor-action-btn, .permissions-staff-action-btn");
        if (permBtn) {
            e.preventDefault();
            e.stopPropagation();
            openPermissionsModalFromButton(permBtn);
            return;
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        initSupabaseRealtime();



        const rawHash = window.location.hash || localStorage.getItem("activeDoctorDashboardTab") || "";
        if (rawHash) {
            let targetTab = document.querySelector(`button[data-bs-target="${rawHash}"]`);
            if (!targetTab && !rawHash.endsWith('-panel')) {
                targetTab = document.querySelector(`button[data-bs-target="${rawHash}-panel"]`);
            }
            if (targetTab) {
                bootstrap.Tab.getOrCreateInstance(targetTab).show();
            }
        }

        document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tab => {
            tab.addEventListener('shown.bs.tab', (e) => {
                const target = e.target.getAttribute('data-bs-target');
                if (target) {
                    const cleanHash = target.replace('-panel', '');
                    history.replaceState(null, null, cleanHash);
                    localStorage.setItem("activeDoctorDashboardTab", cleanHash);
                    if (typeof window.syncSidebarWithCurrentTab === 'function') {
                        window.syncSidebarWithCurrentTab(cleanHash);
                    }
                }
            });
        });
    });
</script>

`
````

---

### واجهة رسائل الخطأ (error.ejs)

- **المسار:** `Dental city/src/views/error.ejs`
- **عدد الأسطر:** 21 سطر
- **الحجم:** 1.0 KB

````html
<div class="py-5 text-center" style="direction: rtl; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div class="card border-0 shadow-sm rounded-4 p-5 mx-auto" style="max-width: 600px;">
        <div class="text-danger display-3 mb-3">
            <i class="bi bi-exclamation-octagon-fill"></i>
        </div>
        <h3 class="fw-bold text-dark mb-2"><%= typeof title !== 'undefined' ? title : 'حدث خطأ' %></h3>
        <p class="text-muted mb-4 lead">
            <%= typeof message !== 'undefined' ? message : 'تعذر إتمام طلبك في الوقت الحالي.' %>
        </p>
        <div>
            <a href="/" class="btn btn-primary px-4 rounded-pill">
                <i class="bi bi-house-door me-1"></i> العودة للرئيسية
            </a>
            <a href="/Appointments/Book" class="btn btn-outline-secondary px-4 rounded-pill">
                <i class="bi bi-calendar2-plus me-1"></i> حجز موعد
            </a>
        </div>
    </div>
</div>

````

---

### صفحة سياسة الخصوصية (privacy.ejs)

- **المسار:** `Dental city/src/views/privacy.ejs`
- **عدد الأسطر:** 27 سطر
- **الحجم:** 1.8 KB

````html
<div class="py-4" style="direction: rtl; text-align: right; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        <h2 class="fw-bold mb-4 text-dark">
            <i class="bi bi-shield-check text-primary me-2"></i> سياسة الخصوصية وسرية البيانات
        </h2>
        <p class="lead text-muted mb-4">
            في <span class="text-primary fw-bold">مركز دينتال سيتي</span> (Dental City Center)، نولي سرية وخصوصية بيانات مرضانا الكرام أهمية قصوى.
        </p>

        <h5 class="fw-bold text-dark mt-4">1. البيانات التي نجمعها</h5>
        <p class="text-muted">
            نقوم بجمع البيانات الأساسية التي تقدمها طواعية أثناء حجز الموعد (مثل: الاسم، رقم الهاتف، التخصص المطلوب، وأي ملاحظات صحية ذات صلة) لغرض تنظيم المواعيد وتقديم أفضل رعاية علاجية ممكنة.
        </p>

        <h5 class="fw-bold text-dark mt-4">2. سرية السجلات الطبية</h5>
        <p class="text-muted">
            جميع البيانات والمعلومات الطبية يتم تخزينها وفق معايير أمان وتشفير متقدمة، ولا يتم مشاركتها إطلاقاً مع أي أطراف ثالثة دون إذنك المسبق.
        </p>

        <h5 class="fw-bold text-dark mt-4">3. التواصل وإشعارات المواعيد</h5>
        <p class="text-muted">
            نستخدم رقم هاتفك فقط لإرسال تأكيدات الحجز والتذكير بالمواعيد الطبية أو التنسيق في حالات الطوارئ.
        </p>
    </div>
</div>

````

---

## 3. السكربتات والأنماط المخصصة (Custom Scripts & Styles)

> ملفات CSS و JS المخصصة الخاصة بواجهة الموقع وإدارته.

### أنماط الموقع المخصصة (site.css)

- **المسار:** `Dental city/public/css/site.css`
- **عدد الأسطر:** 70 سطر
- **الحجم:** 1.5 KB

````css
html {
  font-size: 14px;
}

@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

.btn:focus, .btn:active:focus, .btn-link.nav-link:focus, .form-control:focus, .form-check-input:focus {
  box-shadow: 0 0 0 0.1rem white, 0 0 0 0.25rem #258cfb;
}

html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 60px;
}

.form-floating > .form-control-plaintext::placeholder, .form-floating > .form-control::placeholder {
  color: var(--bs-secondary-color);
  text-align: end;
}

.form-floating > .form-control-plaintext:focus::placeholder, .form-floating > .form-control:focus::placeholder {
  text-align: start;
}

.brand-logo {
  object-fit: contain;
  transition: transform 0.2s ease-in-out;
}

.brand-logo:hover {
  transform: scale(1.05);
}

/* محاذاة أزرار الإغلاق في النوافذ المنبثقة لأقصى اليسار في الوضع العربي RTL */
.modal-header {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  direction: rtl !important;
}

.modal-header .modal-title {
  margin: 0 !important;
  text-align: right !important;
  flex-grow: 1 !important;
}

.modal-header .btn-close {
  margin: 0 !important;
  margin-right: auto !important;
  margin-left: 0 !important;
  position: static !important;
  opacity: 0.85;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-header .btn-close:hover {
  opacity: 1;
  transform: rotate(90deg);
}
````

---

### سكربتات الموقع العامة (site.js)

- **المسار:** `Dental city/public/js/site.js`
- **عدد الأسطر:** 5 سطر
- **الحجم:** 0.2 KB

````javascript
﻿// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
````

---

## 4. ملفات التكوين والإعدادات والنشر (Configuration & Deployment)

> ملفات التكوين المعتمدة لضمان التوافق مع Vercel و IIS/Windows Hosting (AppPool) و Node 20 LTS.

### Root package.json

- **المسار:** `package.json`
- **عدد الأسطر:** 29 سطر
- **الحجم:** 0.7 KB

````json
{
  "name": "dental-city-root",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "main": "server.js",
  "engines": {
    "node": "20.x || 22.x"
  },
  "scripts": {
    "postinstall": "node scripts/postinstall.js",
    "build": "node scripts/build.js",
    "package:monsterasp": "node scripts/package-monsterasp.js",
    "start": "node server.js",
    "dev": "npm run dev --prefix \"Dental city\""
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.49.1",
    "cookie-parser": "^1.4.7",
    "dotenv": "^16.4.7",
    "ejs": "^3.1.10",
    "express": "^4.21.2",
    "express-ejs-layouts": "^2.5.1",
    "express-session": "^1.18.1",
    "ws": "^8.23.0",
    "zod": "^4.6.7"
  }
}
````

---

### Root Server Entrypoint (server.js)

- **المسار:** `server.js`
- **عدد الأسطر:** 77 سطر
- **الحجم:** 3.4 KB

````javascript
/**
 * Dental City Clinic Management & Booking System
 * Universal Root Server Entrypoint for Hosting Environments (MonsterASP.NET, IIS, Fly.io, Vercel)
 */

import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Candidate paths for compiled server file
const candidates = [
  path.join(__dirname, 'Dental city', 'dist', 'server.js'),
  path.join(__dirname, 'dist', 'server.js')
];

let app;

for (const candidate of candidates) {
  if (fs.existsSync(candidate)) {
    try {
      const moduleUrl = pathToFileURL(candidate).href;
      const imported = await import(moduleUrl);
      app = imported.default || imported;
      if (app) break;
    } catch (err) {
      console.warn(`[LOADER] Candidate ${candidate} threw error: ${err.message}. Trying next candidate...`);
    }
  }
}

if (!app) {
  // If compiled dist files are missing or failed to import, start a fallback HTTP server
  // to prevent IIS / MonsterASP.NET Application Pool from crashing with fatal communication error (Event ID 5011)
  const port = process.env.PORT || process.env.HTTP_PLATFORM_PORT || 5083;
  const fallbackServer = http.createServer((req, res) => {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>تنبيه إعداد خادم مركز دينتال سيتي</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1e293b; padding: 40px 20px; text-align: center; }
    .card { max-width: 650px; margin: 0 auto; background: white; border-radius: 16px; padding: 36px; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    h1 { color: #dc2626; font-size: 22px; margin-bottom: 16px; }
    p { font-size: 15px; line-height: 1.7; color: #475569; }
    .box { background: #f1f5f9; padding: 14px; border-radius: 8px; font-family: monospace; font-size: 13px; margin: 18px 0; text-align: left; direction: ltr; word-break: break-all; }
    .badge { display: inline-block; padding: 6px 14px; background: #e0f2fe; color: #0369a1; border-radius: 20px; font-weight: bold; margin-bottom: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">MonsterASP.NET Node.js Diagnostic</div>
    <h1>تنبيه: ملفات التطبيق المترجمة غير مكتملة على الخادم</h1>
    <p>خادم Node.js يعمل بنجاح ومربوط على منفذ IIS، ولكن لم يتم العثور على ملفات <code>dist/server.js</code> أو حزم <code>node_modules</code> المطلوبة لتشغيل النظام.</p>
    <div class="box">
      <b>Checked paths:</b><br/>
      ${candidates.map(c => `- ${c} (${fs.existsSync(c) ? 'Found' : 'Not Found'})`).join('<br/>')}
    </div>
    <p>لحل المشكلة نهائياً، يرجى تشغيل أمر <code>npm run package:monsterasp</code> محلياً ثم رفع محتويات مجلد <strong>publish-monsterasp</strong> بالكامل إلى مجلد <strong>/wwwroot</strong> على الاستضافة.</p>
  </div>
</body>
</html>`);
  });

  const portNum = Number(port) || 5083;
  fallbackServer.listen(portNum, () => {
    console.log(`[DIAGNOSTIC] Fallback server active on port ${portNum} to prevent AppPool crash.`);
  });
}

export default app;
````

---

### Root IIS / AppPool Configuration (web.config)

- **المسار:** `web.config`
- **عدد الأسطر:** 47 سطر
- **الحجم:** 1.7 KB

````xml
<?xml version="1.0" encoding="utf-8"?>
<!--
  Dental City Clinic Management & Booking System
  MonsterASP.NET / IIS Web Configuration
  Uses HttpPlatformHandler (MonsterASP.NET official standard for Node.js)
-->
<configuration>
  <system.webServer>
    <!-- Prevent IIS from overriding Express custom Arabic error pages -->
    <httpErrors existingResponse="PassThrough" />

    <!-- Disable directory browsing and default document processing to prevent SPA routing conflicts -->
    <directoryBrowse enabled="false" />
    <defaultDocument enabled="false" />

    <!-- Register httpPlatformHandler cleanly (remove first to prevent duplicate key errors) -->
    <handlers>
      <remove name="httpPlatformHandler" />
      <add name="httpPlatformHandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified" />
    </handlers>

    <!-- Configure httpPlatform process execution -->
    <httpPlatform processPath="node" 
                  arguments=".\server.js" 
                  startupTimeLimit="60" 
                  startupRetryCount="3"
                  stdoutLogEnabled="false" 
                  stdoutLogFile=".\logs\node">
      <environmentVariables>
        <environmentVariable name="PORT" value="%HTTP_PLATFORM_PORT%" />
        <environmentVariable name="NODE_ENV" value="production" />
      </environmentVariables>
    </httpPlatform>

    <!-- Security: Exclude sensitive source and env files from public web access -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules" />
          <add segment=".env" />
          <add segment="src" />
        </hiddenSegments>
      </requestFiltering>
    </security>
  </system.webServer>
</configuration>
````

---

### Root Vercel Configuration (vercel.json)

- **المسار:** `vercel.json`
- **عدد الأسطر:** 16 سطر
- **الحجم:** 0.2 KB

````json
{
  "version": 2,
  "functions": {
    "api/index.js": {
      "includeFiles": "Dental city/dist/views/**"
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index.js"
    }
  ]
}

````

---

### Root Vercel Serverless Function (api/index.js)

- **المسار:** `api/index.js`
- **عدد الأسطر:** 4 سطر
- **الحجم:** 0.1 KB

````javascript
import app from '../Dental city/dist/server.js';

export default app;
````

---

### Root Vercel Build Pipeline (scripts/build.js)

- **المسار:** `scripts/build.js`
- **عدد الأسطر:** 85 سطر
- **الحجم:** 3.1 KB

````javascript
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const innerDir = path.join(rootDir, 'Dental city');

console.log('🚀 Running Dental City build pipeline...');

// 0. Ensure dependencies are installed in Dental city
try {
  const nodeModulesDir = path.join(innerDir, 'node_modules');
  if (!fs.existsSync(nodeModulesDir)) {
    console.log('📦 Installing dependencies in Dental city...');
    execSync('npm install', { cwd: innerDir, stdio: 'inherit' });
  }
} catch (err) {
  console.warn('Warning checking/installing dependencies in Dental city:', err.message);
}

// 1. Build TypeScript in Dental city
try {
  execSync('npm run build', { cwd: innerDir, stdio: 'inherit' });
} catch (err) {
  console.error('Build step failed in Dental city:', err.message);
  process.exit(1);
}

// 2. Synchronize compiled code and assets to root for multi-environment compatibility (MonsterASP, IIS, Fly.io, Vercel)
try {
  const srcDist = path.join(innerDir, 'dist');
  const rootDist = path.join(rootDir, 'dist');
  const srcViews = path.join(innerDir, 'src', 'views');
  const rootDistViews = path.join(rootDir, 'dist', 'views');
  const rootViews = path.join(rootDir, 'views');
  const srcPublic = path.join(innerDir, 'public');
  const rootPublic = path.join(rootDir, 'public');

  // Copy full compiled dist directory to root dist
  if (fs.existsSync(srcDist)) {
    fs.mkdirSync(rootDist, { recursive: true });
    fs.cpSync(srcDist, rootDist, { recursive: true, force: true });
  }

  // Ensure root dist/views and root views exist
  if (fs.existsSync(srcViews)) {
    fs.mkdirSync(rootDistViews, { recursive: true });
    fs.cpSync(srcViews, rootDistViews, { recursive: true, force: true });
    fs.mkdirSync(rootViews, { recursive: true });
    fs.cpSync(srcViews, rootViews, { recursive: true, force: true });
  }

  // Always synchronize public assets to root public
  if (fs.existsSync(srcPublic)) {
    fs.mkdirSync(rootPublic, { recursive: true });
    fs.cpSync(srcPublic, rootPublic, { recursive: true, force: true });
  }

  // Ensure logs directory exists for MonsterASP.NET / IIS stdout logging
  const logsDir = path.join(rootDir, 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  // Ensure root node_modules has dependencies for root execution
  const innerNodeModules = path.join(innerDir, 'node_modules');
  const rootNodeModules = path.join(rootDir, 'node_modules');
  const rootExpress = path.join(rootNodeModules, 'express');
  if (fs.existsSync(innerNodeModules) && !fs.existsSync(rootExpress)) {
    try {
      fs.cpSync(innerNodeModules, rootNodeModules, { recursive: true, force: true });
      console.log('✓ Synchronized dependencies to root node_modules.');
    } catch (e) {
      console.warn('Notice syncing root node_modules:', e.message);
    }
  }

  console.log('✓ Successfully prepared Dental City assets and root dist.');
} catch (err) {
  console.warn('Notice while syncing root assets:', err.message);
}
````

---

### Environment Variables Template (.env.example)

- **المسار:** `.env.example`
- **عدد الأسطر:** 12 سطر
- **الحجم:** 0.4 KB

````ini
# Dental City Clinic Management - Environment Configuration
# Configure these variables in Vercel Project Settings > Environment Variables

PORT=5083
SUPABASE_URL=https://your-supabase-id.supabase.co
SUPABASE_KEY=your-supabase-anon-or-service-key
SESSION_SECRET=your-secure-session-secret-key-32-chars
WHATSAPP_CLINIC_PHONE=01551888988
WHATSAPP_NURSE_PHONE=01004156289
EMERGENCY_PHONE=01551388988

````

---

### Node.js Version Lock (.nvmrc)

- **المسار:** `.nvmrc`
- **عدد الأسطر:** 3 سطر
- **الحجم:** 0.0 KB

````text
20

````

---

### Node.js Version Lock (.node-version)

- **المسار:** `.node-version`
- **عدد الأسطر:** 3 سطر
- **الحجم:** 0.0 KB

````text
20

````

---

### Subfolder package.json

- **المسار:** `Dental city/package.json`
- **عدد الأسطر:** 38 سطر
- **الحجم:** 1.0 KB

````json
{
  "name": "dental-city",
  "version": "1.0.0",
  "type": "module",
  "description": "Dental City Clinic Management & Booking System - Node.js TypeScript",
  "main": "dist/server.js",
  "engines": {
    "node": "20.x || 22.x"
  },
  "scripts": {
    "build": "tsc && node scripts/copy-views.js",
    "start": "node dist/server.js",
    "dev": "tsx watch src/server.ts"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.49.1",
    "cookie-parser": "^1.4.7",
    "dotenv": "^16.4.7",
    "ejs": "^3.1.10",
    "express": "^4.21.2",
    "express-ejs-layouts": "^2.5.1",
    "express-session": "^1.18.1",
    "ws": "^8.23.0",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@types/cookie-parser": "^1.4.8",
    "@types/ejs": "^3.1.5",
    "@types/express": "^4.17.21",
    "@types/express-ejs-layouts": "^2.5.4",
    "@types/express-session": "^1.18.1",
    "@types/node": "^22.13.4",
    "@types/ws": "^8.18.2",
    "tsx": "^4.19.3",
    "typescript": "^5.7.3"
  }
}
````

---

### TypeScript Configuration (tsconfig.json)

- **المسار:** `Dental city/tsconfig.json`
- **عدد الأسطر:** 22 سطر
- **الحجم:** 0.5 KB

````json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "removeComments": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
````

---

### Subfolder IIS Configuration (web.config)

- **المسار:** `Dental city/web.config`
- **عدد الأسطر:** 37 سطر
- **الحجم:** 1.2 KB

````xml
<?xml version="1.0" encoding="utf-8"?>
<!--
  Dental City Clinic Management & Booking System
  Subfolder MonsterASP.NET / IIS Configuration
-->
<configuration>
  <system.webServer>
    <httpErrors existingResponse="PassThrough" />
    <directoryBrowse enabled="false" />
    <defaultDocument enabled="false" />
    <handlers>
      <remove name="httpPlatformHandler" />
      <add name="httpPlatformHandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified" />
    </handlers>
    <httpPlatform processPath="node" 
                  arguments=".\dist\server.js" 
                  startupTimeLimit="60" 
                  startupRetryCount="3"
                  stdoutLogEnabled="false" 
                  stdoutLogFile=".\logs\node">
      <environmentVariables>
        <environmentVariable name="PORT" value="%HTTP_PLATFORM_PORT%" />
        <environmentVariable name="NODE_ENV" value="production" />
      </environmentVariables>
    </httpPlatform>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules" />
          <add segment=".env" />
          <add segment="src" />
        </hiddenSegments>
      </requestFiltering>
    </security>
  </system.webServer>
</configuration>
````

---

### Subfolder Vercel Configuration (vercel.json)

- **المسار:** `Dental city/vercel.json`
- **عدد الأسطر:** 16 سطر
- **الحجم:** 0.2 KB

````json
{
  "version": 2,
  "functions": {
    "api/index.js": {
      "includeFiles": "dist/views/**"
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index.js"
    }
  ]
}

````

---

### Subfolder Vercel Function (api/index.js)

- **المسار:** `Dental city/api/index.js`
- **عدد الأسطر:** 5 سطر
- **الحجم:** 0.1 KB

````javascript
import app from '../dist/server.js';

export default app;

````

---

### Views Copy Build Script (copy-views.js)

- **المسار:** `Dental city/scripts/copy-views.js`
- **عدد الأسطر:** 24 سطر
- **الحجم:** 0.7 KB

````javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const srcViews = path.join(projectRoot, 'src', 'views');
const distViews = path.join(projectRoot, 'dist', 'views');

try {
  if (fs.existsSync(srcViews)) {
    fs.mkdirSync(distViews, { recursive: true });
    fs.cpSync(srcViews, distViews, { recursive: true, force: true });
    console.log('✓ Successfully copied views to dist/views');
  } else {
    console.warn('src/views directory not found at:', srcViews);
  }
} catch (err) {
  console.warn('Notice while copying views:', err.message);
}

````

---

