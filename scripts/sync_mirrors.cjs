const fs = require('fs');
const path = require('path');

function copyIfSrcExists(src, dst) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    console.log(`Copied ${src} -> ${dst}`);
  }
}

// 1. Dashboard View
const dashboardSrc = 'Dental city/src/views/doctor/dashboard.ejs';
copyIfSrcExists(dashboardSrc, 'views/doctor/dashboard.ejs');
copyIfSrcExists(dashboardSrc, 'Dental city/dist/views/doctor/dashboard.ejs');
copyIfSrcExists(dashboardSrc, 'dist/views/doctor/dashboard.ejs');
copyIfSrcExists(dashboardSrc, 'publish-monsterasp/dist/views/doctor/dashboard.ejs');
copyIfSrcExists(dashboardSrc, 'publish-monsterasp/views/doctor/dashboard.ejs');

// 2. Sidebar View
const sidebarSrc = 'Dental city/src/views/partials/sidebar.ejs';
copyIfSrcExists(sidebarSrc, 'views/partials/sidebar.ejs');
copyIfSrcExists(sidebarSrc, 'Dental city/dist/views/partials/sidebar.ejs');
copyIfSrcExists(sidebarSrc, 'dist/views/partials/sidebar.ejs');
copyIfSrcExists(sidebarSrc, 'publish-monsterasp/dist/views/partials/sidebar.ejs');
copyIfSrcExists(sidebarSrc, 'publish-monsterasp/views/partials/sidebar.ejs');

// 3. Patient Portal View
const portalSrc = 'Dental city/src/views/patient/portal.ejs';
copyIfSrcExists(portalSrc, 'views/patient/portal.ejs');
copyIfSrcExists(portalSrc, 'Dental city/dist/views/patient/portal.ejs');
copyIfSrcExists(portalSrc, 'dist/views/patient/portal.ejs');
copyIfSrcExists(portalSrc, 'publish-monsterasp/dist/views/patient/portal.ejs');
copyIfSrcExists(portalSrc, 'publish-monsterasp/views/patient/portal.ejs');

// 4. Appointments Book View
const bookSrc = 'Dental city/src/views/appointments/book.ejs';
copyIfSrcExists(bookSrc, 'views/appointments/book.ejs');
copyIfSrcExists(bookSrc, 'Dental city/dist/views/appointments/book.ejs');
copyIfSrcExists(bookSrc, 'dist/views/appointments/book.ejs');
copyIfSrcExists(bookSrc, 'publish-monsterasp/dist/views/appointments/book.ejs');
copyIfSrcExists(bookSrc, 'publish-monsterasp/views/appointments/book.ejs');

// 5. Appointments Confirmation View
const confirmationSrc = 'Dental city/src/views/appointments/confirmation.ejs';
copyIfSrcExists(confirmationSrc, 'views/appointments/confirmation.ejs');
copyIfSrcExists(confirmationSrc, 'Dental city/dist/views/appointments/confirmation.ejs');
copyIfSrcExists(confirmationSrc, 'dist/views/appointments/confirmation.ejs');
copyIfSrcExists(confirmationSrc, 'publish-monsterasp/dist/views/appointments/confirmation.ejs');
copyIfSrcExists(confirmationSrc, 'publish-monsterasp/views/appointments/confirmation.ejs');

// 6. CSS & JS
copyIfSrcExists('public/css/sidebar.css', 'Dental city/public/css/sidebar.css');
copyIfSrcExists('public/css/theme.css', 'Dental city/public/css/theme.css');
copyIfSrcExists('public/js/sidebar.js', 'Dental city/public/js/sidebar.js');
copyIfSrcExists('public/js/theme.js', 'Dental city/public/js/theme.js');

copyIfSrcExists('public/css/sidebar.css', 'publish-monsterasp/public/css/sidebar.css');
copyIfSrcExists('public/css/theme.css', 'publish-monsterasp/public/css/theme.css');
copyIfSrcExists('public/js/sidebar.js', 'publish-monsterasp/public/js/sidebar.js');
copyIfSrcExists('public/js/theme.js', 'publish-monsterasp/public/js/theme.js');

console.log('All mirrors synchronized successfully!');
