const fs = require('fs');

const appRoutes = fs.readFileSync('Dental city/src/routes/appointments.routes.ts', 'utf8');
const lines = appRoutes.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('.get(') || l.includes('.post(')) {
    console.log(`appointments.routes.ts:${idx+1}: ${l.trim()}`);
  }
});
