const fs = require('fs');

const lines = fs.readFileSync('Dental city/src/views/patient/portal.ejs', 'utf8').split('\n');
console.log('Lines 450 to 520:');
for (let i = 450; i < Math.min(lines.length, 520); i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
