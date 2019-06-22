import {
  AccessToken,
} from 'react-native-fbsdk';
import logger from 'config/logger';

export default class FacebookOAuth {

  refreshFacebookToken = () => {
    return this._refreshFacebookTokenImpl();
  }

  _refreshFacebookTokenImpl = () => {
      return new Promise((res, rej) => {
        AccessToken.getCurrentAccessToken()
          .then(response => {
            const token = response.accessToken;
            const expires_at = response.expirationTime;
            if (!token) {
              logger.debug('the jwtToken is undefined');
              rej('the jwtToken is undefined');
            }

            res({ token, expires_at });
          })
          .catch(error => {
              logger.debug('no response from facebook when refreshing the jwt token');
              rej('no response from facebook when refreshing the jwt token');
          });
      });
  }
}