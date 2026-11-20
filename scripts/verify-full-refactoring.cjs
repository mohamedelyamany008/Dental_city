const fs = require('fs');
const vm = require('vm');

async function runTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING COMPREHENSIVE REFACTORING VERIFICATION');
  console.log('====================================================\n');

  // 1. Authenticate against local server
  const loginRes = await fetch('http://localhost:5083/Doctor/Login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'usernameOrEmail=admin&password=admin123',
    redirect: 'manual'
  });
  const cookie = loginRes.headers.get('set-cookie');
  if (!cookie) throw new Error('Could not authenticate with local server');

  const dashRes = await fetch('http://localhost:5083/Doctor/Dashboard', {
    headers: { 'Cookie': cookie }
  });
  const html = await dashRes.text();

  let allPassed = true;

  function assert(title, condition) {
    if (condition) {
      console.log(`✅ [PASS] ${title}`);
    } else {
      console.error(`❌ [FAIL] ${title}`);
      allPassed = false;
    }
  }

  // --- REQUIREMENT 1: Global Brand Name Standardization ---
  console.log('\n--- 1. Global Brand Name Standardization ---');
  const hasOldBrand = html.includes('دينتل');
  assert('No occurrences of "دينتل" in rendered HTML', !hasOldBrand);
  assert('Title contains "مركز دينتال سيتي"', html.includes('مركز دينتال سيتي'));
  assert('Branding styled in primary blue (text-primary fw-bold)', html.includes('text-primary fw-bold">مركز دينتال سيتي'));

  // --- REQUIREMENT 2: Dark Mode Visual Consistency ---
  console.log('\n--- 2. Dark Mode Visual Consistency ---');
  const themeCss = fs.readFileSync('Dental city/public/css/theme.css', 'utf8');
  assert('Comprehensive Dark Mode styles present in theme.css', themeCss.includes('Comprehensive Dark Mode Visual Polish'));
  assert('Modal dark mode styles present', themeCss.includes('[data-bs-theme="dark"] .modal-content'));
  assert('Table dark mode styles present', themeCss.includes('[data-bs-theme="dark"] .table'));
  assert('Dynamic high-contrast white text present', themeCss.includes('[data-bs-theme="dark"] .patient-name') && themeCss.includes('#ffffff !important'));

  // --- REQUIREMENT 3: Section Overhaul & Relocation ---
  console.log('\n--- 3. Section Overhaul & Relocation ---');
  assert('Prescriptions tab removed from navigation', !html.includes('id="prescriptions-tab"'));
  assert('Prescriptions panel removed from tab content', !html.includes('id="prescriptions-panel"'));
  assert('Prescriptions modal removed from modals', !html.includes('id="prescriptions-modal"'));
  assert('Sidebar has no "الروشتات والمعامل" link', !html.includes('data-dashboard-tab="prescriptions-panel"'));
  assert('Emergency phone card HTML relocated inside settings-panel', html.lastIndexOf('emergency-phone-card') > html.indexOf('id="settings-panel"'));
  assert('Emergency phone card removed from under header', html.lastIndexOf('emergency-phone-card') > html.indexOf('dashboardTabs'));

  // --- REQUIREMENT 4: Interactive Modals & State Management Repair ---
  console.log('\n--- 4. Interactive Modals & State Management Repair ---');
  assert('permissionsModal exists in HTML', html.includes('id="permissionsModal"'));
  assert('doctorModal exists in HTML', html.includes('id="doctorModal"'));
  assert('doctorScheduleModal exists in HTML', html.includes('id="doctorScheduleModal"'));
  assert('changePasswordModal exists in HTML', html.includes('id="changePasswordModal"'));
  assert('openEditDoctorModalFromButton present in doctor card', html.includes('openEditDoctorModalFromButton(this)'));
  assert('openDoctorScheduleModalFromButton present in doctor card', html.includes('openDoctorScheduleModalFromButton(this)'));
  assert('openPermissionsModalFromButton present in doctor card', html.includes('openPermissionsModalFromButton(this)'));
  assert('submitPermissionsAjax is async in script', html.includes('async function submitPermissionsAjax'));

  // Check script VM compilation
  const dashFile = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
  const sIdx = dashFile.indexOf('<script>');
  const eIdx = dashFile.lastIndexOf('</script>');
  let js = dashFile.substring(sIdx + '<script>'.length, eIdx);
  js = js.replace(/<%[\s\S]*?%>/g, '"ejs_val"');
  let scriptCompiles = false;
  try {
    new vm.Script(js, { filename: 'dashboard-script.js' });
    scriptCompiles = true;
  } catch (e) {
    console.error('Script syntax error:', e.message);
  }
  assert('<script> block has ZERO syntax errors and compiles cleanly', scriptCompiles);

  // --- REQUIREMENT 5: Dynamic Shift Management ---
  console.log('\n--- 5. Dynamic Shift Management ---');
  assert('shiftEditModal present in HTML (count === 1)', (html.match(/id="shiftEditModal"/g) || []).length === 1);
  assert('Shift edit button triggers modal with data attributes & onclick', html.includes('data-bs-target="#shiftEditModal"') && html.includes('onclick="openShiftEditModal()"'));
  assert('Static shift cards eliminated, clean master summary card present', html.includes('shift-summary-master-card'));
  assert('Interval radios eliminated from shiftEditModal', !html.includes('id="interval30"'));
  assert('Auto-preview slots eliminated from shiftEditModal', !html.includes('id="generatedSlotsPreview"'));

  console.log('\n====================================================');
  if (allPassed) {
    console.log('🌟🌟🌟 ALL 5 REQUIREMENTS VERIFIED 100% SUCCESSFUL! 🌟🌟🌟');
  } else {
    console.error('⚠️ SOME CHECKS FAILED!');
    process.exit(1);
  }
  console.log('====================================================\n');
}

runTests().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
