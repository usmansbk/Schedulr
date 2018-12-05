import React from 'react';
import {
  GoogleSignin,
  statusCodes
} from 'react-native-google-signin';
import firebase from 'react-native-firebase';
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
        user
      } = await GoogleSignin.signIn();
      await this.props.onLogin({
        name: user.name,
        email: user.email,
        identity: 'google',
        token: idToken,
        expires_at: null
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('Login cancelled');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Google Play services not available");
      } else {
        alert(error.message);
        //firebase.crashlytics().log(error.message);
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