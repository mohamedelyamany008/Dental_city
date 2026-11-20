const fs = require('fs');

console.log('=== index.routes.ts ===');
console.log(fs.readFileSync('Dental city/src/routes/index.routes.ts', 'utf8'));

console.log('=== appointments.routes.ts ===');
console.log(fs.readFileSync('Dental city/src/routes/appointments.routes.ts', 'utf8').substring(0, 1000));
