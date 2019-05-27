import { GoogleSignin } from 'react-native-google-signin';
import { Auth } from 'aws-amplify';

export default class GoogleOAuth {

  _signIn = async ({ email, token, expires_at }) => {
    try {
      await Auth.federatedSignIn('google', {
        token,
        expires_at,
      },{
        email
      });
    } catch (error) {
      console.debug(error);
    }
  };

  refreshGoogleToken = () => {
    return this._refreshGoogleTokenImpl();
  }

  _refreshGoogleTokenImpl = () => {
    return new Promise(async (res, rej) => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        console.debug('refreshing the google access token');
        GoogleSignin.signInSilently()
          .then(async (authResponse) => {
            const { user: { email }, idToken, accessTokenExpirationDate } = authResponse;
            try {
              const currentUser = await Auth.currentAuthenticatedUser();
              console.log('currentUser', currentUser);
            } catch (error) {
              console.log('currentUser error', error);
            }
            res({
              token: idToken,
              expires_at: accessTokenExpirationDate
            });
          }).catch(error => {
            console.debug('Failed to sign in with Google', error);
            rej('Failed to sign in with Google');
          });
      } else {
        console.debug('User is not signed in with Google');
        rej('Failed to refresh google token');
      }
    });
  }
}