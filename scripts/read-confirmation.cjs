const fs = require('fs');

const conf = fs.readFileSync('Dental city/src/views/appointments/confirmation.ejs', 'utf8');
console.log('confirmation.ejs total lines:', conf.split('\n').length);
console.log(conf.substring(0, 1000));
