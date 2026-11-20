const fs = require('fs');

const s = fs.readFileSync('Dental city/src/services/appointmentService.ts', 'utf8');
const lines = s.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('export interface Booking') || l.includes('export type Booking') || l.includes('interface Booking')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});
