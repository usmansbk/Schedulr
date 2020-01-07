const langs = require('./translations');

function get(key, lang='en') {
  const dict = langs[lang] || langs['fallback'];
  return dict[key];
}

module.exports = {
  get
};