const fs = require('fs');

const d = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
const lines = d.split('\n');
const terms = ['إيراد', 'ايراد', 'تقدير', 'revenue', 'Revenue', 'مالي', 'جنيه', 'ج.م', 'EGP', 'LE', 'L.E'];

const matches = [];
lines.forEach((l, idx) => {
  terms.forEach(t => {
    if (l.includes(t)) {
      matches.push({ line: idx + 1, term: t, text: l.trim().substring(0, 120) });
    }
  });
});

fs.writeFileSync('scripts/financial-matches.json', JSON.stringify(matches, null, 2), 'utf8');
console.log('Matches:', matches.length);
