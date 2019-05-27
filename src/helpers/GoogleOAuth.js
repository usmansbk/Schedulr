import { GoogleSignin } from 'react-native-google-signin';

export default class GoogleOAuth {

  refreshGoogleToken = () => {
    return this._refreshGoogleTokenImpl();
  }

  _refreshGoogleTokenImpl = () => {
    return new Promise((res, rej) => {
      GoogleSignin.isSignedIn()
        .then((isSignedIn) => {
          if (isSignedIn) {
            console.debug('refreshing the google access token');
            GoogleSignin.signInSilently()
              .then((authResponse) => {
                const { idToken, accessTokenExpirationDate } = authResponse;
                res({
                  token: idToken,
                  expires_at: accessTokenExpirationDate
                });
              }).catch((error) => {
                rej('Failed to sign in with google');
              })
          } else {
            rej('User is not signed in with Google');
          }
        }).catch((error) => {
          console.debug('Failed to refresh google token', error);
          rej('Failed to refresh google token');
        });
    });
  }
}