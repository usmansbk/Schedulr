import { Auth } from 'aws-amplify';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import Toast from 'react-native-simple-toast';
import env from '../config/env';

GoogleSignin.configure({
  offlineAccess: false,
  webClientId: env.WEB_CLIENT_ID
});

async function refreshGoogleToken() {
  let token = null;
  let expires_at = null;
  try {
    const {
      idToken,
      accessTokenExpirationDate
    } = await GoogleSignin.signInSilently();

    token = idToken;
    expires_at = accessTokenExpirationDate;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      Toast.show('Signin required', Toast.SHORT);
    }
  }

  return new Promise(res, rej => {
    const data = {
      token,
      expires_at,
    }
    res(data);
  });
}

export const initRefreshHandlers = () => {
  Auth.configure({
    refreshHandlers: {
      'google': refreshGoogleToken
    }
  });
};

export default Auth;
