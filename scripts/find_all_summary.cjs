const fs = require('fs');
const path = require('path');

function searchAll(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'publish-monsterasp', '.gemini'].includes(entry.name)) {
        searchAll(full);
      }
    } else if (/\.(ejs|html|js|ts|css)$/.test(entry.name)) {
      try {
        const text = fs.readFileSync(full, 'utf8');
        const lines = text.split('\n');
        lines.forEach((l, i) => {
          if (l.includes('ملخص') || l.includes('Booking Summary') || l.includes('booking-summary')) {
            console.log(`${full}:${i+1} -> ${l.trim().slice(0, 120)}`);
          }
        });
      } catch (e) {}
    }
  }
}
searchAll('.');
