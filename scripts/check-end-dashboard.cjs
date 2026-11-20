const fs = require('fs');

const d = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
const lines = d.split('\n');
for (let i = 3700; i < lines.length; i++) {
  console.log(`  ${i+1}: ${lines[i]}`);
}
