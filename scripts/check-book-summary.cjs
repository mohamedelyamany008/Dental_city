const fs = require('fs');

const b = fs.readFileSync('Dental city/src/views/appointments/book.ejs', 'utf8');
const lines = b.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('summary-card') || l.includes('bookingSummaryModal')) {
    console.log(`book.ejs:${idx+1}: ${l.trim()}`);
  }
});
