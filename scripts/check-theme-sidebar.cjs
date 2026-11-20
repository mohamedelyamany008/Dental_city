const fs = require('fs');

const themeCss = fs.readFileSync('public/css/theme.css', 'utf8');
const lines = themeCss.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('sidebar-user-name')) {
    console.log(`theme.css:${idx+1}: ${l.trim()}`);
  }
});
