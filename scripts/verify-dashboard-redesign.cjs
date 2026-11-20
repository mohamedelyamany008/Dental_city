const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('🧪 VERIFYING COMPREHENSIVE DASHBOARD REDESIGN & UI CLEANUP');
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

const dashboardEjs = fs.readFileSync(path.resolve(__dirname, '../views/doctor/dashboard.ejs'), 'utf8');
const sidebarEjs = fs.readFileSync(path.resolve(__dirname, '../views/partials/sidebar.ejs'), 'utf8');
const sidebarJs = fs.readFileSync(path.resolve(__dirname, '../public/js/sidebar.js'), 'utf8');
const sidebarCss = fs.readFileSync(path.resolve(__dirname, '../public/css/sidebar.css'), 'utf8');
const themeCss = fs.readFileSync(path.resolve(__dirname, '../public/css/theme.css'), 'utf8');

// 1. Dashboard vs Doctors Module Separation
test('1.1 Dashboard tabs separate #overview-panel and #doctors-panel', () => {
    assert(dashboardEjs.includes('id="overview-tab"'), 'overview-tab exists');
    assert(dashboardEjs.includes('data-bs-target="#overview-panel"'), 'overview-tab targets #overview-panel');
    assert(dashboardEjs.includes('id="doctors-tab"'), 'doctors-tab exists');
    assert(dashboardEjs.includes('data-bs-target="#doctors-panel"'), 'doctors-tab targets #doctors-panel');
});

test('1.2 #overview-panel is the default active executive summary tab', () => {
    assert(dashboardEjs.includes('id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview-panel"\n                    type="button" role="tab" aria-selected="true"'), 'overview-tab has aria-selected="true"');
    assert(dashboardEjs.includes('id="overview-panel" role="tabpanel"'), 'overview-panel exists');
    assert(dashboardEjs.includes('overview-kpi-card'), 'overview-panel contains overview-kpi-card');
});

test('1.3 #overview-panel contains operational widgets (appointments, pending, finance, system status)', () => {
    assert(dashboardEjs.includes('إجمالي الحجوزات الطبية'), 'Contains total appointments metric');
    assert(dashboardEjs.includes('طلبات الانتظار العاجلة'), 'Contains urgent pending metric');
    assert(dashboardEjs.includes('الإيراد التقديري للحجوزات'), 'Contains financial overview metric');
    assert(dashboardEjs.includes('كفاءة التشغيل والجاهزية'), 'Contains system status metric');
    assert(dashboardEjs.includes('نظام الورديات وساعات العمل اليومية'), 'Contains daily shifts operational card');
    assert(dashboardEjs.includes('أحدث الحجوزات وطلبات الكشف الواردة'), 'Contains recent urgent bookings queue');
});

test('1.4 Sidebar decouples "لوحة التحكم" and "الأطباء والتخصصات"', () => {
    assert(sidebarEjs.includes('data-dashboard-tab="overview-panel"'), 'Sidebar has overview-panel target for dashboard');
    assert(sidebarEjs.includes('data-dashboard-tab="doctors-panel"'), 'Sidebar has doctors-panel target for doctors');
    assert(sidebarJs.includes("targetTabId = 'overview-panel'"), 'sidebar.js routes overview to overview-panel');
});

// 2. Removal of Backend Synchronization Badges
test('2.1 No visible Supabase Real-Time Active badge in dashboard HTML', () => {
    assert(!dashboardEjs.includes('id="realtimeSyncBadge"'), 'dashboard.ejs does not have realtimeSyncBadge in markup');
    assert(!dashboardEjs.includes('Supabase Real-Time Active'), 'dashboard.ejs does not display Supabase Real-Time Active');
    assert(!dashboardEjs.includes('متزامن لحظياً (Supabase Real-Time Active)'), 'dashboard.ejs does not display متزامن لحظياً');
});

// 3. Doctor Card Visual Correction
test('3.1 Doctor cards render status badge cleanly in header', () => {
    assert(dashboardEjs.includes('doctor-card-status-badge'), 'Doctor cards use doctor-card-status-badge');
    assert(dashboardEjs.includes('doctor-status-dot'), 'Doctor cards use doctor-status-dot');
    assert(sidebarCss.includes('.doctor-card-status-badge'), 'sidebar.css has .doctor-card-status-badge');
    assert(sidebarCss.includes('flex-shrink: 0'), 'doctor-card-status-badge has flex-shrink: 0');
});

// 4. UI Polish & Dark Mode
test('4.1 Uniform Dark Mode styles for new overview widgets', () => {
    assert(themeCss.includes('.overview-kpi-card'), 'theme.css styles .overview-kpi-card');
    assert(themeCss.includes('.overview-section-box'), 'theme.css styles .overview-section-box');
    assert(themeCss.includes('.doctor-card-status-badge'), 'theme.css styles .doctor-card-status-badge');
});

console.log(`\n====================================================`);
console.log(`Results: ${passed} passed, ${failed} failed.`);
console.log(`====================================================\n`);

if (failed > 0) process.exit(1);
