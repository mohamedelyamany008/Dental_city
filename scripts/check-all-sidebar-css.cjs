const fs = require('fs');
const path = require('path');

function checkSidebarCss(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === '.gemini') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      checkSidebarCss(full);
    } else if (f === 'sidebar.css') {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      console.log(`FILE: ${full}`);
      lines.forEach((l, idx) => {
        if (l.includes('.sidebar-user-name') && l.includes('color')) {
          console.log(`  Line ${idx+1}: ${l.trim()}`);
        }
        if (l.includes('.sidebar-user-role') && l.includes('color')) {
          console.log(`  Line ${idx+1}: ${l.trim()}`);
        }
      });
    }
  }
}

checkSidebarCss('.');
