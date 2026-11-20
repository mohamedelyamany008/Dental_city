const fs = require('fs');
const c = fs.readFileSync('Dental city/src/views/appointments/book.ejs', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('modal')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
