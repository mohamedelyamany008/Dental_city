const fs = require('fs');

const routeFiles = fs.readdirSync('Dental city/src/routes');
console.log('Routes in Dental city/src/routes:', routeFiles);
