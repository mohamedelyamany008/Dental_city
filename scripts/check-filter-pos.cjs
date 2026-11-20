const fs = require('fs');

const d = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
const lines = d.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('filterPatientBookings')) {
    console.log(`dashboard.ejs:${idx+1}: ${l}`);
  }
});
