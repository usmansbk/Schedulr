const i18n = require('./i18n');
const moment = require('moment');

console.log('English - Default');
console.log(i18n.get('EVENT_cancelled', 'en')('Lecture'));
console.log(i18n.get('EVENT_scheduled')('Test', moment().toISOString()));
console.log(i18n.get('EVENT_rescheduled')('Test', moment().toISOString()));

console.log('French')
console.log(i18n.get('EVENT_cancelled', 'fr')('Lecture'));
console.log(i18n.get('EVENT_scheduled', 'fr')('Test', moment().toISOString()));
console.log(i18n.get('EVENT_rescheduled', 'fr')('Test', moment().toISOString()));

console.log('Espanol');
console.log(i18n.get('EVENT_cancelled', 'es')('Lecture'));
console.log(i18n.get('EVENT_scheduled', 'es')('Test', moment().toISOString()));
console.log(i18n.get('EVENT_rescheduled', 'es')('Test', moment().toISOString()));
