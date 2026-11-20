const fs = require('fs');

const lines = fs.readFileSync('Dental city/src/views/patient/portal.ejs', 'utf8').split('\n');
console.log('Lines 200 to 450:');
for (let i = 200; i < Math.min(lines.length, 450); i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
