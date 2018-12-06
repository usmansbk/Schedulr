import React from 'react';
import { Auth, Analytics } from 'aws-amplify';
import Toast from 'react-native-simple-toast';
import Loading from '../../common/Loading';
import Login from './Login';

export default class LoginScreen extends React.Component {
  state = {
    loading: false
  };

  _signInAsync = async ({
    name,
    email,
    provider,
    token,
    expires_at
  }) => {
    this.setState({ loading: true });
    try {
      await Auth.federatedSignIn(provider, {
        token,
        expires_at,
      },{
        email
      });
      this.props.navigation.navigate('App');
      Analytics.record('sign_in', {
        name,
        email,
        provider
      });
    } catch (error) {
      Toast.show('Login failed', Toast.SHORT);
      this.setState({ loading: false });
    }
  };

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <Login
        handleLogin={this._signInAsync}
      />
    );
  }
}