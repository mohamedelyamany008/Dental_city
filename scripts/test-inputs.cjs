const path = require('path');

async function testVariousInputs() {
  const servicePath = path.resolve('Dental city/dist/services/appointmentService.js');
  const { AppointmentService } = await import('file:///' + servicePath.replace(/\\/g, '/'));
  
  const testInputs = [
    'DC-2026-5989',
    'dc-2026-5989',
    '2026-5989',
    '5989',
    '01554445554',
    '+201554445554',
    '1554445554',
    '01554445554 ',
    '01000000000', // nonexistent phone
    'DC-9999-9999' // nonexistent ref
  ];

  for (const input of testInputs) {
    console.log(`\n--- Testing input: "${input}" ---`);
    const clean = input.trim();
    // try by phone
    const byPhone = await AppointmentService.getBookingsByPhone(clean);
    console.log(`  byPhone count: ${byPhone.length}`);
    // try by ref
    const byRef = await AppointmentService.getBookingByReference(clean);
    console.log(`  byRef: ${byRef ? byRef.reference : 'null'}`);
  }
}

testVariousInputs();
