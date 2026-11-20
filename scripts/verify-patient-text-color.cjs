const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING VERIFICATION: Dynamic Text Color Styling for Patient Data Fields ---');

// 1. Verify public/css/theme.css
const themeCss = fs.readFileSync('public/css/theme.css', 'utf8');
assert(themeCss.includes('--dc-patient-data-color: #0000FF;'), 'theme.css must declare --dc-patient-data-color: #0000FF in root');
assert(themeCss.includes('--dc-patient-data-color: #FFFFFF !important;'), 'theme.css must declare --dc-patient-data-color: #FFFFFF !important in dark mode');
assert(themeCss.includes('.patient-data-value'), 'theme.css must include .patient-data-value class');
assert(themeCss.includes('#pbmPatientName'), 'theme.css must target #pbmPatientName');
assert(themeCss.includes('#pmPatientName'), 'theme.css must target #pmPatientName');
assert(themeCss.includes('#0000FF !important;'), 'theme.css must explicitly enforce #0000FF !important in light mode');
assert(themeCss.includes('#FFFFFF !important;'), 'theme.css must explicitly enforce #FFFFFF !important in dark mode');
console.log('✅ theme.css contains root token and explicit light/dark rules');

// 2. Verify confirmation.ejs
const confirmationEjs = fs.readFileSync('Dental city/src/views/appointments/confirmation.ejs', 'utf8');
assert(confirmationEjs.includes('--dc-patient-data-color: #0000FF;'), 'confirmation.ejs must define --dc-patient-data-color: #0000FF');
assert(confirmationEjs.includes('--dc-patient-data-color: #FFFFFF !important;'), 'confirmation.ejs must define --dc-patient-data-color: #FFFFFF !important in dark mode');
assert(confirmationEjs.includes('info-card-value patient-data-value"><%= booking.patient_name %>'), 'confirmation.ejs must apply patient-data-value to patient name');
assert(confirmationEjs.includes('info-card-value patient-data-value font-monospace" dir="ltr"><%= booking.patient_phone %>'), 'confirmation.ejs must apply patient-data-value to phone');
assert(confirmationEjs.includes('patient-notes-box'), 'confirmation.ejs must wrap notes in patient-notes-box');
assert(confirmationEjs.includes('patient-data-value"><%= booking.patient_notes %></p>'), 'confirmation.ejs must apply patient-data-value to notes');
console.log('✅ confirmation.ejs verified for dynamic patient data text color and dark mode styling');

// 3. Verify portal.ejs
const portalEjs = fs.readFileSync('Dental city/src/views/patient/portal.ejs', 'utf8');
assert(portalEjs.includes('--dc-patient-data-color: #0000FF;'), 'portal.ejs must define --dc-patient-data-color: #0000FF');
assert(portalEjs.includes('--dc-patient-data-color: #FFFFFF !important;'), 'portal.ejs must define --dc-patient-data-color: #FFFFFF in dark mode');
assert(portalEjs.includes('patient-data-value patient-name-text"><%= booking.patient_name %>'), 'portal.ejs table must include patient-data-value on patient_name');
assert(portalEjs.includes('patient-data-value patient-phone-text"><%= booking.patient_phone %>'), 'portal.ejs table must include patient-data-value on patient_phone');
assert(portalEjs.includes('patient-data-value patient-name-text" id="pbmPatientName"'), 'portal.ejs modal must include patient-data-value on pbmPatientName');
assert(portalEjs.includes('id="pbmPhone" dir="ltr" class="patient-data-value patient-phone-text"'), 'portal.ejs modal must include patient-data-value on pbmPhone');
assert(portalEjs.includes('patient-data-value" id="pbmDate"'), 'portal.ejs modal must include patient-data-value on pbmDate');
assert(portalEjs.includes('patient-data-value" id="pbmTime"'), 'portal.ejs modal must include patient-data-value on pbmTime');
assert(portalEjs.includes('patient-data-value" id="pbmService"'), 'portal.ejs modal must include patient-data-value on pbmService');
assert(portalEjs.includes('patient-data-value" id="pbmNotes"'), 'portal.ejs modal must include patient-data-value on pbmNotes');
console.log('✅ portal.ejs verified for table and modal dynamic patient data text color');

// 4. Verify dashboard.ejs
const dashEjs = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
assert(dashEjs.includes('--dc-patient-data-color: #0000FF;'), 'dashboard.ejs must define --dc-patient-data-color: #0000FF');
assert(dashEjs.includes('--dc-patient-data-color: #FFFFFF !important;'), 'dashboard.ejs must define --dc-patient-data-color: #FFFFFF in dark mode');
assert(dashEjs.includes('patient-data-value patient-name-text"><%= b.patient_name %>'), 'dashboard.ejs overview table must include patient-data-value');
assert(dashEjs.includes('patient-name-text patient-data-value" title="<%= pName %>"'), 'dashboard.ejs patients-panel table must include patient-data-value');
assert(dashEjs.includes('patient-phone-text patient-data-value"'), 'dashboard.ejs patients-panel table must include patient-phone-text patient-data-value');
assert(dashEjs.includes('patient-data-value patient-name-text" id="pmPatientName"'), 'dashboard.ejs modal must include patient-data-value on pmPatientName');
assert(dashEjs.includes('id="pmPatientPhone" class="patient-data-value patient-phone-text"'), 'dashboard.ejs modal must include patient-data-value on pmPatientPhone');
assert(dashEjs.includes('patient-data-value" id="pmDateTime"'), 'dashboard.ejs modal must include patient-data-value on pmDateTime');
assert(dashEjs.includes('patient-data-value" id="pmServiceName"'), 'dashboard.ejs modal must include patient-data-value on pmServiceName');
assert(dashEjs.includes('patient-data-value" id="pmPatientNotes"'), 'dashboard.ejs modal must include patient-data-value on pmPatientNotes');
console.log('✅ dashboard.ejs verified for overview, patient-panel and modal dynamic patient data text color');

// 5. Verify book.ejs
const bookEjs = fs.readFileSync('Dental city/src/views/appointments/book.ejs', 'utf8');
assert(bookEjs.includes('--dc-patient-data-color: #0000FF;'), 'book.ejs must define --dc-patient-data-color: #0000FF');
assert(bookEjs.includes('--dc-patient-data-color: #FFFFFF !important;'), 'book.ejs must define --dc-patient-data-color: #FFFFFF in dark mode');
assert(bookEjs.includes('.summary-value,'), 'book.ejs summary-value must be styled dynamically');
console.log('✅ book.ejs verified for summary values dynamic text color');

console.log('\n🌟 ALL PATIENT DATA DYNAMIC TEXT COLOR CHECKS PASSED PERFECTLY! 🌟');
