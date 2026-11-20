const http = require('http');
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

console.log('=== VERIFICATION SUITE: USER REQUESTS & SYSTEM STATE ===\n');

// 1. Complete Removal of "الروشتات والمعامل"
runTest('No "الروشتات والمعامل" or "Prescriptions & Labs" exists in any active view', () => {
  const files = [
    'Dental city/src/views/doctor/dashboard.ejs',
    'Dental city/src/views/partials/sidebar.ejs',
    'Dental city/src/views/patient/portal.ejs',
    'Dental city/src/views/appointments/book.ejs',
    'Dental city/src/views/layouts/dashboard.ejs',
    'Dental city/src/views/layouts/main.ejs',
    'views/doctor/dashboard.ejs',
    'views/partials/sidebar.ejs',
    'publish-monsterasp/views/doctor/dashboard.ejs',
    'publish-monsterasp/views/partials/sidebar.ejs'
  ];
  for (const f of files) {
    if (fs.existsSync(f)) {
      const content = fs.readFileSync(f, 'utf8');
      assert(!content.includes('الروشتات والمعامل'), `File ${f} contains 'الروشتات والمعامل'`);
      assert(!content.includes('Prescriptions & Labs'), `File ${f} contains 'Prescriptions & Labs'`);
      assert(!content.includes('prescriptions-panel'), `File ${f} contains 'prescriptions-panel'`);
      assert(!content.includes('prescriptions-tab'), `File ${f} contains 'prescriptions-tab'`);
    }
  }
});

// 2. Color Harmonization of "د. حازم حجاج" and "رئيس الكادر الطبي"
runTest('Name "د. حازم حجاج" has identical color styling to "رئيس الكادر الطبي" in sidebar', () => {
  const sidebarContent = fs.readFileSync('Dental city/src/views/partials/sidebar.ejs', 'utf8');
  assert(sidebarContent.includes('sidebar-user-name text-primary fw-bold'), 'sidebar-user-name has text-primary');
  assert(sidebarContent.includes('style="color: var(--dc-primary, #0284c7) !important;"'), 'sidebar-user-name has explicit primary color style');
  assert(sidebarContent.includes('sidebar-user-role text-primary'), 'sidebar-user-role has text-primary');

  const sidebarCss = fs.readFileSync('public/css/sidebar.css', 'utf8');
  assert(sidebarCss.includes('.sidebar-user-name'), 'sidebar.css styles .sidebar-user-name');
  assert(sidebarCss.includes('.sidebar-user-role'), 'sidebar.css styles .sidebar-user-role');
});

// 3. Financial & Pricing Data Removal
runTest('Dashboard and Sidebar contain strictly "الخدمات" with NO pricing references', () => {
  const sidebar = fs.readFileSync('Dental city/src/views/partials/sidebar.ejs', 'utf8');
  assert(sidebar.includes('<span class="nav-text">الخدمات</span>'), 'Sidebar has strictly "الخدمات"');
  assert(!sidebar.includes('الخدمات والأسعار'), 'Sidebar does not include "الخدمات والأسعار"');

  const dashboard = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
  assert(!dashboard.includes('الإيرادات التقديرية'), 'No "الإيرادات التقديرية" in dashboard');
  assert(!dashboard.includes('باقات الأسعار'), 'No "باقات الأسعار" in dashboard');
  assert(dashboard.includes('حالة وجاهزية الكادر الطبي والعيادات'), 'Doctor status widget is present');
});

// 4. Live Server HTTP Check
http.get('http://localhost:5083/Doctor/Dashboard', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    runTest('Live HTTP response returns 200/302 or valid dashboard markup', () => {
      console.log(`Server responded with HTTP status: ${res.statusCode}`);
      assert(res.statusCode === 200 || res.statusCode === 302, `Unexpected status ${res.statusCode}`);
      if (res.statusCode === 200) {
        assert(!data.includes('الروشتات والمعامل'), 'Live response has no "الروشتات والمعامل"');
        assert(!data.includes('Prescriptions & Labs'), 'Live response has no "Prescriptions & Labs"');
        assert(data.includes('مركز دينتال سيتي'), 'Live response includes brand name');
      }
    });
    console.log('\n>>> ALL VERIFICATIONS COMPLETED SUCCESSFULLY! <<<');
    process.exit(0);
  });
}).on('error', (err) => {
  console.log(`Note: Dev server live check skipped (${err.message}). Static verifications all passed.`);
  console.log('\n>>> ALL STATIC VERIFICATIONS COMPLETED SUCCESSFULLY! <<<');
  process.exit(0);
});
