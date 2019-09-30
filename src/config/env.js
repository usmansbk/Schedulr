import moment from 'moment';
const date = moment().format('YYYY-MM-DD');
const DOMAIN = 'https://help.schdlr.com';

const common = {
  uriPrefix: 'schdlr://',
  PROTOCOL: `https://`,
  APP_URL: `https://schdlr.com`,
  DOWNLOAD_URL: `${DOMAIN}/download`,
  FAQ_URL: `${DOMAIN}/faq`,
  CONTACT_URL: `${DOMAIN}/contact`,
  LEGALITY_URL: `${DOMAIN}/legal`,
  TERMS_URL: `${DOMAIN}/terms`,
  EMAIL: 'hello.schdlr@gmail.com',
  WEB_CLIENT_ID: "915796894963-6566v17dt2cuet54ihj3cem5vod86js3.apps.googleusercontent.com",
  CloudFrontUrl: "https://d1u22e64efucw4.cloudfront.net",
  GEOCODING_ANDROID_KEY: "AIzaSyCd4f18IwablOuAcBh0_1QnyJ8bcIDz0b8",
  PLACES_API_KEY: "AIzaSyDbFGZuvX0I-gEDCbjuMivcAXnqH1j3xJc"
}

const dev = {
  ...common,
  APP_VERSION: `${date}-beta-dev`,
};

export const prod = {
  ...common,
  APP_VERSION: `${date}-beta-release`,
};

export default dev;