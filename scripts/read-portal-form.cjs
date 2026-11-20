const fs = require('fs');

const lines = fs.readFileSync('Dental city/src/views/patient/portal.ejs', 'utf8').split('\n');
console.log('Lines 260 to 320:');
for (let i = 259; i < 320; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
