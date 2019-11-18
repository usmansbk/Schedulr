const date = '2019-10-29T19:53';
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
  PLACES_API_KEY: "AIzaSyDbFGZuvX0I-gEDCbjuMivcAXnqH1j3xJc",
  ONESIGNAL_ID: "c45c9feb-9c17-4f6b-a397-abc7b49e5e40",
  GEODB_API_KEY: "rdcRtGlyhVmshYGy2m2p3jBCFSfOp1rrdtqjsn8tzV5y3RRSK3",
  GEODB_HOST: "wft-geo-db.p.mashape.com",
  BANNER_AD: "ca-app-pub-9280955048587070/9942981589",
  FULLSCREEN_AD: "ca-app-pub-9280955048587070/6003736577"
}

const dev = {
  ...common,
  BUILD: `${date}-beta`,
  APP_VERSION: '0.1.0'
};

export const prod = {
  ...common,
  BUILD: `${date}-release`,
  APP_VERSION: '0.1.0'
};

export default dev;