const fs = require('fs');
const c = fs.readFileSync('Dental city/src/routes/doctor.routes.ts', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('booking') || l.includes('status') || l.includes('updateStatus') || l.includes('/api/')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
