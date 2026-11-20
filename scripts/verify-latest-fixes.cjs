const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- Starting Comprehensive Verification of Latest Fixes ---');

let passed = 0;
let failed = 0;

function test(description, fn) {
    try {
        fn();
        console.log(`  ✓ [PASS] ${description}`);
        passed++;
    } catch (err) {
        console.error(`  ✗ [FAIL] ${description}`);
        console.error(`    Error: ${err.message}`);
        failed++;
    }
}

// 1. Verify Prescriptions and Labs is completely eliminated
test('No "الروشتات والمعامل" or "Prescriptions & Labs" exists in views or consolidated file', () => {
    const viewsDir = path.resolve(__dirname, '../views');
    const files = [];

    function collectFiles(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const e of entries) {
            const full = path.join(dir, e.name);
            if (e.isDirectory()) collectFiles(full);
            else if (e.name.endsWith('.ejs') || e.name.endsWith('.js') || e.name.endsWith('.html')) {
                files.push(full);
            }
        }
    }
    collectFiles(viewsDir);

    for (const f of files) {
        const content = fs.readFileSync(f, 'utf8');
        assert(!content.includes('الروشتات والمعامل'), `File ${f} contains 'الروشتات والمعامل'`);
        assert(!content.includes('Prescriptions & Labs'), `File ${f} contains 'Prescriptions & Labs'`);
        assert(!content.includes('prescriptions-panel'), `File ${f} contains 'prescriptions-panel'`);
        assert(!content.includes('prescriptions-tab'), `File ${f} contains 'prescriptions-tab'`);
    }

    const consolidatedPath = path.resolve(__dirname, '../CONSOLIDATED_PROJECT_CODE.md');
    if (fs.existsSync(consolidatedPath)) {
        const consContent = fs.readFileSync(consolidatedPath, 'utf8');
        assert(!consContent.includes('الروشتات والمعامل'), "CONSOLIDATED_PROJECT_CODE.md contains 'الروشتات والمعامل'");
        assert(!consContent.includes('Prescriptions & Labs'), "CONSOLIDATED_PROJECT_CODE.md contains 'Prescriptions & Labs'");
    }
});

// 2. Verify Doctor Hazem Hagag name and Chief of Staff role colors match
test('Doctor Hazem Hagag name and role color match in sidebar and dashboard', () => {
    const sidebarCss = fs.readFileSync(path.resolve(__dirname, '../public/css/sidebar.css'), 'utf8');
    assert(sidebarCss.includes('.sidebar-user-name'), 'sidebar.css has .sidebar-user-name');
    assert(sidebarCss.includes('.sidebar-user-role'), 'sidebar.css has .sidebar-user-role');
    
    // Check that sidebar-user-name has #0284c7 (same primary blue as role)
    const nameMatch = sidebarCss.match(/\.sidebar-user-name\s*\{[^}]*color:\s*([^;]+);/s);
    assert(nameMatch, 'Could not find color rule for .sidebar-user-name');
    assert(nameMatch[1].includes('#0284c7'), `.sidebar-user-name color should be #0284c7, got ${nameMatch[1]}`);

    const roleMatch = sidebarCss.match(/\.sidebar-user-role\s*\{[^}]*color:\s*([^;]+);/s);
    assert(roleMatch, 'Could not find color rule for .sidebar-user-role');
    assert(roleMatch[1].includes('#0284c7'), `.sidebar-user-role color should be #0284c7, got ${roleMatch[1]}`);

    // Check dark mode
    assert(sidebarCss.includes('.sidebar-user-name,') && sidebarCss.includes('#38bdf8 !important'), 'Dark mode color matches #38bdf8');
});

// 3. Verify Normal Mode Text Contrast in navigation links
test('Normal Mode Text Contrast is deep black for navigation links and white for active', () => {
    const sidebarCss = fs.readFileSync(path.resolve(__dirname, '../public/css/sidebar.css'), 'utf8');
    const linkMatch = sidebarCss.match(/\.sidebar-link\s*\{[^}]*color:\s*([^;]+);/s);
    assert(linkMatch, 'Could not find color rule for .sidebar-link');
    assert(linkMatch[1].includes('#0f172a'), `Normal mode link color should be deep black #0f172a, got ${linkMatch[1]}`);

    const activeMatch = sidebarCss.match(/\.sidebar-link\.active[^{]*\{[^}]*color:\s*([^;]+);/s);
    assert(activeMatch, 'Could not find active link color');
    assert(activeMatch[1].includes('#ffffff'), `Active link color should be white #ffffff, got ${activeMatch[1]}`);
});

// 4. Verify Patient Portal Authentication and Privacy Architecture
test('Patient portal template handles both unauthenticated and authenticated states', () => {
    const portalEjs = fs.readFileSync(path.resolve(__dirname, '../views/patient/portal.ejs'), 'utf8');
    assert(portalEjs.includes('if (!authenticated)'), 'portal.ejs contains unauthenticated check');
    assert(portalEjs.includes('id="patientLoginForm"'), 'portal.ejs contains patient login form');
    assert(portalEjs.includes('copyMagicLink()'), 'portal.ejs contains copyMagicLink function');
    assert(portalEjs.includes('/Patient/Logout'), 'portal.ejs contains logout button');
    assert(portalEjs.includes('cancelPatientBooking'), 'portal.ejs contains cancel booking function');
});

// 5. Verify Brand Standardization: "مركز دينتال سيتي"
test('Brand name is standardized to "مركز دينتال سيتي" across all views', () => {
    const viewsDir = path.resolve(__dirname, '../views');
    const files = [];

    function collectFiles(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const e of entries) {
            const full = path.join(dir, e.name);
            if (e.isDirectory()) collectFiles(full);
            else if (e.name.endsWith('.ejs')) {
                files.push(full);
            }
        }
    }
    collectFiles(viewsDir);

    for (const f of files) {
        const content = fs.readFileSync(f, 'utf8');
        assert(!content.includes('مركز دينتل سيتي'), `File ${f} contains 'مركز دينتل سيتي' without alif`);
    }
});

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
