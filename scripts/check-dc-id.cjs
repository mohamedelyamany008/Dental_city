const fs = require('fs');

const serviceCode = fs.readFileSync('Dental city/src/services/appointmentService.ts', 'utf8');
const lines = serviceCode.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('RE_DC_ID') || l.includes('heath_notes')) {
    console.log(`Line ${idx+1}: ${l.trim()}`);
  }
});
