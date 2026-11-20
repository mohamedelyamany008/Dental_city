const fs = require('fs');
const path = require('path');

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === '.gemini' || f === '.system_generated') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      search(full);
    } else if (/\.(ejs|js|ts|html|css)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (l.includes('الروشتات والمعامل') || l.includes('Prescriptions & Labs') || l.includes('Prescriptions') || l.includes('حازم حجاج')) {
          console.log(`${full}:${idx + 1}: ${l.trim()}`);
        }
      });
    }
  }
}

search('.');
