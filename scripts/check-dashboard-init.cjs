const fs = require('fs');

const d = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
const lines = d.split('\n');
console.log('Last 60 lines of dashboard.ejs:');
for (let i = lines.length - 60; i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
