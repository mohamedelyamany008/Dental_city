const fs = require('fs');

const d = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
const lines = d.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('filterBookingsTable')) {
    console.log(`dashboard.ejs:${idx+1}:`);
    for (let i = Math.max(0, idx - 10); i <= Math.min(lines.length - 1, idx + 10); i++) {
      console.log(`  ${i+1}: ${lines[i]}`);
    }
  }
});
