const fs = require('fs');
const path = require('path');

function searchAll(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === '.gemini' || f === 'dist' || f === 'publish-monsterasp') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchAll(full);
    } else if (/\.(ejs|html|js|ts)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (l.includes('الخدمات والأسعار') || l.includes('باقات الأسعار') || l.includes('الأسعار')) {
          console.log(`${full}:${idx+1}: ${l.trim().substring(0, 120)}`);
        }
      });
    }
  }
}

searchAll('Dental city/src');
searchAll('public');
