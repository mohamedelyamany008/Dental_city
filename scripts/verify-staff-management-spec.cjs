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

console.log('=== VERIFICATION SUITE: STAFF MANAGEMENT & SUPABASE PERSISTENCE ===\n');

// 1. Backend Data Synchronization & Persistence in AppointmentService & doctor.routes.ts
runTest('1.1 AppointmentService implements getStaff, addStaff, and deleteStaff querying Supabase', () => {
  const serviceCode = fs.readFileSync('Dental city/src/services/appointmentService.ts', 'utf8');
  assert(serviceCode.includes("from('Staff')"), 'AppointmentService queries Staff table');
  assert(serviceCode.includes('public static async getStaff()'), 'getStaff method exists');
  assert(serviceCode.includes('public static async addStaff('), 'addStaff method exists');
  assert(serviceCode.includes('public static async deleteStaff('), 'deleteStaff method exists');
  assert(serviceCode.includes(".delete()"), 'deleteStaff performs Supabase deletion');
  assert(serviceCode.includes(".eq('id', id)"), 'deleteStaff filters by id');
});

runTest('1.2 doctor.routes.ts provides AddStaff and DeleteStaff handlers and passes staff & credentials', () => {
  const routesCode = fs.readFileSync('Dental city/src/routes/doctor.routes.ts', 'utf8');
  assert(routesCode.includes("case 'AddStaff':"), 'AddStaff handler exists');
  assert(routesCode.includes("case 'DeleteStaff':"), 'DeleteStaff handler exists');
  assert(routesCode.includes('AppointmentService.deleteStaff(staffId)'), 'DeleteStaff invokes service deletion');
  assert(routesCode.includes('const staff = await AppointmentService.getStaff();'), 'Staff is fetched from database on load');
  assert(routesCode.includes('supabaseUrl:'), 'supabaseUrl is supplied to view');
  assert(routesCode.includes('supabaseKey:'), 'supabaseKey is supplied to view');
});

// 2. Staff Management Table in dashboard.ejs
runTest('2.1 Staff Management Table has Actions column and dynamic rows with Delete button', () => {
  const dashboardEjs = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
  assert(dashboardEjs.includes('إجراءات العمليات (Actions)'), 'Actions column header is present');
  assert(dashboardEjs.includes('staffList.forEach'), 'Table dynamically iterates over staff from database');
  assert(dashboardEjs.includes('delete-staff-btn'), 'Delete button class is present');
  assert(dashboardEjs.includes('deleteStaffMember('), 'Delete button triggers deleteStaffMember');
  assert(!dashboardEjs.includes('<td>admin@dentalcity.clinic</td>'), 'Hardcoded static staff rows are removed');
});

runTest('2.2 Add Staff Modal connects to AddStaff handler and Supabase persistence', () => {
  const dashboardEjs = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
  assert(dashboardEjs.includes('id="addStaffForm"'), 'addStaffForm exists');
  assert(dashboardEjs.includes('action="/Doctor/Dashboard?handler=AddStaff"'), 'Form actions AddStaff handler');
  assert(dashboardEjs.includes('name="name"'), 'Name input is properly bounded');
  assert(dashboardEjs.includes('name="role"'), 'Role select is properly bounded');
  assert(dashboardEjs.includes('name="phone"'), 'Phone input is properly bounded');
  assert(dashboardEjs.includes('onsubmit="handleStaffSubmit(event)"'), 'Form handles submission via handleStaffSubmit');
});

// 3. Client-side Realtime & AJAX operations
runTest('3.1 Client-side script implements deleteStaffMember, handleStaffSubmit, and Supabase Realtime channel', () => {
  const dashboardEjs = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
  assert(dashboardEjs.includes('async function deleteStaffMember('), 'deleteStaffMember function exists');
  assert(dashboardEjs.includes('async function handleStaffSubmit('), 'handleStaffSubmit function exists');
  assert(dashboardEjs.includes("handler=DeleteStaff"), 'deleteStaffMember sends DeleteStaff request');
  assert(dashboardEjs.includes("table: 'Staff'"), 'Realtime channel listens on Staff table changes');
  assert(dashboardEjs.includes('initSupabaseRealtime()'), 'initSupabaseRealtime is defined and invoked');
});

console.log('\n>>> ALL STAFF MANAGEMENT & SUPABASE SPECIFICATION TESTS PASSED! <<<');
