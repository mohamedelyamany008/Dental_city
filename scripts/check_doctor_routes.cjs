const fs = require('fs');
const c = fs.readFileSync('Dental city/src/routes/doctor.routes.ts', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes("render('doctor/dashboard") || l.includes('recentBookings') || l.includes('allBookings')) {
    console.log((i+1) + ': ' + l.trim());
  }
});
