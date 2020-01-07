const moment = require('moment');

function capitalize(string) {
  if (!string) return '';
  const firstLetter = string[0].toUpperCase();
  return firstLetter + string.substring(1);
}

function formatDate(date, lang) {
  let m;
  switch(lang) {
    case 'es':
      require('moment/locale/es');
      m = moment(date).locale(lang);
      break;
    case 'fr':
      require('moment/locale/fr');
      m = moment(date).locale(lang);
      break;
    default:
      m = moment(date).locale('en');
      break;
  }
  return m.add(1, 'h').calendar();
}

module.exports = {
  formatDate,
  capitalize
};