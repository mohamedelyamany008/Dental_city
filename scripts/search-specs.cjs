const fs = require('fs');
const path = require('path');

function searchCode(pattern) {
  console.log(`=== Searching for: ${pattern} ===`);
  const files = [
    'Dental city/src/views/doctor/dashboard.ejs',
    'Dental city/src/views/partials/sidebar.ejs',
    'Dental city/src/views/index.ejs',
    'Dental city/src/views/appointments/book.ejs',
    'Dental city/src/views/patient/portal.ejs',
    'public/js/sidebar.js'
  ];

  files.forEach(f => {
    if (fs.existsSync(f)) {
      const content = fs.readFileSync(f, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (l.includes(pattern)) {
          console.log(`${f}:${idx+1}: ${l.trim().substring(0, 120)}`);
        }
      });
    }
  });
}

searchCode('الإيرادات التقديرية');
searchCode('توزيع الخدمات');
searchCode('الخدمات والأسعار');
searchCode('الأسعار');
