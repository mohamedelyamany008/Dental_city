const fs = require('fs');
const c = fs.readFileSync('public/css/theme.css', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('.modal-content') || l.includes('.modal-header') || l.includes('.modal-footer') || l.includes('.modal-body')) {
    console.log((i+1) + ': ' + l.trim());
  }
});
