const fs = require('fs');

const d = fs.readFileSync('Dental city/src/views/doctor/dashboard.ejs', 'utf8');
console.log('has patientDetailsModal:', d.includes('patientDetailsModal'));
console.log('has filterPatientBookings:', d.includes('filterPatientBookings'));
console.log('has clearPatientSearch:', d.includes('clearPatientSearch'));
console.log('has openPatientDetailsModal:', d.includes('openPatientDetailsModal'));
console.log('has patient-panel:', d.includes('patients-panel'));
