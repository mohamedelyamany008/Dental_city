const fs = require('fs');

const lines = fs.readFileSync('Dental city/src/views/appointments/confirmation.ejs', 'utf8').split('\n');
for (let i = 100; i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
