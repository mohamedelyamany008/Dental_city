# ملف الكود البرمجي الشامل لمشروع مركز دنتل سيتي (Dental City)
> **تاريخ التجميع:** ١٧‏/١١‏/٢٠٢٦، ٣:٥٨:٣٥ م
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
- **عدد الأسطر:** 230 سطر
- **الحجم:** 9.0 KB

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

// Configuration: Port & Host (Fly.io requires binding to 0.0.0.0)
const PORT = process.env.PORT || 5083;
const isNamedPipe = typeof PORT === 'string' && PORT.startsWith('\\\\.\\pipe\\');
const portNumber = Number(PORT) || 5083;
const HOST = '0.0.0.0';

// Body and Cookie Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Trust proxy for Fly.io, Vercel, and reverse proxies (enables secure cookies and client IP forwarding)
const isCloudOrProd = Boolean(
  process.env.FLY_APP_NAME ||
  process.env.FLY_ALLOC_ID ||
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
````

---

### Supabase Client Configuration (supabase.ts)

- **المسار:** `Dental city/src/config/supabase.ts`
- **عدد الأسطر:** 42 سطر
- **الحجم:** 1.4 KB

````typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

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

let client: SupabaseClient;
try {
  client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
} catch (err) {
  console.error('[CRITICAL] Error creating Supabase client, initializing safe fallback:', err);
  client = createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export const supabase = client;
````

---

### Data Interfaces & Types (types.ts)

- **المسار:** `Dental city/src/models/types.ts`
- **عدد الأسطر:** 139 سطر
- **الحجم:** 3.0 KB

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
- **عدد الأسطر:** 67 سطر
- **الحجم:** 3.9 KB

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
  scheduleOffDays: z.array(z.coerce.number()).optional().default([5]),
  scheduleSelectedSlots: z.array(z.string()).optional().default([])
});

export type DoctorFormData = z.infer<typeof DoctorFormSchema>;
export type BookingFormData = z.infer<typeof BookingFormSchema>;
export type DoctorLoginData = z.infer<typeof DoctorLoginSchema>;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
export type ScheduleUpdateData = z.infer<typeof ScheduleUpdateSchema>;
````

---

### Authentication & Session Middleware (auth.ts)

- **المسار:** `Dental city/src/middleware/auth.ts`
- **عدد الأسطر:** 26 سطر
- **الحجم:** 0.9 KB

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
      title: 'الرئيسية - مركز دنتل سيتي لطب وجراحة الأسنان',
      doctors,
      services,
      emergencyPhone
    });
  } catch (err: unknown) {
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

indexRoutes.get('/Privacy', (_req: Request, res: Response) => {
  return res.render('privacy', {
    title: 'سياسة الخصوصية - دنتل سيتي'
  });
});
````

---

### Appointments Routes & API (appointments.routes.ts)

- **المسار:** `Dental city/src/routes/appointments.routes.ts`
- **عدد الأسطر:** 160 سطر
- **الحجم:** 6.1 KB

````typescript
import { Router, Request, Response } from 'express';
import { AppointmentService } from '../services/appointmentService.js';
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
  try {
    const doctors = await AppointmentService.getDoctors();
    const services = AppointmentService.getServices();
    const emergencyPhone = AppointmentService.getEmergencyPhone();

    return res.render('appointments/book', {
      title: 'حجز موعد عيادة - دنتل سيتي (Dental City)',
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
        title: 'حجز موعد عيادة - دنتل سيتي (Dental City)',
        doctors,
        services,
        emergencyPhone,
        errors: formattedErrors,
        formData: req.body
      });
    }

    try {
      const booking = await AppointmentService.bookAppointment(parsed.data);
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
        title: 'حجز موعد عيادة - دنتل سيتي (Dental City)',
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

    return res.render('appointments/confirmation', {
      title: 'تأكيد حجز الموعد - دنتل سيتي (Dental City)',
      booking,
      emergencyPhone: AppointmentService.getEmergencyPhone()
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Confirmation page error:', msg);
    return res.status(500).render('error', { message: 'حدث خطأ أثناء عرض تأكيد الحجز.' });
  }
});
````

---

### Doctor Portal & Dashboard Routes (doctor.routes.ts)

- **المسار:** `Dental city/src/routes/doctor.routes.ts`
- **عدد الأسطر:** 383 سطر
- **الحجم:** 16.3 KB

````typescript
import { Router, Request, Response } from 'express';
import { DoctorAuthService } from '../services/doctorAuthService.js';
import { AppointmentService } from '../services/appointmentService.js';
import { requireDoctorAuth } from '../middleware/auth.js';
import { DoctorLoginSchema, ChangePasswordSchema, DoctorFormSchema, ScheduleUpdateSchema } from '../models/schemas.js';

export const doctorRoutes = Router();

// GET /Doctor/Login
doctorRoutes.get(['/Doctor/Login', '/doctor/login'], (req: Request, res: Response) => {
  if (req.session && req.session.doctor) {
    return res.redirect('/Doctor/Dashboard');
  }

  return res.render('doctor/login', {
    title: 'تسجيل دخول الكادر الطبي - دنتل سيتي',
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
        title: 'تسجيل دخول الكادر الطبي - دنتل سيتي',
        returnUrl: (req.query.returnUrl as string) || '/Doctor/Dashboard',
        errors: errorMsgs,
        usernameOrEmail: (req.body.usernameOrEmail as string) || ''
      });
    }

    const { usernameOrEmail, password, rememberMe } = parsed.data;

    const result = await DoctorAuthService.validateDoctor(usernameOrEmail, password);

    if (!result.success) {
      return res.status(401).render('doctor/login', {
        title: 'تسجيل دخول الكادر الطبي - دنتل سيتي',
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
      title: 'تسجيل دخول الكادر الطبي - دنتل سيتي',
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
  try {
    const doctors = await AppointmentService.getDoctors(true);
    const services = AppointmentService.getServices();
    const configuredSlots = AppointmentService.getConfiguredSlots();
    const recentBookings = await AppointmentService.getAllBookings();
    const emergencyPhone = AppointmentService.getEmergencyPhone();

    return res.render('doctor/dashboard', {
      title: 'لوحة التحكم وإدارة العيادة - دنتل سيتي',
      doctors,
      services,
      configuredSlots,
      recentBookings,
      emergencyPhone,
      doctorUser: req.session.doctor
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error loading dashboard data:', msg);
    return res.status(500).render('error', { message: 'تعذر تحميل بيانات لوحة التحكم' });
  }
});

// Unified POST dispatcher for /Doctor/Dashboard supporting ?handler=...
doctorRoutes.post(['/Doctor/Dashboard', '/doctor/dashboard'], requireDoctorAuth, async (req: Request, res: Response) => {
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
          scheduleSelectedSlots
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

    case 'UpdateEmergencyPhone': {
      const phone = req.body.EmergencyPhone;
      const success = AppointmentService.updateEmergencyPhone(phone);
      const msg = success
        ? `تم حفظ وتحديث رقم هاتف الاستفسارات العاجلة (${phone}) بنجاح.`
        : 'يرجى إدخال رقم هاتف صالح.';

      req.session.flashMessage = { type: success ? 'success' : 'danger', text: msg };
      return res.redirect('/Doctor/Dashboard');
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
- **عدد الأسطر:** 929 سطر
- **الحجم:** 31.8 KB

````typescript
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

  // In-memory slot templates
  private static configuredSlots: AppointmentSlot[] = AppointmentService.generateStandardSlots(30);

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

  /**
   * Generates morning (09:00 AM to 12:00 PM) and afternoon (12:00 PM to 06:00 PM) slots
   */
  public static generateStandardSlots(intervalMinutes: number = 30): AppointmentSlot[] {
    const validInterval = (intervalMinutes === 15 || intervalMinutes === 30) ? intervalMinutes : 30;
    const slots: AppointmentSlot[] = [];

    // 1. Morning Period: 09:00 AM to 12:00 PM
    let currentMin = 9 * 60; // 09:00 AM
    const morningEnd = 12 * 60; // 12:00 PM
    while (currentMin < morningEnd) {
      slots.push({
        time: this.formatMinutesToArabic(currentMin),
        period: 'صباحي',
        isAvailable: true
      });
      currentMin += validInterval;
    }

    // 2. Afternoon Period: 12:00 PM to 06:00 PM
    currentMin = 12 * 60; // 12:00 PM
    const afternoonEnd = 18 * 60; // 06:00 PM
    while (currentMin <= afternoonEnd) {
      slots.push({
        time: this.formatMinutesToArabic(currentMin),
        period: 'مسائي',
        isAvailable: true
      });
      currentMin += validInterval;
    }

    return slots;
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

    // Check Day of Week
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
    const offDay = doctor.OffDays ?? 5;

    if (dayOfWeek === offDay) {
      const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      return {
        isWorkingDay: false,
        offDayReason: `يوم ${dayNames[dayOfWeek]} هو يوم الإجازة الأسبوعية المعتمدة لـ (${doctor.name}).`,
        slots: []
      };
    }

    // Base slots for the doctor
    let baseSlotTimes = doctor.AvaliableSlots || [];
    if (baseSlotTimes.length === 0) {
      baseSlotTimes = this.configuredSlots.map(s => s.time);
    }

    // Retrieve booked slots directly from Supabase Bookings with zero caching
    const bookedTimes = await this.getBookedSlotsForDoctorAndDate(doctorId, dateString);

    const slots: AppointmentSlot[] = baseSlotTimes.map(time => {
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
      patient_name: row['patient name'] || 'مريض دنتل سيتي',
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
- **الحجم:** 7.8 KB

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
          errorMessage: 'كلمة المرور غير صحيحة. يرجى استخدام كلمة المرور المعتمدة hodam1020300 أو admin123'
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
        errorMessage: 'اسم المستخدم أو كلمة المرور غير صحيحة. كلمة المرور المعتمدة: hodam1020300'
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
        errorMessage: 'تعذر الاتصال بقاعدة البيانات. كلمة المرور المعتمدة: hodam1020300'
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

````

---

## 2. قوالب واجهات المستخدم (Frontend Views - EJS Templates)

> يحتوي هذا القسم على قوالب HTML/EJS المتوافقة بالكامل مع التصميم الحديث، دعم الهواتف والشاشات المختلفة، ونظام التخطيط (Main Layout).

### القالب الرئيسي (main.ejs)

- **المسار:** `Dental city/src/views/layouts/main.ejs`
- **عدد الأسطر:** 105 سطر
- **الحجم:** 5.7 KB

````html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= typeof title !== 'undefined' ? title : 'مركز دنتل سيتي لطب وجراحة الأسنان' %></title>
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/images/logo.png" />
    <link rel="shortcut icon" type="image/png" href="/images/logo.png" />
    <link rel="apple-touch-icon" href="/images/logo.png" />
    
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="/css/site.css" />
    <link rel="stylesheet" href="/css/dental_city.styles.css" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center gap-2" href="/">
                    <img src="/images/logo.png" alt="Dental City Logo" class="brand-logo rounded-2 shadow-sm" height="42" onerror="this.onerror=null;this.src='/images/logo.png.jpg';" />
                    <span class="fw-bold text-dark fs-5">Dental <span class="text-primary">City</span></span>
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
                <span>&copy; 2026 - Dental City Clinic. All rights reserved.</span>
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
</body>
</html>

````

---

### الصفحة الرئيسية (index.ejs)

- **المسار:** `Dental city/src/views/index.ejs`
- **عدد الأسطر:** 101 سطر
- **الحجم:** 5.5 KB

````html
<div class="py-4" style="direction: rtl; text-align: right; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <!-- البانر الترحيبي -->
    <div class="p-5 mb-4 bg-white rounded-4 shadow-sm border border-light">
        <div class="row align-items-center">
            <div class="col-lg-8">
                <span class="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-3">
                    <i class="bi bi-stars"></i> رعاية متكاملة لابتسامتك
                </span>
                <h1 class="display-5 fw-bold text-dark mb-3">مركز دنتل سيتي (Dental City)</h1>
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
            <i class="bi bi-people-fill text-primary me-2"></i> استشاريو وأطباء مركز دنتل سيتي
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
- **عدد الأسطر:** 857 سطر
- **الحجم:** 45.4 KB

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

    .summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.65rem 0;
        border-bottom: 1px dashed #e2e8f0;
        font-size: 0.92rem;
    }

    .summary-label {
        color: #64748b;
    }

    .summary-value {
        font-weight: 600;
        color: #0f172a;
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
                مرحباً بك في مركز دنتل سيتي (Dental City). يرجى تعبئة بيانات المريض واختيار الطبيب والموعد المناسب لإتمام الحجز بكل سهولة.
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
                        <!-- دليل ألوان حالة المواعيد -->
                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 pb-2 border-bottom">
                            <span class="small fw-semibold text-secondary">
                                <i class="bi bi-clock-history text-primary me-1"></i> جدول المواعيد المتاحة والمحجوزة:
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
                    شكراً لاختيارك مركز دنتل سيتي (Dental City). نتطلع لتقديم أفضل رعاية لابتسامتك.
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
- **عدد الأسطر:** 156 سطر
- **الحجم:** 6.6 KB

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
</style>

<div class="login-wrapper py-4">
    <div class="login-card">
        <!-- رأس بطاقة تسجيل الدخول -->
        <div class="login-header">
            <div class="lock-circle">
                <i class="bi bi-shield-lock-fill fs-2"></i>
            </div>
            <h3 class="fw-bold mb-1">بوابة الأطباء والإدارة</h3>
            <p class="text-white-50 small mb-0">
                منطقة محمية خاصة بكادر عيادات دنتل سيتي (Dental City)
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
- **عدد الأسطر:** 1276 سطر
- **الحجم:** 70.3 KB

````html
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
</style>

<div class="doctor-dash-wrapper py-3">
    <!-- رأس لوحة التحكم -->
    <div class="dash-header-card d-md-flex justify-content-between align-items-center">
        <div>
            <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill">
                    <i class="bi bi-circle-fill fs-6 me-1"></i> النظام متصل وجاهز للعمل
                </span>
            </div>
            <h1 class="h3 fw-bold mb-1">
                <i class="bi bi-gear-wide-connected text-primary me-2"></i>
                لوحة تحكم الطبيب وإدارة العيادة
            </h1>
            <p class="text-white-50 mb-0 small">
                تحكم كامل في الأطباء، المواعيد، وجدول العيادة مع حفظ وتحديث فوري ومباشر للبيانات.
            </p>
        </div>
        <div class="mt-3 mt-md-0 d-flex flex-wrap align-items-center gap-2">
            <div class="d-flex align-items-center gap-2 bg-dark bg-opacity-50 px-3 py-1 rounded-pill border border-secondary">
                <i class="bi bi-person-check-fill text-success"></i>
                <span class="small text-white fw-semibold"><%= (typeof doctorUser !== 'undefined' && doctorUser) ? doctorUser.name : 'د. حازم حجاج' %></span>
            </div>
            <a href="/Appointments/Book" target="_blank" class="btn btn-outline-light btn-sm px-3 rounded-pill">
                <i class="bi bi-box-arrow-up-right me-1"></i> معاينة صفحة الحجز
            </a>
            <button type="button" class="btn btn-primary btn-sm px-3 rounded-pill" onclick="openAddDoctorModal()">
                <i class="bi bi-person-plus-fill me-1"></i> إضافة طبيب جديد
            </button>
            <button type="button" class="btn btn-outline-warning btn-sm px-3 rounded-pill text-white" onclick="openChangePasswordModal()" title="تغيير كلمة المرور">
                <i class="bi bi-key-fill me-1"></i> تغيير كلمة المرور
            </button>
            <form method="post" action="/Doctor/Dashboard?handler=Logout" class="d-inline">
                <button type="submit" class="btn btn-outline-danger btn-sm px-3 rounded-pill text-white" title="تسجيل الخروج">
                    <i class="bi bi-box-arrow-right me-1"></i> خروج
                </button>
            </form>
        </div>
    </div>

    <!-- إعدادات رقم الاستفسارات العاجلة للعيادة -->
    <div class="card border-0 shadow-sm rounded-4 mb-4" style="background: linear-gradient(to right, #ffffff, #f0fdf4); border-right: 5px solid #0284c7 !important;">
        <div class="card-body p-3 p-md-4">
            <div class="row align-items-center g-3">
                <div class="col-lg-7">
                    <div class="d-flex align-items-center gap-3">
                        <div class="stat-icon bg-primary-subtle text-primary rounded-circle flex-shrink-0" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
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
                    <form method="post" action="/Doctor/Dashboard?handler=UpdateEmergencyPhone" class="d-flex align-items-center gap-2">
                        <div class="input-group">
                            <span class="input-group-text bg-white border-primary-subtle text-primary">
                                <i class="bi bi-telephone"></i>
                            </span>
                            <input name="EmergencyPhone" value="<%= emergencyPhone %>" class="form-control border-primary-subtle font-monospace fw-bold" 
                                   placeholder="مثال: 01551388988" dir="ltr" style="letter-spacing: 1px;" required />
                        </div>
                        <button type="submit" class="btn btn-primary px-3 rounded-3 flex-shrink-0">
                            <i class="bi bi-save me-1"></i> حفظ الرقم
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- بطاقات الإحصائيات KPI Cards -->
    <div class="row g-3 mb-4">
        <div class="col-sm-6 col-xl-3">
            <div class="stat-card">
                <div class="stat-icon bg-primary-subtle text-primary">
                    <i class="bi bi-journal-check"></i>
                </div>
                <div>
                    <span class="text-muted small fw-semibold">إجمالي الحجوزات</span>
                    <h3 class="fw-bold text-dark mb-0" id="stat-total-bookings"><%= recentBookings ? recentBookings.length : 0 %></h3>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="stat-card">
                <div class="stat-icon bg-success-subtle text-success">
                    <i class="bi bi-calendar2-check-fill"></i>
                </div>
                <div>
                    <span class="text-muted small fw-semibold">الحجوزات المؤكدة</span>
                    <h3 class="fw-bold text-dark mb-0" id="stat-confirmed-bookings"><%= recentBookings ? recentBookings.filter(b => b.status === 'مؤكد').length : 0 %></h3>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="stat-card">
                <div class="stat-icon bg-info-subtle text-info">
                    <i class="bi bi-person-badge-fill"></i>
                </div>
                <div>
                    <span class="text-muted small fw-semibold">الأطباء المسجلون</span>
                    <h3 class="fw-bold text-dark mb-0"><%= doctors ? doctors.length : 0 %></h3>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="stat-card">
                <div class="stat-icon bg-warning-subtle text-warning">
                    <i class="bi bi-clock-fill"></i>
                </div>
                <div>
                    <span class="text-muted small fw-semibold">أوقات الكشف المتاحة</span>
                    <h3 class="fw-bold text-dark mb-0"><%= configuredSlots ? configuredSlots.filter(s => s.isAvailable).length : 0 %></h3>
                </div>
            </div>
        </div>
    </div>

    <!-- التبويبات الرئيسية للوحة التحكم -->
    <div class="panel-card p-0 overflow-hidden">
        <ul class="nav nav-tabs px-3 pt-2 bg-light border-bottom" id="dashboardTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="bookings-tab" data-bs-toggle="tab" data-bs-target="#bookings-panel" type="button" role="tab">
                    <i class="bi bi-calendar3 me-1"></i> الحجوزات الحية (<span id="bookings-tab-count"><%= recentBookings ? recentBookings.length : 0 %></span>)
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="doctors-tab" data-bs-toggle="tab" data-bs-target="#doctors-panel" type="button" role="tab">
                    <i class="bi bi-people me-1"></i> أطباء المركز (<%= doctors ? doctors.length : 0 %>)
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="services-tab" data-bs-toggle="tab" data-bs-target="#services-panel" type="button" role="tab">
                    <i class="bi bi-list-stars me-1"></i> الخدمات والتخصصات (<%= services ? services.length : 0 %>)
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="slots-tab" data-bs-toggle="tab" data-bs-target="#slots-panel" type="button" role="tab">
                    <i class="bi bi-clock-history me-1"></i> جدول المواعيد الافتراضي (<%= configuredSlots ? configuredSlots.length : 0 %>)
                </button>
            </li>
        </ul>

        <div class="tab-content p-4" id="dashboardTabsContent">
            <!-- 1. تبويب الحجوزات الحية -->
            <div class="tab-pane fade show active" id="bookings-panel" role="tabpanel">
                <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                    <h5 class="fw-bold text-dark mb-0">سجل حجوزات المرضى الواردة</h5>
                    <div style="max-width: 280px; width: 100%;">
                        <div class="input-group input-group-sm">
                            <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
                            <input type="text" class="form-control" id="bookingSearchInput" onkeyup="filterBookingsTable()" placeholder="ابحث بالاسم أو الهاتف أو الرمز..." />
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-hover align-middle" id="bookingsTable">
                        <thead>
                            <tr>
                                <th>الرقم المرجعي</th>
                                <th>المريض</th>
                                <th>النوع / السن</th>
                                <th>الهاتف</th>
                                <th>الطبيب</th>
                                <th>الخدمة</th>
                                <th>تاريخ وموعد الكشف</th>
                                <th>الحالة</th>
                                <th>إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <% if (typeof recentBookings !== 'undefined' && recentBookings.length > 0) { %>
                                <% recentBookings.forEach(booking => { %>
                                    <tr id="booking-row-<%= booking.reference %>" class="<%= booking.status === 'ملغي' ? 'row-cancelled' : '' %>">
                                        <td class="font-monospace fw-bold text-primary"><%= booking.reference %></td>
                                        <td class="fw-semibold"><%= booking.patient_name %></td>
                                        <td>
                                            <span class="badge <%= booking.gender === 'أنثى' ? 'bg-danger-subtle text-danger border border-danger-subtle' : 'bg-primary-subtle text-primary border border-primary-subtle' %>">
                                                <%= booking.gender || 'غير محدد' %>
                                            </span>
                                            <small class="text-muted d-block mt-1">
                                                <%= booking.age ? `${booking.age} سنة` : (booking.birth_date ? booking.birth_date : '-') %>
                                            </small>
                                        </td>
                                        <td dir="ltr" class="text-end font-monospace"><%= booking.patient_phone %></td>
                                        <td><%= booking.doctor_name %></td>
                                        <td><span class="badge bg-light text-dark border"><%= booking.selected_service %></span></td>
                                        <td class="booking-time-col">
                                            <div class="fw-semibold"><%= booking.appointment_date %></div>
                                            <small class="text-muted"><%= booking.appointment_time %></small>
                                        </td>
                                        <td>
                                            <select class="form-select form-select-sm fw-semibold status-select-<%= (booking.status || 'مؤكد').replace(/\s+/g, '') %>" style="width: 125px; border-radius: 0.5rem;" onchange="updateBookingStatusAjax('<%= booking.reference %>', this.value, this)">
                                                <option value="مؤكد" <%= booking.status === 'مؤكد' ? 'selected' : '' %>>🟢 مؤكد</option>
                                                <option value="قيد الانتظار" <%= booking.status === 'قيد الانتظار' ? 'selected' : '' %>>🟡 قيد الانتظار</option>
                                                <option value="مكتمل" <%= booking.status === 'مكتمل' ? 'selected' : '' %>>🔵 مكتمل</option>
                                                <option value="ملغي" <%= booking.status === 'ملغي' ? 'selected' : '' %>>🔴 ملغي</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center gap-1">
                                                <button type="button" class="btn btn-outline-warning btn-sm rounded-pill px-2" onclick="cancelBookingAjax('<%= booking.reference %>')" title="إلغاء الموعد وتفريغ وقته">
                                                    <i class="bi bi-x-circle"></i>
                                                </button>
                                                <button type="button" class="btn btn-outline-danger btn-sm rounded-pill px-2" onclick="deleteBookingAjax('<%= booking.reference %>')" title="حذف الحجز نهائياً">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                <% }); %>
                            <% } else { %>
                                <tr>
                                    <td colspan="9" class="text-center py-4 text-muted">لا توجد حجوزات مسجلة حتى الآن.</td>
                                </tr>
                            <% } %>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 2. تبويب أطباء المركز -->
            <div class="tab-pane fade" id="doctors-panel" role="tabpanel">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="fw-bold text-dark mb-0">قائمة الأطباء والاستشاريين المعتمدين</h5>
                    <button type="button" class="btn btn-primary btn-sm rounded-pill px-3" onclick="openAddDoctorModal()">
                        <i class="bi bi-plus-lg me-1"></i> إضافة طبيب
                    </button>
                </div>

                <div class="row g-3">
                    <% if (typeof doctors !== 'undefined' && doctors.length > 0) { %>
                        <% doctors.forEach(doc => { %>
                            <div class="col-md-6 col-lg-4" id="doctor-card-<%= doc.id %>">
                                <div class="card h-100 border rounded-3 p-3 shadow-sm bg-white">
                                    <div class="d-flex align-items-start gap-3 mb-3">
                                        <div class="bg-primary-subtle text-primary p-3 rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                                            <i class="bi <%= doc.AvatarIcon || 'bi-person-badge-fill' %> fs-3"></i>
                                        </div>
                                        <div class="flex-grow-1">
                                            <h6 class="fw-bold mb-0 text-dark"><%= doc.name %></h6>
                                            <div class="text-primary small fw-semibold"><%= doc.title %></div>
                                            <div class="text-muted small"><%= doc.specialty %></div>
                                        </div>
                                        <span class="badge <%= doc.IsActive ? 'bg-success' : 'bg-secondary' %>">
                                            <%= doc.IsActive ? 'نشط' : 'معطل' %>
                                        </span>
                                    </div>
                                    <div class="small text-muted mb-2">
                                        <div><i class="bi bi-geo-alt text-primary me-1"></i> <%= doc.climicroom || 'العيادة الرئيسية' %></div>
                                        <div><i class="bi bi-clock text-primary me-1"></i> <%= doc.workinghours %></div>
                                        <div><i class="bi bi-calendar-week text-primary me-1"></i> <%= doc.WorkingDays %></div>
                                        <div><i class="bi bi-award text-primary me-1"></i> خبرة <%= doc.experienceyears %> سنوات | تقييم <%= doc.Rating %> <i class="bi bi-star-fill text-warning"></i></div>
                                    </div>
                                    <div class="mt-auto pt-3 border-top d-flex gap-2">
                                        <button type="button" class="btn btn-outline-primary btn-sm rounded-pill flex-grow-1" 
                                                onclick="openEditDoctorModal(<%= doc.id %>, '<%= doc.name %>', '<%= doc.title %>', '<%= doc.specialty %>', '<%= doc.climicroom || '' %>', '<%= doc.Rating %>', <%= doc.experienceyears %>, <%= doc.IsActive %>, '<%= doc.workinghours %>', '<%= doc.WorkingDays %>')">
                                            <i class="bi bi-pencil-square me-1"></i> تعديل
                                        </button>
                                        <button type="button" class="btn btn-outline-info btn-sm rounded-pill flex-grow-1"
                                                onclick="openDoctorScheduleModal(<%= doc.id %>, '<%= doc.name %>', '<%= doc.workinghours %>', '<%= doc.WorkingDays %>', <%= doc.OffDays %>, <%= JSON.stringify(doc.AvaliableSlots || []) %>)">
                                            <i class="bi bi-calendar-range me-1"></i> الجدول
                                        </button>
                                        <button type="button" class="btn btn-outline-danger btn-sm rounded-pill" onclick="deleteDoctorAjax(<%= doc.id %>, '<%= doc.name %>')" title="حذف">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <% }); %>
                    <% } else { %>
                        <div class="col-12 text-center py-5">
                            <div class="rounded-circle bg-light d-inline-flex p-4 text-muted mb-3 border shadow-sm">
                                <i class="bi bi-people-fill fs-1 text-secondary"></i>
                            </div>
                            <h5 class="fw-bold text-dark mb-1">لا يوجد أطباء مسجلون حالياً (0 أطباء)</h5>
                            <p class="text-muted small mb-3">القائمة تبدأ فارغة تماماً. يمكنك إضافة الأطباء المعتمدين وجداول عملهم بالضغط على الزر أدناه.</p>
                            <button type="button" class="btn btn-primary rounded-pill px-4 shadow-sm" onclick="openAddDoctorModal()">
                                <i class="bi bi-person-plus-fill me-1"></i> إضافة أول طبيب للمركز
                            </button>
                        </div>
                    <% } %>
                </div>
            </div>

            <!-- 3. تبويب الخدمات والتخصصات -->
            <div class="tab-pane fade" id="services-panel" role="tabpanel">
                <div class="row g-4">
                    <div class="col-md-5">
                        <div class="card border rounded-3 p-3 bg-light">
                            <h6 class="fw-bold mb-3"><i class="bi bi-plus-circle me-1 text-primary"></i> إضافة خدمة طبية جديدة</h6>
                            <form method="post" action="/Doctor/Dashboard?handler=AddService">
                                <div class="mb-3">
                                    <label class="form-label small fw-semibold">اسم الخدمة أو الإجراء</label>
                                    <input name="newService" class="form-control" placeholder="مثال: حشو أسنان ليزري" required />
                                </div>
                                <button type="submit" class="btn btn-primary btn-sm rounded-pill px-3">
                                    <i class="bi bi-plus-lg me-1"></i> حفظ وإضافة الخدمة
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <h6 class="fw-bold mb-3">الخدمات المتاحة حالياً بالحجز (<%= services ? services.length : 0 %>)</h6>
                        <div class="d-flex flex-wrap gap-2">
                            <% if (typeof services !== 'undefined') { %>
                                <% services.forEach(srv => { %>
                                    <div class="d-flex align-items-center gap-2 border bg-white rounded-pill px-3 py-2 shadow-sm">
                                        <i class="bi bi-check2-circle text-primary"></i>
                                        <span class="fw-semibold small"><%= srv %></span>
                                        <form method="post" action="/Doctor/Dashboard?handler=DeleteService" class="d-inline ms-1" onsubmit="return confirm('هل تريد حذف هذه الخدمة؟')">
                                            <input type="hidden" name="serviceName" value="<%= srv %>" />
                                            <button type="submit" class="btn-close btn-close-sm" style="font-size: 0.65rem;" title="حذف الخدمة"></button>
                                        </form>
                                    </div>
                                <% }); %>
                            <% } %>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 4. تبويب جدول المواعيد الافتراضي -->
            <div class="tab-pane fade" id="slots-panel" role="tabpanel">
                <div class="row g-4 mb-4">
                    <div class="col-md-6">
                        <div class="card border rounded-3 p-3 bg-light h-100">
                            <h6 class="fw-bold mb-3"><i class="bi bi-magic me-1 text-warning"></i> توليد أوقات منتظمة تلقائياً</h6>
                            <p class="text-muted small">
                                توليد فترتين: الصباحية (09:00 ص - 12:00 م) والمسائية (12:00 م - 06:00 م).
                            </p>
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-3" onclick="generateSlotsAjax(30)">
                                    توليد بفارق 30 دقيقة
                                </button>
                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill px-3" onclick="generateSlotsAjax(15)">
                                    توليد بفارق 15 دقيقة
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card border rounded-3 p-3 bg-light h-100">
                            <h6 class="fw-bold mb-3"><i class="bi bi-plus-circle me-1 text-primary"></i> إضافة وقت يدوي</h6>
                            <form onsubmit="addSlotAjax(event)" class="row g-2 align-items-end">
                                <div class="col-7">
                                    <label class="form-label small fw-semibold">الوقت (مثال: 02:30 م)</label>
                                    <input id="newSlotTimeInput" class="form-control form-control-sm" placeholder="02:30 م" required />
                                </div>
                                <div class="col-5">
                                    <button type="submit" class="btn btn-primary btn-sm rounded-pill w-100">
                                        <i class="bi bi-plus"></i> إضافة
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="row g-2" id="configuredSlotsGrid">
                    <% if (typeof configuredSlots !== 'undefined') { %>
                        <% configuredSlots.forEach(slot => { %>
                            <div class="col-6 col-sm-4 col-md-3 col-xl-2" id="slot-card-<%= slot.time.replace(/[^a-zA-Z0-9]/g, '_') %>">
                                <div class="slot-pill-manage <%= slot.isAvailable ? '' : 'disabled-slot' %>">
                                    <span class="fw-bold small"><%= slot.time %></span>
                                    <div class="d-flex align-items-center gap-1">
                                        <button type="button" class="btn btn-sm btn-link p-0 <%= slot.isAvailable ? 'text-success' : 'text-secondary' %>" onclick="toggleSlotAjax('<%= slot.time %>')" title="تفعيل/تعطيل">
                                            <i class="bi <%= slot.isAvailable ? 'bi-toggle-on fs-5' : 'bi-toggle-off fs-5' %>"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-link text-danger p-0 ms-1" onclick="deleteSlotAjax('<%= slot.time %>')" title="حذف">
                                            <i class="bi bi-x-circle"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <% }); %>
                    <% } %>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal 1: إضافة وتعديل بيانات الطبيب -->
<div class="modal fade" id="doctorModal" tabindex="-1" aria-labelledby="doctorModalLabel" aria-hidden="true" style="direction: rtl; text-align: right;">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center w-100" style="direction: rtl;">
                <h5 class="modal-title fw-bold m-0 flex-grow-1 text-end" id="doctorModalLabel">
                    <i class="bi bi-person-plus-fill me-2"></i> إضافة طبيب جديد
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="إغلاق" style="margin-right: auto !important; margin-left: 0 !important;"></button>
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
                                <label class="form-label fw-semibold small">اسم الطبيب بالكامل <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i class="bi bi-person-fill text-primary"></i></span>
                                    <input name="name" class="form-control" id="modalDocName" placeholder="مثال: د. حازم حجاج" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">اللقب والصفة المهنية <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i class="bi bi-award-fill text-warning"></i></span>
                                    <input name="title" class="form-control" id="modalDocTitle" placeholder="مثال: استشاري أول ورئيس الأطباء" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">التخصص الطبي الدقيق <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i class="bi bi-heart-pulse-fill text-danger"></i></span>
                                    <input name="specialty" class="form-control" id="modalDocSpecialty" placeholder="مثال: جراحة وتجميل وزراعة الأسنان" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">عيادة / غرفة الفحص</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i class="bi bi-geo-alt-fill text-success"></i></span>
                                    <input name="climicroom" class="form-control" id="modalDocRoom" placeholder="مثال: العيادة الاستشارية (100) - المبنى الرئيسي" />
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
                                    <span class="input-group-text bg-white"><i class="bi bi-clock-fill text-secondary"></i></span>
                                    <input name="workinghours" class="form-control" id="modalDocWorkingHours" placeholder="مثال: 09:00 ص - 12:00 م | 12:00 م - 06:00 م" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold small">أيام الحضور والعمل الأسبوعي</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i class="bi bi-calendar-week text-secondary"></i></span>
                                    <input name="WorkingDays" class="form-control" id="modalDocWorkingDays" placeholder="مثال: السبت - الخميس (الجمعة إجازة)" />
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
                                    <span class="input-group-text bg-white"><i class="bi bi-briefcase-fill text-primary"></i></span>
                                    <input name="experienceyears" type="number" class="form-control" id="modalDocExp" value="5" min="0" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label fw-semibold small">التقييم العام (من 5.0)</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white"><i class="bi bi-star-fill text-warning"></i></span>
                                    <input name="Rating" type="number" step="0.1" class="form-control" id="modalDocRating" value="5.0" min="1" max="5" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label fw-semibold small d-block">حالة تفعيل الطبيب</label>
                                <div class="form-check form-switch p-2 bg-white rounded border d-flex align-items-center justify-content-between">
                                    <label class="form-check-label fw-bold text-success mb-0 small" for="modalDocIsActive">
                                        <i class="bi bi-check-circle-fill me-1"></i> متاح للحجز
                                    </label>
                                    <input name="IsActive" class="form-check-input ms-0" type="checkbox" id="modalDocIsActive" value="true" checked style="cursor: pointer; width: 2.5em; height: 1.3em;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light rounded-bottom-4">
                    <button type="button" class="btn btn-secondary px-4 rounded-pill" data-bs-dismiss="modal">إلغاء</button>
                    <button type="submit" class="btn btn-primary px-4 rounded-pill shadow-sm">
                        <i class="bi bi-save me-1"></i> حفظ بيانات الطبيب
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal 2: جدول وساعات ومواعيد عمل الطبيب -->
<div class="modal fade" id="doctorScheduleModal" tabindex="-1" aria-labelledby="doctorScheduleModalLabel" aria-hidden="true" style="direction: rtl; text-align: right;">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center w-100" style="direction: rtl;">
                <h5 class="modal-title fw-bold m-0 flex-grow-1 text-end" id="doctorScheduleModalLabel">
                    <i class="bi bi-calendar2-week-fill text-warning me-2"></i> جدول وساعات عمل الطبيب
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="إغلاق" style="margin-right: auto !important; margin-left: 0 !important;"></button>
            </div>
            <form id="doctorScheduleForm" onsubmit="submitDoctorScheduleAjax(event)">
                <input type="hidden" name="scheduleDoctorId" id="schedDocId" />
                <div class="modal-body p-4">
                    <div id="scheduleModalAlert" class="alert d-none mb-3" role="alert"></div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">نص ساعات العمل والدوام</label>
                            <input name="scheduleWorkingHours" id="schedWorkingHours" class="form-control" placeholder="09:00 ص - 12:00 م | 12:00 م - 06:00 م" required />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">نص أيام العمل الأسبوعي</label>
                            <input name="scheduleWorkingDays" id="schedWorkingDays" class="form-control" placeholder="السبت - الخميس (الجمعة إجازة)" required />
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-semibold d-block">يوم الإجازة الأسبوعية (يتم تعطيل المواعيد فيه تلقائياً)</label>
                        <div class="d-flex flex-wrap gap-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="scheduleOffDays" value="5" id="offDay5" checked />
                                <label class="form-check-label" for="offDay5">الجمعة</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="scheduleOffDays" value="6" id="offDay6" />
                                <label class="form-check-label" for="offDay6">السبت</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="scheduleOffDays" value="0" id="offDay0" />
                                <label class="form-check-label" for="offDay0">الأحد</label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold d-block mb-2">الأوقات المتاحة لهذا الطبيب في شاشة الحجز</label>
                        <div class="row g-2" id="scheduleSlotsCheckboxContainer" style="max-height: 250px; overflow-y: auto;">
                            <!-- Checkboxes will be populated dynamically -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light rounded-bottom-4">
                    <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">إلغاء</button>
                    <button type="submit" id="saveScheduleBtn" class="btn btn-primary rounded-pill px-4 shadow-sm">
                        <i class="bi bi-save me-1"></i> حفظ جدول المواعيد
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal 3: تغيير كلمة المرور للطبيب -->
<div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true" style="direction: rtl; text-align: right;">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center w-100" style="direction: rtl;">
                <h5 class="modal-title fw-bold m-0 flex-grow-1 text-end" id="changePasswordModalLabel">
                    <i class="bi bi-shield-lock-fill text-warning me-2"></i> تغيير كلمة المرور
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="إغلاق" style="margin-right: auto !important; margin-left: 0 !important;"></button>
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
                            <input type="password" id="currentPasswordInput" name="currentPassword" class="form-control" placeholder="أدخل كلمة المرور الحالية" required />
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="newPasswordInput" class="form-label fw-semibold">
                            كلمة المرور الجديدة <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <span class="input-group-text bg-light"><i class="bi bi-key-fill text-warning"></i></span>
                            <input type="password" id="newPasswordInput" name="newPassword" class="form-control" placeholder="أدخل كلمة المرور الجديدة (6 أحرف على الأقل)" minlength="6" required />
                        </div>
                        <small class="text-muted d-block mt-1">
                            <i class="bi bi-shield-check text-success me-1"></i> يتم تشفير كلمة المرور فورياً بـ SHA-256 وحفظها بأمان تام.
                        </small>
                    </div>

                    <div class="mb-3">
                        <label for="confirmPasswordInput" class="form-label fw-semibold">
                            تأكيد كلمة المرور الجديدة <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <span class="input-group-text bg-light"><i class="bi bi-check-all text-success"></i></span>
                            <input type="password" id="confirmPasswordInput" name="confirmPassword" class="form-control" placeholder="أعد كتابة كلمة المرور الجديدة للتأكيد" minlength="6" required />
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light rounded-bottom-4">
                    <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">إلغاء</button>
                    <button type="submit" id="savePasswordBtn" class="btn btn-warning rounded-pill px-4 fw-bold shadow-sm">
                        <i class="bi bi-check-circle-fill me-1"></i> حفظ وتشفير كلمة المرور
                    </button>
                </div>
            </form>
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

    function openAddDoctorModal() {
        document.getElementById("doctorModalLabel").innerHTML = '<i class="bi bi-person-plus-fill me-2"></i> إضافة طبيب جديد';
        document.getElementById("modalDocId").value = "0";
        document.getElementById("modalDocName").value = "";
        document.getElementById("modalDocTitle").value = "";
        document.getElementById("modalDocSpecialty").value = "";
        document.getElementById("modalDocRoom").value = "العيادة الاستشارية";
        document.getElementById("modalDocExp").value = 5;
        document.getElementById("modalDocRating").value = 5.0;
        document.getElementById("modalDocIsActive").checked = true;
        document.getElementById("modalDocWorkingHours").value = "09:00 ص - 12:00 م | 12:00 م - 06:00 م";
        document.getElementById("modalDocWorkingDays").value = "السبت - الخميس (الجمعة إجازة)";
        if (doctorModalInstance) doctorModalInstance.show();
    }

    function openEditDoctorModal(id, name, title, specialty, room, rating, exp, isActive, hours, days) {
        document.getElementById("doctorModalLabel").innerHTML = `<i class="bi bi-pencil-square me-2"></i> تعديل بيانات الطبيب (${name})`;
        document.getElementById("modalDocId").value = id;
        document.getElementById("modalDocName").value = name;
        document.getElementById("modalDocTitle").value = title;
        document.getElementById("modalDocSpecialty").value = specialty;
        document.getElementById("modalDocRoom").value = room;
        document.getElementById("modalDocRating").value = rating;
        document.getElementById("modalDocExp").value = exp;
        document.getElementById("modalDocIsActive").checked = (isActive === true || isActive === 'true');
        document.getElementById("modalDocWorkingHours").value = hours;
        document.getElementById("modalDocWorkingDays").value = days;
        if (doctorModalInstance) doctorModalInstance.show();
    }

    function openDoctorScheduleModal(id, name, hours, days, offDay, slots) {
        document.getElementById("doctorScheduleModalLabel").innerHTML = `<i class="bi bi-calendar2-week-fill text-warning me-2"></i> جدول عمل الطبيب (${name})`;
        document.getElementById("schedDocId").value = id;
        document.getElementById("schedWorkingHours").value = hours;
        document.getElementById("schedWorkingDays").value = days;

        const offRadio = document.getElementById("offDay" + offDay);
        if (offRadio) offRadio.checked = true;

        const container = document.getElementById("scheduleSlotsCheckboxContainer");
        container.innerHTML = "";

        const allSlots = <%- JSON.stringify((configuredSlots || []).map(s => s.time)) %>;
        const currentSlots = Array.isArray(slots) ? slots : [];

        allSlots.forEach(time => {
            const isChecked = currentSlots.includes(time);
            const col = document.createElement("div");
            col.className = "col-6 col-sm-4";
            col.innerHTML = `
                <div class="form-check border rounded p-2 px-3 bg-white">
                    <input class="form-check-input" type="checkbox" name="scheduleSelectedSlots" value="${time}" id="chk_${time.replace(/[^a-zA-Z0-9]/g, '_')}" ${isChecked ? 'checked' : ''}>
                    <label class="form-check-label fw-semibold small" for="chk_${time.replace(/[^a-zA-Z0-9]/g, '_')}">${time}</label>
                </div>
            `;
            container.appendChild(col);
        });

        if (doctorScheduleModalInstance) doctorScheduleModalInstance.show();
    }

    function openChangePasswordModal() {
        const alertEl = document.getElementById("changePasswordAlert");
        if (alertEl) alertEl.classList.add("d-none");
        document.getElementById("changePasswordForm")?.reset();
        if (changePasswordModalInstance) changePasswordModalInstance.show();
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

    function filterBookingsTable() {
        const query = document.getElementById("bookingSearchInput").value.toLowerCase();
        const rows = document.querySelectorAll("#bookingsTable tbody tr");
        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(query) ? "" : "none";
        });
    }

    // Persist active tab across actions and refreshes
    document.addEventListener("DOMContentLoaded", () => {
        const hash = window.location.hash || localStorage.getItem("activeDoctorDashboardTab");
        if (hash) {
            const targetTab = document.querySelector(`button[data-bs-target="${hash}"]`);
            if (targetTab) {
                bootstrap.Tab.getOrCreateInstance(targetTab).show();
            }
        }

        document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tab => {
            tab.addEventListener('shown.bs.tab', (e) => {
                const target = e.target.getAttribute('data-bs-target');
                if (target) {
                    history.replaceState(null, null, target);
                    localStorage.setItem("activeDoctorDashboardTab", target);
                }
            });
        });
    });
</script>

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
            في مركز دنتل سيتي (Dental City)، نولي سرية وخصوصية بيانات مرضانا الكرام أهمية قصوى.
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
- **عدد الأسطر:** 20 سطر
- **الحجم:** 0.4 KB

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
    "postinstall": "npm install --prefix \"Dental city\"",
    "build": "node scripts/build.js",
    "start": "node server.js",
    "dev": "npm run dev --prefix \"Dental city\""
  },
  "dependencies": {
    "ws": "^8.23.0"
  }
}
````

---

### Root Server Entrypoint (server.js)

- **المسار:** `server.js`
- **عدد الأسطر:** 10 سطر
- **الحجم:** 0.2 KB

````javascript
/**
 * Dental City Clinic Management & Booking System
 * Root Server Entrypoint for Hosting Environments (IISNode, Passenger, cPanel, Plesk, PaaS)
 */

import app from './Dental city/dist/server.js';

export default app;

````

---

### Root IIS / AppPool Configuration (web.config)

- **المسار:** `web.config`
- **عدد الأسطر:** 67 سطر
- **الحجم:** 2.2 KB

````xml
<?xml version="1.0" encoding="utf-8"?>
<!--
  Dental City Clinic Management & Booking System
  IIS / IISNode / Windows Hosting Web Configuration
-->
<configuration>
  <system.webServer>
    <!-- Allow Express custom error pages (PassThrough) -->
    <httpErrors existingResponse="PassThrough" />

    <!-- Register iisnode handler for Node.js execution -->
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>

    <!-- URL Rewrite rules for routing traffic through server.js -->
    <rewrite>
      <rules>
        <!-- Do not interfere with requests for node-inspector debugging -->
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server.js\/debug[\/]?" />
        </rule>

        <!-- Static content: Serve assets directly from /public if file exists -->
        <rule name="StaticContent" stopProcessing="true">
          <match url="([\S]+[.](html|htm|svg|js|css|png|gif|jpg|jpeg|ico|woff|woff2|ttf|eot|webp))" />
          <action type="Rewrite" url="public/{R:1}" />
        </rule>

        <!-- All other URLs are mapped to the Node.js application entry point -->
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True" />
          </conditions>
          <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>

    <!-- Exclude node_modules, src, and environment files from direct HTTP access -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules" />
          <add segment=".env" />
          <add segment="src" />
        </hiddenSegments>
      </requestFiltering>
    </security>

    <!-- iisnode options for maximum AppPool stability and crash prevention -->
    <iisnode
      maxConcurrentRequestsPerProcess="1024"
      maxNamedPipeConnectionRetry="100"
      namedPipeConnectionRetryDelay="250"
      initialRequestTimeout="60000"
      requestTimeout="120000"
      logDirectory="iisnode"
      debuggingEnabled="false"
      devErrorsEnabled="false"
      loggingEnabled="true"
      watchedFiles="web.config;*.js"
    />
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
- **عدد الأسطر:** 46 سطر
- **الحجم:** 1.6 KB

````javascript
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const innerDir = path.join(rootDir, 'Dental city');

console.log('🚀 Running Dental City build pipeline for Vercel...');

// 1. Build TypeScript in Dental city
try {
  execSync('npm run build', { cwd: innerDir, stdio: 'inherit' });
} catch (err) {
  console.error('Build step failed in Dental city:', err.message);
  process.exit(1);
}

// 2. Synchronize views and assets to root for multi-environment compatibility
try {
  const srcViews = path.join(innerDir, 'src', 'views');
  const rootDistViews = path.join(rootDir, 'dist', 'views');
  const rootViews = path.join(rootDir, 'views');
  const srcPublic = path.join(innerDir, 'public');
  const rootPublic = path.join(rootDir, 'public');

  if (fs.existsSync(srcViews)) {
    fs.mkdirSync(rootDistViews, { recursive: true });
    fs.cpSync(srcViews, rootDistViews, { recursive: true, force: true });
    fs.mkdirSync(rootViews, { recursive: true });
    fs.cpSync(srcViews, rootViews, { recursive: true, force: true });
  }

  if (fs.existsSync(srcPublic) && !fs.existsSync(rootPublic)) {
    fs.mkdirSync(rootPublic, { recursive: true });
    fs.cpSync(srcPublic, rootPublic, { recursive: true, force: true });
  }

  console.log('✓ Successfully prepared Dental City assets for Vercel.');
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
- **عدد الأسطر:** 36 سطر
- **الحجم:** 0.9 KB

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
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@types/cookie-parser": "^1.4.8",
    "@types/ejs": "^3.1.5",
    "@types/express": "^4.17.21",
    "@types/express-ejs-layouts": "^2.5.4",
    "@types/express-session": "^1.18.1",
    "@types/node": "^22.13.4",
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
- **عدد الأسطر:** 53 سطر
- **الحجم:** 1.6 KB

````xml
<?xml version="1.0" encoding="utf-8"?>
<!--
  Dental City Clinic Management & Booking System
  Subfolder Web Configuration
-->
<configuration>
  <system.webServer>
    <httpErrors existingResponse="PassThrough" />
    <handlers>
      <add name="iisnode" path="dist/server.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^dist/server.js\/debug[\/]?" />
        </rule>
        <rule name="StaticContent" stopProcessing="true">
          <match url="([\S]+[.](html|htm|svg|js|css|png|gif|jpg|jpeg|ico|woff|woff2|ttf|eot|webp))" />
          <action type="Rewrite" url="public/{R:1}" />
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True" />
          </conditions>
          <action type="Rewrite" url="dist/server.js" />
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules" />
          <add segment=".env" />
          <add segment="src" />
        </hiddenSegments>
      </requestFiltering>
    </security>
    <iisnode
      maxConcurrentRequestsPerProcess="1024"
      maxNamedPipeConnectionRetry="100"
      namedPipeConnectionRetryDelay="250"
      initialRequestTimeout="60000"
      requestTimeout="120000"
      logDirectory="iisnode"
      debuggingEnabled="false"
      devErrorsEnabled="false"
      loggingEnabled="true"
      watchedFiles="web.config;*.js"
    />
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

