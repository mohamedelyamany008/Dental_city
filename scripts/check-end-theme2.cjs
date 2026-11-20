const fs = require('fs');

const css = fs.readFileSync('public/css/theme.css', 'utf8');
const lines = css.split('\n');
console.log('Last 35 lines of theme.css:');
for (let i = lines.length - 35; i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
