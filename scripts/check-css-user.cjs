const fs = require('fs');

const css = fs.readFileSync('public/css/sidebar.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('sidebar-user-name') || l.includes('sidebar-user-role') || l.includes('sidebar-avatar')) {
    console.log(`sidebar.css:${idx+1}: ${l.trim()}`);
  }
});
