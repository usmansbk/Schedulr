import React from 'react';
import { Auth } from 'aws-amplify';
import Login from './Login';

export default class LoginScreen extends React.Component {

  _signInAsync = async ({
    name,
    email,
    identity,
    token,
    expires_at
  }) => {
    await Auth.federatedSignIn(identity, {
      token,
      expires_at,
    }, {
        name,
        email
      });
    this.props.navigation.navigate('App');
  };

  render() {
    return (<Login handleLogin={this._signInAsync} />);
  }
}