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
