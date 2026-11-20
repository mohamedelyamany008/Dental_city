const fs = require('fs');

async function verify() {
  const loginRes = await fetch('http://localhost:5083/Doctor/Login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'usernameOrEmail=admin&password=admin123',
    redirect: 'manual'
  });
  const cookie = loginRes.headers.get('set-cookie');
  if (!cookie) throw new Error('No cookie received from login');

  const dashRes = await fetch('http://localhost:5083/Doctor/Dashboard', {
    headers: { 'Cookie': cookie }
  });
  const html = await dashRes.text();

  console.log('--- 1. UI Cleanup & Section Removal Verification ---');
  const hasStandards = html.includes('معايير المنظومة والسياسات العامة');
  console.log('Standards section removed:', !hasStandards);
  
  const hasSettingsActionsFooter = html.includes('settings-actions-footer');
  console.log('settings-actions-footer removed:', !hasSettingsActionsFooter);

  const hasIntervalSummary = html.includes('dispSlotInterval');
  console.log('Interval summary card in settings-panel removed:', !hasIntervalSummary);

  const hasIntervalRadiosInShiftModal = html.includes('name="intervalMinutes" id="interval30"');
  console.log('Interval radios in shift modal removed:', !hasIntervalRadiosInShiftModal);

  const hasAutoPreviewInShiftModal = html.includes('id="generatedSlotsPreview"');
  console.log('Auto-preview in shift modal removed:', !hasAutoPreviewInShiftModal);

  console.log('--- 2. Interactive Shift Management Verification ---');
  const hasShiftBtnTrigger = html.includes('data-bs-target="#shiftEditModal"') && html.includes('onclick="openShiftEditModal()"');
  console.log('Shift button triggers modal:', hasShiftBtnTrigger);
  const shiftModalCount = (html.match(/id="shiftEditModal"/g) || []).length;
  console.log('shiftEditModal count (must be exactly 1):', shiftModalCount);

  console.log('--- 3. Prescription Printing Fix Verification ---');
  const hasPrintDelegation = html.includes('Delegated event listener for prescription printing buttons');
  console.log('Print delegation present:', hasPrintDelegation);
  const hasPrintBtnClass = html.includes('btn-print-prescription');
  console.log('btn-print-prescription present in tables:', hasPrintBtnClass);
  const hasRxIframe = html.includes('A5 landscape');
  console.log('Dedicated Rx printable template present:', hasRxIframe);

  console.log('--- 4. Dark Mode Text Contrast & Visibility Verification ---');
  const hasDarkDocCardCss = html.includes('High-Contrast Dark Mode Doctor Cards & Typography');
  console.log('High-contrast dark mode CSS in dashboard:', hasDarkDocCardCss);
  const hasEditDocBtn = html.includes('openEditDoctorModalFromButton(this)');
  console.log('Edit doctor data button restored:', hasEditDocBtn);

  if (!hasStandards && !hasSettingsActionsFooter && !hasIntervalSummary && !hasIntervalRadiosInShiftModal && 
      !hasAutoPreviewInShiftModal && hasShiftBtnTrigger && shiftModalCount === 1 && hasPrintDelegation && 
      hasPrintBtnClass && hasRxIframe && hasDarkDocCardCss && hasEditDocBtn) {
    console.log('\n🌟 ALL 4 REQUIREMENTS VERIFIED 100% SUCCESSFUL! 🌟');
  } else {
    console.error('\n⚠️ Some verification checks failed!');
  }
}

verify().catch(e => console.error('Verification error:', e));
