import React from 'react';
import { Auth } from 'aws-amplify';
import Login from './Login';

export default class LoginScreen extends React.Component {
  state = {
    loading: false
  };

  _signInAsync = async ({
    name,
    email,
    identity,
    token,
    expires_at
  }) => {
    this.setState({ loading: true });
    await Auth.federatedSignIn(identity, {
      token,
      expires_at,
    }, {
        email
      });
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <Login
        loading={this.state.loading}
        handleLogin={this._signInAsync}
      />
    );
  }
}