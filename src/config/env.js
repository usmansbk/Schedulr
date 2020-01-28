const date = '2020-01-14T23:13';
const DOMAIN = 'https://get-schdlr.com';

const common = {
  uriPrefix: 'schdlr://',
  APP_URL: `https://get-schdlr.com`,
  DOWNLOAD_URL: `${DOMAIN}`,
  FAQ_URL: `${DOMAIN}/faq`,
  CONTACT_URL: `${DOMAIN}/contact`,
  LEGALITY_URL: `${DOMAIN}/legal`,
  TERMS_URL: `${DOMAIN}/terms`,
  PRIVACY_URL: `${DOMAIN}/privacy`,
  EMAIL: 'hello.schdlr@gmail.com',
  ONESIGNAL_ID: 'b6031600-8b05-4702-9e29-bde94401f18a',
  CloudFrontUrl: "https://dffqb1y6phusm.cloudfront.net/",
  GEODB_API_KEY: "rdcRtGlyhVmshYGy2m2p3jBCFSfOp1rrdtqjsn8tzV5y3RRSK3",
  GEODB_HOST: "wft-geo-db.p.mashape.com",
  BANNER: "ca-app-pub-5101585071736651/9094843890",
  MEDIUM_RECT_BANNER: "ca-app-pub-5101585071736651/8260467898",
  SMART_BANNER: "ca-app-pub-5101585071736651/9363125562",
  INTERSTITIAL: "ca-app-pub-5101585071736651/8903272202",
  CODE_PUSH_STAGING: "boKPQY0t1F_JLz4ziHHZsUGNjlkee-bDRHWBL"
}

const dev = {
  ...common,
  BUILD: `${date}-beta`,
  APP_VERSION: '1.0'
};

export const prod = {
  ...common,
  BUILD: `${date}-release`,
  APP_VERSION: '1.0'
};

export default dev;