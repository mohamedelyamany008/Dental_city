const fs = require('fs');
const path = require('path');

const terms = ['روشت', 'معمل', 'معامل', 'prescription', 'lab', 'تحاليل', 'أشعة'];

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
    } else if (/\.(ejs|html)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        terms.forEach(t => {
          if (l.toLowerCase().includes(t)) {
            console.log(`${full}:${idx + 1}: [term: ${t}] ${l.trim().substring(0, 100)}`);
          }
        });
      });
    }
  }
}

search('.');
