import React from 'react';
import {
  GoogleSignin,
  statusCodes
} from 'react-native-google-signin';
import SimpleToast from 'react-native-simple-toast';
import { Analytics } from 'aws-amplify';
import Button from './Button';

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
        accessTokenExpirationDate,
        user
      } = await GoogleSignin.signIn();
      if (!user || !user.name) throw new Error('Unauthenticated');
      await this.props.onLogin({
        name: user.name,
        email: user.email,
        pictureUrl: user.photo,
        provider: 'google',
        token: idToken,
        expires_at: accessTokenExpirationDate
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        SimpleToast.show('Login cancelled', SimpleToast.SHORT);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        SimpleToast.show('Login in progress', SimpleToast.SHORT);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        SimpleToast.show("Google Play services not available", SimpleToast.SHORT);
      } else {
        SimpleToast.show("Connection error", SimpleToast.SHORT);
        // Analytics.record({
        //   name: 'google_login_error',
        //   attributes: {
        //     name: error.name,
        //     message: error.message
        //   }
        // });
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