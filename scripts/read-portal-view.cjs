const fs = require('fs');

const portalView = fs.readFileSync('Dental city/src/views/patient/portal.ejs', 'utf8');
console.log('portal.ejs total lines:', portalView.split('\n').length);
console.log(portalView.substring(0, 1500));
