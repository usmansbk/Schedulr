import React from 'react';
import { Auth } from 'aws-amplify';
import firebase from 'react-native-firebase';
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
    await Auth.federatedSignIn(provider, {
      token,
      expires_at,
    },{
      email
    });
    this.props.navigation.navigate('App');
    firebase.analytics().logEvent('sign_in', {
      name,
      email,
      provider
    });
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