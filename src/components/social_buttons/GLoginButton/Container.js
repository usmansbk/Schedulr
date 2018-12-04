import React from 'react';
import {
  GoogleSignin,
  statusCodes
} from 'react-native-google-signin';
import Button from './Button';
import env from '../../../config/env';

GoogleSignin.configure({
  webClientId: env.WEB_CLIENT_ID
});

export default class Container extends React.Component {

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {
        idToken,
        user: {
          email,
          name,
        }
      } = await GoogleSignin.signIn();
      alert(`${email} ${name} ${idToken}`);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {

      } else if (error.code === statusCodes.IN_PROGRSS) {

      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {

      } else {
        alert(error.message)
      }
    }
  }
  render() {
    return (
      <Button
        onPress={this.signIn}
      />
    )
  }
}