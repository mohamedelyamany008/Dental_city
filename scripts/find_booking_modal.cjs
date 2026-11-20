const fs = require('fs');
const files = [
  'Dental city/src/views/appointments/book.ejs',
  'Dental city/src/views/appointments/confirmation.ejs',
  'Dental city/src/views/patient/portal.ejs',
  'Dental city/src/views/doctor/dashboard.ejs',
  'Dental city/src/views/index.ejs'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const lines = text.split('\n');
    lines.forEach((l, i) => {
      if (/ملخص|booking.*modal|summary.*modal|modal.*booking|modal.*summary/i.test(l)) {
        console.log(`${f}:${i+1} -> ${l.trim()}`);
      }
    });
  }
}
