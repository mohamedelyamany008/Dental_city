const fs = require('fs');

function listDir(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = dir + '/' + f;
    if (fs.statSync(full).isDirectory()) {
      listDir(full, prefix + '  ');
    } else {
      console.log(prefix + f + ' (' + full + ')');
    }
  }
}

listDir('Dental city/src/views');
