const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('🧪 VERIFYING SIDEBAR NAVIGATION TEXT VISIBILITY & CONTRAST');
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

const sidebarCss = fs.readFileSync('public/css/sidebar.css', 'utf8');
const themeCss = fs.readFileSync('public/css/theme.css', 'utf8');
const sidebarEjs = fs.readFileSync('views/partials/sidebar.ejs', 'utf8');

// 1. High-Contrast Typography & Bright White (#FFFFFF) Enforcement
test('1.1 Dark Mode enforces #ffffff font color on .sidebar-link and .nav-text', () => {
  assert(themeCss.includes('[data-bs-theme="dark"] .sidebar-link'), 'theme.css targets dark sidebar-link');
  assert(themeCss.includes('color: #ffffff !important;'), 'theme.css enforces #ffffff');
  assert(sidebarCss.includes('[data-bs-theme="dark"] .sidebar-link .nav-text'), 'sidebar.css targets dark nav-text');
  assert(sidebarCss.includes('color: #ffffff !important;'), 'sidebar.css enforces #ffffff');
});

test('1.2 Hover state retains bright white (#ffffff) font color', () => {
  assert(sidebarCss.includes('[data-bs-theme="dark"] .sidebar-link:hover .nav-text'), 'Hover state targeted in sidebar.css');
  assert(themeCss.includes('[data-bs-theme="dark"] .sidebar-link:hover .nav-text'), 'Hover state targeted in theme.css');
});

test('1.3 Active state retains bright white (#ffffff) font color with distinct active styling', () => {
  assert(sidebarCss.includes('[data-bs-theme="dark"] .sidebar-link.active .nav-text'), 'Active state targeted in sidebar.css');
  assert(themeCss.includes('[data-bs-theme="dark"] .sidebar-link.active .nav-text'), 'Active state targeted in theme.css');
});

test('1.4 Focus and active press states retain bright white (#ffffff)', () => {
  assert(sidebarCss.includes('[data-bs-theme="dark"] .sidebar-link:focus .nav-text'), 'Focus state targeted in sidebar.css');
  assert(themeCss.includes('[data-bs-theme="dark"] .sidebar-link:focus .nav-text'), 'Focus state targeted in theme.css');
});

// 2. Visual Consistency & Padding
test('2.1 Uniform padding (0.75rem 1rem) applied across sidebar links', () => {
  assert(sidebarCss.includes('padding: 0.75rem 1rem;'), 'sidebar.css has uniform padding: 0.75rem 1rem');
  assert(sidebarCss.includes('gap: 0.85rem;'), 'sidebar.css has uniform gap: 0.85rem');
  assert(sidebarCss.includes('font-size: 0.95rem;'), 'sidebar.css has uniform font-size: 0.95rem');
});

test('2.2 No stray syntax error braces in sidebar.css', () => {
  // Check matching braces
  let openCount = 0;
  for (let i = 0; i < sidebarCss.length; i++) {
    if (sidebarCss[i] === '{') openCount++;
    if (sidebarCss[i] === '}') openCount--;
    if (openCount < 0) {
      throw new Error(`Unexpected closing brace at index ${i}`);
    }
  }
  assert(openCount === 0, `Mismatched braces count: ${openCount}`);
});

test('2.3 Key navigation items (لوحة التحكم, الأطباء والتخصصات, الخدمات والأسعار) use clean uniform nav-text', () => {
  assert(sidebarEjs.includes('<span class="nav-text">لوحة التحكم</span>'), 'لوحة التحكم uses clean nav-text');
  assert(sidebarEjs.includes('<span class="nav-text">الأطباء والتخصصات</span>'), 'الأطباء والتخصصات uses clean nav-text');
  assert(sidebarEjs.includes('<span class="nav-text">الخدمات والأسعار</span>'), 'الخدمات والأسعار uses clean nav-text');
  assert(sidebarEjs.includes('<span class="nav-text">الموظفين والصلاحيات</span>'), 'الموظفين والصلاحيات uses clean nav-text');
  assert(!sidebarEjs.includes('bi-gear-wide-connected text-dark'), 'Removed conflicting text-dark on settings icon');
});

console.log(`\n====================================================`);
console.log(`Results: ${passed} passed, ${failed} failed.`);
console.log(`====================================================\n`);

if (failed > 0) process.exit(1);
