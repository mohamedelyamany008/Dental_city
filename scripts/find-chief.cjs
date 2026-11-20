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
    if (f === 'node_modules' || f === '.git' || f === '.gemini' || f === '.system_generated') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      search(full);
    } else {
      try {
        const content = fs.readFileSync(full, 'utf8');
        if (content.includes('رئيس الكادر الطبي') || content.includes('الكادر الطبي')) {
          console.log(`FOUND IN: ${full}`);
          const lines = content.split('\n');
          lines.forEach((l, idx) => {
            if (l.includes('رئيس الكادر الطبي') || l.includes('الكادر الطبي')) {
              console.log(`  Line ${idx+1}: ${l.trim()}`);
            }
          });
        }
      } catch (err) {}
    }
  }
}

search('.');
