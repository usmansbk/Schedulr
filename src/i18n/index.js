
export default (lang) => {
  switch(lang) {
    case 'en': case 'en-GB':
      return require('./en');
    default:
      return require('./en');
  }
};