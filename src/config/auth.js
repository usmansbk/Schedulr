import { Auth } from 'aws-amplify';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import SimpleToast from 'react-native-simple-toast';

export function refreshGoogleToken() {
  let token = null;
  let expires_at = null;
  console.log('refreshing');
  // try {
  //   const {
  //     idToken,
  //     accessTokenExpirationDate
  //   } = await GoogleSignin.signInSilently();
  //   token = idToken;
  //   expires_at = accessTokenExpirationDate;
  //   console.log(token);
  // } catch (error) {
  //   if (error.code === statusCodes.SIGN_IN_REQUIRED) {
  //     SimpleToast.show('Signin required', SimpleToast.SHORT);
  //   }
  // }
  console.log('refreshed');
  return new Promise(res, rej => {
    const data = {
      token,
      expires_at,
    }
    res(data);
  });
}

export default Auth;
