const fs = require('fs');

const cssFiles = ['public/css/sidebar.css', 'public/css/theme.css', 'public/css/portal.css', 'public/css/site.css'];

cssFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    lines.forEach((l, idx) => {
      if (/sidebar-user/i.test(l)) {
        console.log(`${f}:${idx+1}: ${l.trim()}`);
      }
    });
  }
});
