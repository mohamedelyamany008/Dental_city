const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('🧪 VERIFYING LATEST USER REQUESTS:');
console.log('   1. Complete removal of Prescriptions & Labs section');
console.log('   2. Matching doctor name color to "رئيس الكادر الطبي"');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

const dashboardEjs = fs.readFileSync('views/doctor/dashboard.ejs', 'utf8');
const sidebarEjs = fs.readFileSync('views/partials/sidebar.ejs', 'utf8');
const themeCss = fs.readFileSync('public/css/theme.css', 'utf8');
const sidebarCss = fs.readFileSync('public/css/sidebar.css', 'utf8');

// 1. Complete Removal of "الروشتات والمعامل"
test('1.1 Dashboard markup contains NO "الروشتات والمعامل" or "(Prescriptions & Labs)"', () => {
  assert(!dashboardEjs.includes('الروشتات والمعامل'), 'No "الروشتات والمعامل" in dashboard');
  assert(!dashboardEjs.includes('Prescriptions & Labs'), 'No "Prescriptions & Labs" in dashboard');
  assert(!dashboardEjs.includes('id="prescriptions-tab"'), 'No prescriptions-tab');
  assert(!dashboardEjs.includes('id="prescriptions-panel"'), 'No prescriptions-panel');
  assert(!dashboardEjs.includes('id="prescriptions-modal"'), 'No prescriptions-modal');
});

test('1.2 Sidebar markup contains NO "الروشتات والمعامل" or "(Prescriptions & Labs)"', () => {
  assert(!sidebarEjs.includes('الروشتات والمعامل'), 'No "الروشتات والمعامل" in sidebar');
  assert(!sidebarEjs.includes('Prescriptions & Labs'), 'No "Prescriptions & Labs" in sidebar');
  assert(!sidebarEjs.includes('data-dashboard-tab="prescriptions-panel"'), 'No prescriptions link in sidebar');
});

test('1.3 No pill emoji 💊 in dashboard navigation or tabs', () => {
  assert(!dashboardEjs.includes('💊'), 'No pill emoji in dashboard.ejs');
  assert(!sidebarEjs.includes('💊'), 'No pill emoji in sidebar.ejs');
});

// 2. Doctor Name Color Harmonization (د. حازم حجاج & رئيس الكادر الطبي)
test('2.1 Doctor name has doc-name-header and text-primary styling', () => {
  assert(dashboardEjs.includes('doc-name-header'), 'Doctor name element uses doc-name-header class');
  assert(dashboardEjs.includes('style="color: var(--primary-blue, #0284c7) !important;"'), 'Doctor name has inline primary color fallback');
  assert(dashboardEjs.includes('<i class="bi bi-patch-check-fill text-primary"'), 'Doctor title has verified badge in text-primary');
});

test('2.2 CSS enforces primary blue for doctor name matching title', () => {
  assert(themeCss.includes('.doc-name-header'), 'theme.css contains .doc-name-header');
  assert(themeCss.includes('color: var(--dc-primary, #0284c7) !important;'), 'Light mode sets doctor name to --dc-primary');
  assert(themeCss.includes('[data-bs-theme="dark"] .doc-name-header'), 'Dark mode selector for doctor name exists');
  assert(themeCss.includes('color: #38bdf8 !important;'), 'Dark mode sets doctor name to high-contrast blue');
});

test('2.3 Doctor card status badge and schedule box are clean', () => {
  assert(dashboardEjs.includes('doctor-card-status-badge'), 'Status badge uses doctor-card-status-badge');
  assert(dashboardEjs.includes('doctor-status-dot'), 'Avatar has doctor-status-dot');
  assert(dashboardEjs.includes('doctor-schedule-box'), 'Doctor schedule box exists');
  assert(sidebarCss.includes('.doctor-card-status-badge'), 'sidebar.css styles .doctor-card-status-badge');
});

test('2.4 EJS template compiles with zero syntax errors', () => {
  const pathMod = require('path');
  const ejs = require(pathMod.resolve('Dental city/node_modules/ejs'));
  ejs.compile(dashboardEjs, { filename: 'dashboard.ejs' });
});

console.log(`\n====================================================`);
console.log(`Results: ${passed} passed, ${failed} failed.`);
console.log(`====================================================\n`);

if (failed > 0) process.exit(1);
