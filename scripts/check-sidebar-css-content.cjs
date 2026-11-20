const fs = require('fs');

const files = [
  'public/css/sidebar.css',
  'Dental city/public/css/sidebar.css',
  'publish-monsterasp/public/css/sidebar.css'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    console.log('=== ' + f + ' ===');
    const content = fs.readFileSync(f, 'utf8');
    const idx = content.indexOf('.sidebar-user-name');
    if (idx !== -1) {
      console.log(content.substring(idx, idx + 400));
    }
  }
});
