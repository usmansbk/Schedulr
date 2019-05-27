// import {
//   LoginManager,
//   GraphRequest,
//   GraphRequestManager,
//   AccessToken
// } from 'react-native-fbsdk';

// export default class FacebookOAuth {

//   refreshFacebookToken = () => {
//     return this._refreshFacebookTokenImpl();
//   }

//   _refreshFacebookTokenImpl = () => {
//       return new Promise((res, rej) => {
//           fb.getLoginStatus(
//               fbResponse => {
//                   if (!fbResponse || !fbResponse.authResponse) {
//                       logger.debug('no response from facebook when refreshing the jwt token');
//                       rej('no response from facebook when refreshing the jwt token');
//                   }

//                   const response = fbResponse.authResponse;
//                   const { accessToken, expiresIn } = response;
//                   const date = new Date();
//                   const expires_at = expiresIn * 1000 + date.getTime();
//                   if (!accessToken) {
//                       logger.debug('the jwtToken is undefined');
//                       rej('the jwtToken is undefined');
//                   }
//                   res({token: accessToken, expires_at });
//               }, 
//               {scope: 'public_profile,email' }
//           );
//       });
//   }
// }