const fs = require('fs');
const path = require('path');

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === '.gemini' || f === 'dist' || f === 'publish-monsterasp') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchFiles(full);
    } else if (f.includes('patient') || f.includes('portal') || f.includes('booking')) {
      console.log(full);
    }
  }
}

searchFiles('.');
