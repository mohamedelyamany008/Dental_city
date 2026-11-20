const fs = require('fs');
const c = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('changePassword') || l.includes('bi-key') || l.includes('كلمة المرور')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
