const fs = require('fs');
const path = require('path');

function search(dir) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return;
  }
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === '.gemini' || f === '.system_generated' || f === 'dist' || f === 'publish-monsterasp') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      search(full);
    } else {
      try {
        const content = fs.readFileSync(full, 'utf8');
        const lines = content.split('\n');
        lines.forEach((l, idx) => {
          if (/الروشتات|معامل|Prescription|Labs/i.test(l)) {
            console.log(`${full}:${idx + 1}: ${l.trim().substring(0, 120)}`);
          }
        });
      } catch (err) {}
    }
  }
}

search('.');
