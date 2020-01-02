let momentLocale;
export default (lang) => {
  switch(lang.toLowerCase()) {
    case 'en':
      return require('./en').default;
    case 'fr':
      momentLocale = require('moment/locale/fr');
      return require('./fr').default;
    case 'es':
      momentLocale = require('moment/locale/es');
      return require('./es').default;
    default:
      return require('./en').default;
  }
};