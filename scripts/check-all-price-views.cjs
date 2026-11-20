const fs = require('fs');
const path = require('path');

function searchPrices(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === '.gemini' || f === 'dist' || f === 'publish-monsterasp') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchPrices(full);
    } else if (/\.(ejs|html)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (/سعر|أسعار|price/i.test(l)) {
          // ignore form price inputs if backend only, but check if displayed
          console.log(`${full}:${idx+1}: ${l.trim().substring(0, 120)}`);
        }
      });
    }
  }
}

searchPrices('Dental city/src/views');
