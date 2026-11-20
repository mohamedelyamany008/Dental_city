const http = require('http');

function postLogin(phoneOrRef) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({ phoneOrRef }).toString();
    const req = http.request({
      hostname: 'localhost',
      port: 5083,
      path: '/Patient/Login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data), headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function getPortal(cookie, query = '') {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5083,
      path: '/Patient/Portal' + (query ? '?' + query : ''),
      method: 'GET',
      headers: {
        'Cookie': cookie || '',
        'Accept': 'text/html'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, html: data });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  console.log('==================================================');
  console.log('   Testing Patient Portal Login & Data Retrieval   ');
  console.log('==================================================\n');

  // Test 1: Nonexistent phone
  console.log('Test 1: Login with Nonexistent Phone (01000000000)');
  const res1 = await postLogin('01000000000');
  console.log('Status:', res1.status);
  console.log('Response:', res1.data);
  if (res1.status === 404 && res1.data.success === false) {
    console.log('\x1b[32m✔ PASS: Rejected nonexistent phone as expected\x1b[0m\n');
  } else {
    console.log('\x1b[31m✖ FAIL: Did not properly reject nonexistent phone\x1b[0m\n');
  }

  // Test 2: Nonexistent booking reference
  console.log('Test 2: Login with Nonexistent Reference (DC-9999-9999)');
  const res2 = await postLogin('DC-9999-9999');
  console.log('Status:', res2.status);
  console.log('Response:', res2.data);
  if (res2.status === 404 && res2.data.success === false) {
    console.log('\x1b[32m✔ PASS: Rejected nonexistent reference as expected\x1b[0m\n');
  } else {
    console.log('\x1b[31m✖ FAIL: Did not properly reject nonexistent reference\x1b[0m\n');
  }

  // Test 3: Existing Phone Number (01554445554)
  console.log('Test 3: Login with Existing Phone (01554445554)');
  const res3 = await postLogin('01554445554');
  console.log('Status:', res3.status);
  console.log('Response:', res3.data);
  const cookie3 = res3.headers['set-cookie'] ? res3.headers['set-cookie'][0] : '';
  console.log('Cookie issued:', !!cookie3);
  if (res3.status === 200 && res3.data.success === true && res3.data.redirect === '/Patient/Portal') {
    console.log('\x1b[32m✔ PASS: Successfully verified phone and returned /Patient/Portal\x1b[0m\n');
  } else {
    console.log('\x1b[31m✖ FAIL: Failed on existing phone\x1b[0m\n');
  }

  // Test 4: Existing Reference Code (DC-2026-5989)
  console.log('Test 4: Login with Existing Booking Reference (DC-2026-5989)');
  const res4 = await postLogin('DC-2026-5989');
  console.log('Status:', res4.status);
  console.log('Response:', res4.data);
  const cookie4 = res4.headers['set-cookie'] ? res4.headers['set-cookie'][0] : '';
  if (res4.status === 200 && res4.data.success === true && res4.data.redirect.includes('ref=DC-2026-5989')) {
    console.log('\x1b[32m✔ PASS: Successfully verified reference and redirected with ?ref=DC-2026-5989\x1b[0m\n');
  } else {
    console.log('\x1b[31m✖ FAIL: Failed on existing reference code\x1b[0m\n');
  }

  // Test 5: Verify Data Display in Patient Portal
  console.log('Test 5: Fetch /Patient/Portal using Authenticated Cookie');
  const portalRes = await getPortal(cookie4, 'ref=DC-2026-5989');
  console.log('Portal Status:', portalRes.status);
  const html = portalRes.html;
  const hasPatientName = html.includes('محمد اليمنى سعد');
  const hasRef = html.includes('DC-2026-5989');
  const hasDoctor = html.includes('د. حازم حجاج');
  const hasDate = html.includes('2026-11-19');
  const hasVisitCount = html.includes('إجمالي الحجوزات') && html.includes('1 حجز');
  const hasModal = html.includes('id="patientBookingDetailsModal"');

  console.log('Displays Patient Name (محمد اليمنى سعد):', hasPatientName);
  console.log('Displays Reference (DC-2026-5989):', hasRef);
  console.log('Displays Doctor (د. حازم حجاج):', hasDoctor);
  console.log('Displays Appointment Date (2026-11-19):', hasDate);
  console.log('Displays Total Visit Count:', hasVisitCount);
  console.log('Contains Details Modal:', hasModal);

  if (hasPatientName && hasRef && hasDoctor && hasDate && hasVisitCount && hasModal) {
    console.log('\x1b[32m✔ PASS: Patient Portal dynamically displays all relevant booking details and visit count!\x1b[0m\n');
  } else {
    console.log('\x1b[31m✖ FAIL: Portal missing some booking details\x1b[0m\n');
  }
}

runTests().catch(console.error);
