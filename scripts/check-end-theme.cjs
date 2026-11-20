const fs = require('fs');

const css = fs.readFileSync('public/css/theme.css', 'utf8');
const lines = css.split('\n');
console.log('Total lines in theme.css:', lines.length);
for (let i = lines.length - 30; i < lines.length; i++) {
  console.log(`  ${i+1}: ${lines[i]}`);
}
