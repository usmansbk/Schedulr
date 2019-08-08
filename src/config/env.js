import moment from 'moment';
const date = moment().format('YYYY-MM-DD');
const url = `https://schdlr.com`;
const DOMAIN = 'https://help.schdlr.com';

const dev = {
  uriPrefix: 'schdlr://',
  APP_URL: url,
  PROTOCOL: `http://`,
  DOMAIN: '192.168.43.190:4000',
  PORT: '4000',
  EMAIL: 'usmansbk@gmail.com',
  APP_VERSION: `${date}-beta-dev`,
  DOWNLOAD_URL: `${DOMAIN}/download`,
  FAQ_URL: `${DOMAIN}/faq`,
  CONTACT_URL: `${DOMAIN}/contact`,
  LEGALITY_URL: `${DOMAIN}/legal`,
  TERMS_URL: `${DOMAIN}/terms`,
  WEB_CLIENT_ID: "915796894963-6566v17dt2cuet54ihj3cem5vod86js3.apps.googleusercontent.com"
};

export const prod = {
  uriPrefix: 'schdlr://',
  APP_URL: DOMAIN,
  PROTOCOL: `http://`,
  DOMAIN: '192.168.43.190:4000',
  PORT: '4000',
  EMAIL: 'usmansbk@gmail.com',
  APP_VERSION: `${date}-beta-release`,
  DOWNLOAD_URL: `${DOMAIN}/download`,
  FAQ_URL: `${DOMAIN}/faq`,
  CONTACT_URL: `${DOMAIN}/contact`,
  LEGALITY_URL: `${DOMAIN}/legal`,
  TERMS_URL: `${DOMAIN}/terms`,
  WEB_CLIENT_ID: "915796894963-6566v17dt2cuet54ihj3cem5vod86js3.apps.googleusercontent.com"
};

export default dev;