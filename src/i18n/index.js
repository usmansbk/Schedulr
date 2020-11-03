export default (lang) => {
  switch (lang.toLowerCase()) {
    case 'en':
      return require('./en').default;
    case 'fr':
      return require('./en').default;
    case 'es':
      return require('./en').default;
    default:
      return require('./en').default;
  }
};
