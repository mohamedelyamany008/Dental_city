const fs = require('fs');
const path = require('path');

const regex = /(الروشتات|معامل|روشت|prescription|\blabs?\b)/i;

function search(dir) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return;
  }
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === '.gemini' || f === 'scripts') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      search(full);
    } else if (/\.(ejs|html|js|ts)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (regex.test(l)) {
          // ignore label=" or <label or -label
          const clean = l.replace(/aria-label="[^"]*"/gi, '').replace(/<label\b[^>]*>/gi, '').replace(/<\/label>/gi, '').replace(/\b[\w-]+label\b/gi, '');
          if (regex.test(clean)) {
            console.log(`${full}:${idx + 1}: ${l.trim().substring(0, 120)}`);
          }
        }
      });
    }
  }
}

search('.');
