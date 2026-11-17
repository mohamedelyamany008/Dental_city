import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sections = [
  {
    title: '1. ملفات الخادم والواجهة الخلفية (Backend - Node.js + TypeScript)',
    description: 'يحتوي هذا القسم على منطق الخادم، الاتصال بقاعدة بيانات Supabase، نماذج البيانات، خدمات الحجز والمصادقة، ومسارات Express.',
    files: [
      { path: 'Dental city/src/server.ts', lang: 'typescript', name: 'Server Entrypoint (server.ts)' },
      { path: 'Dental city/src/config/supabase.ts', lang: 'typescript', name: 'Supabase Client Configuration (supabase.ts)' },
      { path: 'Dental city/src/models/types.ts', lang: 'typescript', name: 'Data Interfaces & Types (types.ts)' },
      { path: 'Dental city/src/models/schemas.ts', lang: 'typescript', name: 'Validation Schemas - Zod (schemas.ts)' },
      { path: 'Dental city/src/middleware/auth.ts', lang: 'typescript', name: 'Authentication & Session Middleware (auth.ts)' },
      { path: 'Dental city/src/routes/index.routes.ts', lang: 'typescript', name: 'Home & Public Routes (index.routes.ts)' },
      { path: 'Dental city/src/routes/appointments.routes.ts', lang: 'typescript', name: 'Appointments Routes & API (appointments.routes.ts)' },
      { path: 'Dental city/src/routes/doctor.routes.ts', lang: 'typescript', name: 'Doctor Portal & Dashboard Routes (doctor.routes.ts)' },
      { path: 'Dental city/src/services/appointmentService.ts', lang: 'typescript', name: 'Appointment & Doctor Service (appointmentService.ts)' },
      { path: 'Dental city/src/services/doctorAuthService.ts', lang: 'typescript', name: 'Doctor Authentication Service (doctorAuthService.ts)' },
      { path: 'Dental city/src/services/whatsappService.ts', lang: 'typescript', name: 'WhatsApp Notifications Service (whatsappService.ts)' }
    ]
  },
  {
    title: '2. قوالب واجهات المستخدم (Frontend Views - EJS Templates)',
    description: 'يحتوي هذا القسم على قوالب HTML/EJS المتوافقة بالكامل مع التصميم الحديث، دعم الهواتف والشاشات المختلفة، ونظام التخطيط (Main Layout).',
    files: [
      { path: 'Dental city/src/views/layouts/main.ejs', lang: 'html', name: 'القالب الرئيسي (main.ejs)' },
      { path: 'Dental city/src/views/index.ejs', lang: 'html', name: 'الصفحة الرئيسية (index.ejs)' },
      { path: 'Dental city/src/views/appointments/book.ejs', lang: 'html', name: 'واجهة حجز المواعيد (book.ejs)' },
      { path: 'Dental city/src/views/appointments/confirmation.ejs', lang: 'html', name: 'واجهة تأكيد الحجز (confirmation.ejs)' },
      { path: 'Dental city/src/views/doctor/login.ejs', lang: 'html', name: 'واجهة تسجيل دخول الطبيب (login.ejs)' },
      { path: 'Dental city/src/views/doctor/dashboard.ejs', lang: 'html', name: 'لوحة تحكم الطبيب والعيادة (dashboard.ejs)' },
      { path: 'Dental city/src/views/error.ejs', lang: 'html', name: 'واجهة رسائل الخطأ (error.ejs)' },
      { path: 'Dental city/src/views/privacy.ejs', lang: 'html', name: 'صفحة سياسة الخصوصية (privacy.ejs)' }
    ]
  },
  {
    title: '3. السكربتات والأنماط المخصصة (Custom Scripts & Styles)',
    description: 'ملفات CSS و JS المخصصة الخاصة بواجهة الموقع وإدارته.',
    files: [
      { path: 'Dental city/public/css/site.css', lang: 'css', name: 'أنماط الموقع المخصصة (site.css)' },
      { path: 'Dental city/public/js/site.js', lang: 'javascript', name: 'سكربتات الموقع العامة (site.js)' }
    ]
  },
  {
    title: '4. ملفات التكوين والإعدادات والنشر (Configuration & Deployment)',
    description: 'ملفات التكوين المعتمدة لضمان التوافق مع Vercel و IIS/Windows Hosting (AppPool) و Node 20 LTS.',
    files: [
      { path: 'package.json', lang: 'json', name: 'Root package.json' },
      { path: 'server.js', lang: 'javascript', name: 'Root Server Entrypoint (server.js)' },
      { path: 'web.config', lang: 'xml', name: 'Root IIS / AppPool Configuration (web.config)' },
      { path: 'vercel.json', lang: 'json', name: 'Root Vercel Configuration (vercel.json)' },
      { path: 'api/index.js', lang: 'javascript', name: 'Root Vercel Serverless Function (api/index.js)' },
      { path: 'scripts/build.js', lang: 'javascript', name: 'Root Vercel Build Pipeline (scripts/build.js)' },
      { path: '.env.example', lang: 'ini', name: 'Environment Variables Template (.env.example)' },
      { path: '.nvmrc', lang: 'text', name: 'Node.js Version Lock (.nvmrc)' },
      { path: '.node-version', lang: 'text', name: 'Node.js Version Lock (.node-version)' },
      { path: 'Dental city/package.json', lang: 'json', name: 'Subfolder package.json' },
      { path: 'Dental city/tsconfig.json', lang: 'json', name: 'TypeScript Configuration (tsconfig.json)' },
      { path: 'Dental city/web.config', lang: 'xml', name: 'Subfolder IIS Configuration (web.config)' },
      { path: 'Dental city/vercel.json', lang: 'json', name: 'Subfolder Vercel Configuration (vercel.json)' },
      { path: 'Dental city/api/index.js', lang: 'javascript', name: 'Subfolder Vercel Function (api/index.js)' },
      { path: 'Dental city/scripts/copy-views.js', lang: 'javascript', name: 'Views Copy Build Script (copy-views.js)' }
    ]
  }
];

let out = `# ملف الكود البرمجي الشامل لمشروع مركز دنتل سيتي (Dental City)
> **تاريخ التجميع:** ${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}
> **البيئة:** Node.js (TypeScript) + Express + EJS + Supabase (PostgreSQL)
> **ملاحظة:** تم تجميع كل ملفات المشروع البرمجية في هذا المستند للعرض والمراجعة والنسخ بسهولة دون المساس أو التعديل بأي من الملفات الأصلية.

---

## 📑 فهرس محتويات الملف

`;

// Generate Table of Contents
for (const sec of sections) {
  out += `### ${sec.title}\n`;
  for (const f of sec.files) {
    const anchor = f.name.toLowerCase().replace(/[^\w\u0600-\u06FF]+/g, '-');
    out += `- [${f.name}](#${anchor}) - \`${f.path}\`\n`;
  }
  out += '\n';
}

out += `---

`;

// Generate File Contents
for (const sec of sections) {
  out += `## ${sec.title}\n\n`;
  out += `> ${sec.description}\n\n`;

  for (const f of sec.files) {
    const fullPath = path.join(rootDir, f.path);
    if (!fs.existsSync(fullPath)) {
      console.warn('File not found:', fullPath);
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const lineCount = content.split('\n').length;
    const byteCount = Buffer.byteLength(content, 'utf8');

    out += `### ${f.name}\n\n`;
    out += `- **المسار:** \`${f.path}\`\n`;
    out += `- **عدد الأسطر:** ${lineCount} سطر\n`;
    out += `- **الحجم:** ${(byteCount / 1024).toFixed(1)} KB\n\n`;

    out += '````' + f.lang + '\n';
    out += content;
    if (!content.endsWith('\n')) out += '\n';
    out += '````\n\n';
    out += '---\n\n';
  }
}

// Write to workspace root
const workspaceOutput = path.join(rootDir, 'CONSOLIDATED_PROJECT_CODE.md');
fs.writeFileSync(workspaceOutput, out, 'utf8');
console.log('✓ Successfully wrote workspace file:', workspaceOutput);

// Write to artifact directory
const artifactDir = 'C:\\Users\\Moham\\.gemini\\antigravity\\brain\\ad3c57e0-8e91-4090-b5f0-9107bd0bfc09';
const artifactOutput = path.join(artifactDir, 'consolidated_project_code.md');
if (fs.existsSync(artifactDir)) {
  fs.writeFileSync(artifactOutput, out, 'utf8');
  console.log('✓ Successfully wrote artifact file:', artifactOutput);
}

