const fs = require('fs');
const path = require('path');

function searchCss(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchCss(full);
    } else if (f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (l.includes('sidebar-user-name') || l.includes('sidebar-user-role')) {
          console.log(`${full}:${idx+1}: ${l.trim()}`);
        }
      });
    }
  }
}

searchCss('public/css');
if (fs.existsSync('Dental city/public/css')) {
  searchCss('Dental city/public/css');
}
