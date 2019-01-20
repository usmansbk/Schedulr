import React from 'react';
import {
  GoogleSignin,
  statusCodes
} from 'react-native-google-signin';
import Toast from 'react-native-simple-toast';
import { Analytics } from 'aws-amplify';
import Button from './Button';
import env from '../../../config/env';

GoogleSignin.configure({
  offlineAccess: false,
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
      if (!user || !user.name) throw new Error('Unauthenticated');
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
        Toast.show('Login cancelled', Toast.SHORT);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Toast.show('Login in progress', Toast.SHORT);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Toast.show("Google Play services not available", Toast.SHORT);
      } else {
        Toast.show("Connection error", Toast.SHORT);
        Analytics.record({
          name: 'google_login_error',
          attributes: {
            name: error.name,
            message: error.message
          }
        });
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