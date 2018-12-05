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
  state = {
    loading: false
  };

  _signIn = async () => {
    this.setState({ loading: true });
    try {
      await GoogleSignin.hasPlayServices();
      const {
        idToken,
        user
      } = await GoogleSignin.signIn();
      await this.props.onLogin({
        name: user.name,
        email: user.email,
        pictureUrl: user.photo,
        provider: 'google',
        token: idToken,
        expires_at: null
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('Login cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Login in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Google Play services not available");
      } else {
        alert("Connection Error: Login failed");
        firebase.crashlytics().log(error.message);
      }
      this.setState({ loading: false });
    }
  }
  render() {
    const { loading } = this.state;
    return (
      <Button
        onPress={this._signIn}
        disabled={loading}
        loading={loading}
      />
    )
  }
}