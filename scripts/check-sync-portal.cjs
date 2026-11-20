const fs = require('fs');

const syncCode = fs.readFileSync('scripts/sync_mirrors.cjs', 'utf8');
console.log('Does sync_mirrors copy portal.ejs?', syncCode.includes('portal.ejs'));
console.log(syncCode);
