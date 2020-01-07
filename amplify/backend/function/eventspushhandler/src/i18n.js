const moment = require('moment');
require('moment/locale/es');
require('moment/locale/fr');

const langs = require('./translations');

function capitalize(string) {
  if (!string) return '';
  const firstLetter = string[0].toUpperCase();
  return firstLetter + string.substring(1);
}

function formatDate(date, lang) {
  let m;
  switch(lang) {
    case 'es':
      m = moment(date).locale(lang);
      break;
    case 'fr':
      m = moment(date).locale(lang);
      break;
    default:
      m = moment(date);
      break;
  }
  return m.add(1, 'h').calendar();
}

function get(key, lang='en') {
  const dict = langs[lang] || langs['fallback'];
  return dict[key];
}

module.exports = {
  capitalize,
  formatDate,
  get
};