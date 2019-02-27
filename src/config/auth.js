import { Auth } from 'aws-amplify';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import SimpleToast from 'react-native-simple-toast';

export function refreshGoogleToken() {
  let token = null;
  let expires_at = null;
  // try {
  //   const {
  //     idToken,
  //     accessTokenExpirationDate
  //   } = await GoogleSignin.signInSilently();
  //   token = idToken;
  //   expires_at = accessTokenExpirationDate;
  // } catch (error) {
  //   if (error.code === statusCodes.SIGN_IN_REQUIRED) {
  //     SimpleToast.show('Signin required', SimpleToast.SHORT);
  //   }
  // }
  return new Promise(res, rej => {
    const data = {
      token,
      expires_at,
    }
    res(data);
  });
}

export default Auth;
