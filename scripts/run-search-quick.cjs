const fs = require('fs');

function searchFile(file, terms) {
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const matches = [];
  lines.forEach((line, idx) => {
    terms.forEach(term => {
      if (line.includes(term)) {
        matches.push({ file, line: idx + 1, term, text: line.trim() });
      }
    });
  });
  return matches;
}

const terms = ['الإيرادات', 'تقديرية', 'توزيع الخدمات', 'باقات الأسعار', 'الخدمات والأسعار', 'الأسعار', 'patients-panel', 'patients-tab', 'overview-panel'];
const files = [
  'Dental city/src/views/doctor/dashboard.ejs',
  'Dental city/src/views/partials/sidebar.ejs',
  'public/js/sidebar.js'
];

let allMatches = [];
files.forEach(f => {
  allMatches = allMatches.concat(searchFile(f, terms));
});

fs.writeFileSync('scripts/search-results.json', JSON.stringify(allMatches, null, 2), 'utf8');
console.log(`Found ${allMatches.length} matches.`);
