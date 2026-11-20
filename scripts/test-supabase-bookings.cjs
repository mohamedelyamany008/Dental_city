const path = require('path');

async function testQuery() {
  console.log('Testing Supabase query from appointmentService...');
  const servicePath = path.resolve('Dental city/dist/services/appointmentService.js');
  const { AppointmentService } = await import('file:///' + servicePath.replace(/\\/g, '/'));
  try {
    const all = await AppointmentService.getAllBookings();
    console.log(`getAllBookings returned ${all.length} bookings.`);
    if (all.length > 0) {
      console.log('Sample booking:', JSON.stringify(all[0], null, 2));
      const phone = all[0].patient_phone;
      const ref = all[0].reference;
      console.log(`\nTesting getBookingsByPhone('${phone}')...`);
      const byPhone = await AppointmentService.getBookingsByPhone(phone);
      console.log(`Found ${byPhone.length} bookings for phone ${phone}`);
      console.log(`\nTesting getBookingByReference('${ref}')...`);
      const byRef = await AppointmentService.getBookingByReference(ref);
      console.log(`Found booking by ref: ${byRef ? byRef.reference : 'null'}`);
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

testQuery();
