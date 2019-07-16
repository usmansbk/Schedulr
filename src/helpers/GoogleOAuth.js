import { GoogleSignin } from 'react-native-google-signin';
import logger from 'config/logger';

export default class GoogleOAuth {

  refreshGoogleToken = () => {
    return this._refreshGoogleTokenImpl();
  }

  _refreshGoogleTokenImpl = () => {
    return new Promise(async (res, rej) => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        logger.debug('refreshing the google access token');
        GoogleSignin.signInSilently()
          .then((authResponse) => {
            const { idToken, accessTokenExpirationDate } = authResponse;
            res({
              token: idToken,
              expires_at: accessTokenExpirationDate
            });
          }).catch(error => {
            logger.debug('Failed to sign in with Google', error);
            rej('Failed to sign in with Google');
          });
      } else {
        logger.debug('User is not signed in with Google');
        rej('Failed to refresh google token');
      }
    });
  }
}