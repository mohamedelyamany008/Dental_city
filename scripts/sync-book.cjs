const fs = require('fs');
const path = require('path');

function copyIfSrcExists(src, dst) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    console.log(`Copied ${src} -> ${dst}`);
  }
}

const bookSrc = 'Dental city/src/views/appointments/book.ejs';
copyIfSrcExists(bookSrc, 'views/appointments/book.ejs');
copyIfSrcExists(bookSrc, 'Dental city/dist/views/appointments/book.ejs');
copyIfSrcExists(bookSrc, 'dist/views/appointments/book.ejs');
copyIfSrcExists(bookSrc, 'publish-monsterasp/dist/views/appointments/book.ejs');
copyIfSrcExists(bookSrc, 'publish-monsterasp/views/appointments/book.ejs');
