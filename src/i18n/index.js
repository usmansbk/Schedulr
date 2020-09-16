export default (lang) => {
  switch (lang.toLowerCase()) {
    case 'en':
      return require('./en').default;
    case 'fr':
      return require('./fr').default;
    case 'es':
      return require('./es').default;
    default:
      return require('./en').default;
  }
};
