import moment from 'moment';
const date = moment().format('YYYY-MM-DD');
const url = 'https://schdlr-ng.herokuapp.com';
const dev = {
  ONE_SIGNAL_ID: 'c45c9feb-9c17-4f6b-a397-abc7b49e5e40',
  APP_URL: url,
  IOS_URL: '//:schdlr',
  PROTOCOL: 'http://',
  DOMAIN: '192.168.43.190:4000',
  PORT: '4000',
  EMAIL: 'usmansbk@gmail.com',
  APP_VERSION: `${date}-beta-dev`,
  DOWNLOAD_URL: `${url}/download`,
  FAQ_URL: `${url}/faq`,
  CONTACT_URL: `${url}/contact`,
  LEGALITY_URL: `${url}/legal`,
  TERMS_URL: `${url}/terms`
};

const prod = {
  ONE_SIGNAL_ID: 'c45c9feb-9c17-4f6b-a397-abc7b49e5e40',
  APP_URL: 'https://schdlr-ng.herokuapp.com',
  IOS_URL: '//:schdlr',
  PROTOCOL: 'https://',
  DOMAIN: 'schdlr-ng.herokuapp.com',
  EMAIL: 'usmansbk@gmail.com',
  APP_VERSION: `1.0.0-release`,
  DOWNLOAD_URL: 'https://schdlr-ng.herokuapp.com/download',
  FAQ_URL: `${url}/faq`,
  CONTACT_URL: `${url}/contact`,
  LEGALITY_URL: `${url}/legal`,
  TERMS_URL: `${url}/terms`
};

export default dev;