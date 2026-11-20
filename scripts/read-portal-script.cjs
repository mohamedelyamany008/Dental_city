const fs = require('fs');

const lines = fs.readFileSync('Dental city/src/views/patient/portal.ejs', 'utf8').split('\n');
console.log('Lines 520 to end:');
for (let i = 520; i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
