const fs = require('fs');
const c = fs.readFileSync('Dental city/src/views/patient/portal.ejs', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('modal') || l.includes('ملخص') || l.includes('Summary')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
