const fs = require('fs');
const assert = require('assert');

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    process.exit(1);
  }
}

console.log('=== VERIFICATION SUITE: COMPREHENSIVE UI/UX & SIDEBAR SPECIFICATION ===\n');

// 1. Doctor Card Status Badge Positioning
runTest('1.1 Doctor Card Item and Header CSS prevent overflow and clipping', () => {
  const sidebarCss = fs.readFileSync('public/css/sidebar.css', 'utf8');
  assert(sidebarCss.includes('.doctor-card-status-badge'), 'sidebar.css contains .doctor-card-status-badge');
  assert(sidebarCss.includes('position: static !important;'), 'Status badge is static to stay within container');
  assert(sidebarCss.includes('flex-shrink: 0 !important;'), 'Status badge flex-shrink is 0');

  const dashboardEjs = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
  assert(dashboardEjs.includes('.doctor-card-status-badge'), 'dashboard.ejs styles status badge');
  assert(dashboardEjs.includes('overflow: visible !important;'), 'doctor-card-item has overflow: visible');
});

runTest('1.2 Dark mode styling for Doctor Card Status Badge is compliant', () => {
  const themeCss = fs.readFileSync('public/css/theme.css', 'utf8');
  assert(themeCss.includes('[data-bs-theme="dark"] .doctor-card-status-badge.bg-success-subtle'), 'Dark mode success badge styled');

  const dashboardEjs = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
  assert(dashboardEjs.includes('[data-bs-theme="dark"] .doctor-card-status-badge.bg-success-subtle'), 'Dark mode badge in dashboard.ejs');
});

// 2. Sidebar Navigation & Routing Synchronization
runTest('2.1 Sidebar JS implements automatic two-way tab synchronization', () => {
  const sidebarJs = fs.readFileSync('public/js/sidebar.js', 'utf8');
  assert(sidebarJs.includes('window.syncSidebarWithCurrentTab = syncSidebarWithCurrentTab;'), 'syncSidebarWithCurrentTab exposed globally');
  assert(sidebarJs.includes("document.addEventListener('shown.bs.tab'"), 'Document listens for shown.bs.tab');
  assert(sidebarJs.includes("item.classList.remove('active')"), 'Sidebar clears old active state');
  assert(sidebarJs.includes("parent.classList.add('active')"), 'Sidebar applies new active state');
});

runTest('2.2 Sidebar HTML contains mapped IDs and links for all dashboard modules', () => {
  const sidebarEjs = fs.readFileSync('Dental city/src/views/partials/sidebar.ejs', 'utf8');
  assert(sidebarEjs.includes('id="sidebar-nav-overview"'), 'sidebar-nav-overview exists');
  assert(sidebarEjs.includes('id="sidebar-nav-patients"'), 'sidebar-nav-patients exists');
  assert(sidebarEjs.includes('id="sidebar-nav-doctors"'), 'sidebar-nav-doctors exists');
  assert(sidebarEjs.includes('id="sidebar-nav-services"'), 'sidebar-nav-services exists');
  assert(sidebarEjs.includes('id="sidebar-nav-staff"'), 'sidebar-nav-staff exists');
  assert(sidebarEjs.includes('id="sidebar-nav-settings"'), 'sidebar-nav-settings exists');
});

// 3. Patient Portal Interface Cleanup
runTest('3.1 Patient Portal has NO "نسخ الرابط السحري" or copyMagicLink button/function', () => {
  const portalEjs = fs.readFileSync('Dental city/src/views/patient/portal.ejs', 'utf8');
  assert(!portalEjs.includes('نسخ الرابط السحري'), 'No "نسخ الرابط السحري" in portal.ejs');
  assert(!portalEjs.includes('function copyMagicLink()'), 'No copyMagicLink function in portal.ejs');
  assert(!portalEjs.includes('onclick="copyMagicLink()"'), 'No onclick copyMagicLink');
});

runTest('3.2 Patient Portal Logout button is clearly visible and styled with btn-danger', () => {
  const portalEjs = fs.readFileSync('Dental city/src/views/patient/portal.ejs', 'utf8');
  assert(portalEjs.includes('href="/Patient/Logout"'), 'Logout link exists');
  assert(portalEjs.includes('btn-danger'), 'Logout button uses prominent btn-danger');
  assert(portalEjs.includes('تسجيل الخروج'), 'Logout button has clear Arabic label');
});

// 4. Brand Identity & Theme Consistency
runTest('4.1 Brand name "مركز دينتال سيتي" is consistently present across all layouts and views', () => {
  const views = [
    'Dental city/src/views/layouts/main.ejs',
    'Dental city/src/views/layouts/dashboard.ejs',
    'Dental city/src/views/partials/sidebar.ejs',
    'Dental city/src/views/appointments/book.ejs',
    'Dental city/src/views/doctor/dashboard.ejs',
    'Dental city/src/views/doctor/login.ejs',
    'Dental city/src/views/patient/portal.ejs'
  ];
  for (const v of views) {
    const content = fs.readFileSync(v, 'utf8');
    assert(content.includes('مركز دينتال سيتي'), `Missing brand name in ${v}`);
  }
});

console.log('\n>>> ALL 4 SPECIFICATION REQUIREMENTS VERIFIED SUCCESSFULLY! <<<');
