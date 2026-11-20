const fs = require('fs');

const syncCode = fs.readFileSync('scripts/sync_mirrors.cjs', 'utf8');
console.log(syncCode.substring(0, 500));
