const fs = require('fs');
const path = require('path');

function searchForPortal(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === '.gemini' || f === 'dist' || f === 'publish-monsterasp') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchForPortal(full);
    } else if (/\.(ts|js)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('portal') || content.includes('Portal') || content.includes('patient/portal')) {
        console.log(`FOUND in ${full}`);
        const lines = content.split('\n');
        lines.forEach((l, idx) => {
          if (l.includes('portal') || l.includes('Portal') || l.includes('patient/portal')) {
            console.log(`  Line ${idx+1}: ${l.trim().substring(0, 100)}`);
          }
        });
      }
    }
  }
}

searchForPortal('Dental city/src');
