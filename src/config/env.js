const date = '2019-11-18T22:57';
const DOMAIN = 'https://help.schdlr.com';

const common = {
  uriPrefix: 'schdlr://',
  APP_URL: `https://schdlr.com`,
  DOWNLOAD_URL: `${DOMAIN}/download`,
  FAQ_URL: `${DOMAIN}/faq`,
  CONTACT_URL: `${DOMAIN}/contact`,
  LEGALITY_URL: `${DOMAIN}/legal`,
  TERMS_URL: `${DOMAIN}/terms`,
  EMAIL: 'hello.schdlr@gmail.com',
  CloudFrontUrl: "https://d1u22e64efucw4.cloudfront.net",
  ONESIGNAL_ID: "c45c9feb-9c17-4f6b-a397-abc7b49e5e40",
  GEODB_API_KEY: "rdcRtGlyhVmshYGy2m2p3jBCFSfOp1rrdtqjsn8tzV5y3RRSK3",
  GEODB_HOST: "wft-geo-db.p.mashape.com",
  BANNER_AD: "ca-app-pub-9280955048587070/9942981589",
  FULLSCREEN_AD: "ca-app-pub-9280955048587070/6003736577"
}

const dev = {
  ...common,
  BUILD: `${date}-beta`,
  APP_VERSION: '1.1.0'
};

export const prod = {
  ...common,
  BUILD: `${date}-release`,
  APP_VERSION: '1.0.0'
};

export default dev;