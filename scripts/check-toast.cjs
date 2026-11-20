const fs = require('fs');

const d = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
console.log('has showToast:', d.includes('showToast'));
