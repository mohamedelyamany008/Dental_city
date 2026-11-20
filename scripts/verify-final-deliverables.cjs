const fs = require('fs');
const path = require('path');
const assert = require('assert');
const ejs = require('ejs');

console.log('====================================================');
console.log('       Final Deliverables Verification Suite        ');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`\x1b[32m✔ [PASS]\x1b[0m ${description}`);
    passCount++;
  } catch (err) {
    console.error(`\x1b[31m✖ [FAIL]\x1b[0m ${description}`);
    console.error(`         ${err.message}`);
    failCount++;
  }
}

// 1. Verify complete elimination of Prescriptions & Labs
test('No "الروشتات والمعامل" or "Prescriptions & Labs" exists in views or consolidated file', () => {
  const filesToCheck = [
    'Dental city/src/views/doctor/dashboard.ejs',
    'Dental city/src/views/partials/sidebar.ejs',
    'Dental city/src/views/appointments/book.ejs',
    'Dental city/src/views/patient/portal.ejs',
    'Dental city/src/views/layouts/dashboard.ejs',
    'Dental city/src/views/layouts/main.ejs',
    'CONSOLIDATED_PROJECT_CODE.md'
  ];

  filesToCheck.forEach(f => {
    if (fs.existsSync(f)) {
      const content = fs.readFileSync(f, 'utf8');
      assert(!content.includes('الروشتات والمعامل'), `File ${f} contains 'الروشتات والمعامل'`);
      assert(!content.includes('Prescriptions & Labs'), `File ${f} contains 'Prescriptions & Labs'`);
      assert(!content.includes('prescriptions-panel'), `File ${f} contains 'prescriptions-panel'`);
      assert(!content.includes('prescriptions-tab'), `File ${f} contains 'prescriptions-tab'`);
    }
  });
});

// 2. Doctor Name Color Harmonization (د. حازم حجاج & رئيس الكادر الطبي)
test('Doctor name and title have harmonized blue styling in sidebar and CSS', () => {
  const sidebarEjs = fs.readFileSync('Dental city/src/views/partials/sidebar.ejs', 'utf8');
  assert(sidebarEjs.includes('sidebar-user-name text-primary fw-bold'), 'sidebar-user-name has text-primary in sidebar.ejs');
  assert(sidebarEjs.includes('sidebar-user-role text-primary'), 'sidebar-user-role has text-primary in sidebar.ejs');

  const sidebarCss = fs.readFileSync('public/css/sidebar.css', 'utf8');
  assert(sidebarCss.includes('.sidebar-user-name') && sidebarCss.includes('color: #0284c7 !important;'), 'sidebar-user-name has blue color in sidebar.css');
  assert(sidebarCss.includes('.sidebar-user-role') && sidebarCss.includes('color: #0284c7 !important;'), 'sidebar-user-role has blue color in sidebar.css');

  const themeCss = fs.readFileSync('public/css/theme.css', 'utf8');
  assert(themeCss.includes('.sidebar-user-name') && themeCss.includes('#38bdf8 !important;'), 'sidebar user name and role have dark mode light blue in theme.css');
});

// 3. Sidebar White Text High Contrast (#FFFFFF)
test('Sidebar navigation items enforce bright white (#FFFFFF) across states', () => {
  const sidebarCss = fs.readFileSync('public/css/sidebar.css', 'utf8');
  assert(sidebarCss.includes('.sidebar-link .nav-text'), 'sidebar-link .nav-text rule exists');
  assert(sidebarCss.includes('#ffffff !important;'), '#ffffff !important present for sidebar nav text');
});

// 4. Patient Booking Management Module
test('Patient Booking module exists with search, filter, table, and details modal', () => {
  const sidebarEjs = fs.readFileSync('Dental city/src/views/partials/sidebar.ejs', 'utf8');
  assert(sidebarEjs.includes('بيانات حجوزات المرضى'), 'Sidebar includes "بيانات حجوزات المرضى"');
  assert(sidebarEjs.includes('data-dashboard-tab="patients-panel"'), 'Sidebar links to patients-panel');

  const dashboardEjs = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
  assert(dashboardEjs.includes('id="patients-panel"'), 'dashboard has patients-panel');
  assert(dashboardEjs.includes('id="patientBookingSearchInput"'), 'dashboard has patient search input');
  assert(dashboardEjs.includes('id="patientBookingStatusFilter"'), 'dashboard has status filter');
  assert(dashboardEjs.includes('id="patientDetailsModal"'), 'dashboard has patientDetailsModal');
  assert(dashboardEjs.includes('function filterPatientBookings()'), 'dashboard has filterPatientBookings JS function');
  assert(dashboardEjs.includes('function openPatientDetailsModal(btn)'), 'dashboard has openPatientDetailsModal JS function');
  assert(dashboardEjs.includes('function updatePatientBookingStatusAjax('), 'dashboard has updatePatientBookingStatusAjax JS function');
});

// 5. Booking Summary Modal & Card Dark Mode Support
test('Booking summary card and modal have dark mode high contrast styling', () => {
  const bookEjs = fs.readFileSync('Dental city/src/views/appointments/book.ejs', 'utf8');
  assert(bookEjs.includes('[data-bs-theme="dark"] .summary-card'), 'book.ejs has dark mode .summary-card');
  assert(bookEjs.includes('[data-bs-theme="dark"] .summary-value'), 'book.ejs has dark mode .summary-value');

  const themeCss = fs.readFileSync('public/css/theme.css', 'utf8');
  assert(themeCss.includes('#bookingSummaryModal .modal-content'), 'theme.css has #bookingSummaryModal dark mode styling');
});

// 6. EJS Compilation Check
test('Modified EJS files compile with zero syntax errors', () => {
  const files = [
    'Dental city/src/views/doctor/dashboard.ejs',
    'Dental city/src/views/partials/sidebar.ejs',
    'Dental city/src/views/appointments/book.ejs'
  ];

  files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    ejs.compile(content, { filename: f });
  });
});

console.log(`\nVerification Complete: ${passCount} Passed, ${failCount} Failed.`);
if (failCount > 0) process.exit(1);
