import React from 'react';
import { AsyncStorage } from 'react-native';
import { Auth } from 'aws-amplify';
import Login from './Login';

export default class LoginScreen extends React.Component {

  _signInAsync = ({
    name,
    email,
    identity,
    token,
    expires_at
  }) => {
    alert(`${name} ${email} ${identity} ${result.idToken}`);
    return Auth.federatedSignIn(
      identity,
      {
        token,
        expires_at,
      },
      {
        name,
        email
      }
    ).then(() => {
      this.props.navigation.navigate('App');
    });
  };

  render() {
    return (<Login handleLogin={this._signInAsync} />);
  }
}