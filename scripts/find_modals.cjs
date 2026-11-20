const fs = require('fs');
const path = require('path');

function searchModals(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'publish-monsterasp', '.gemini'].includes(entry.name)) {
        searchModals(full);
      }
    } else if (/\.(ejs|html)$/.test(entry.name)) {
      try {
        const text = fs.readFileSync(full, 'utf8');
        const lines = text.split('\n');
        lines.forEach((l, i) => {
          if (l.includes('modal') && (l.includes('class="modal') || l.includes("class='modal'") || l.includes('id='))) {
            console.log(`${full}:${i+1} -> ${l.trim()}`);
          }
        });
      } catch (e) {}
    }
  }
}
searchModals('.');
