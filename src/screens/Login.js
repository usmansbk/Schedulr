import React from 'react';
import { AsyncStorage } from 'react-native';
import Login from '../components/screens/Login';

export default class LoginScreen extends React.Component {

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  render() {
    return (<Login handleLogin={this._signInAsync} />);
  }
}