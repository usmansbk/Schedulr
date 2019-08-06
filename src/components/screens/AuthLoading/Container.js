import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Loading from './Loading';

export default class Container extends Component {
  componentDidMount = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      this.props.navigation.navigate('App');
    } catch (error) {
      this.props.navigation.navigate('Auth');
    }
    
    try {
      await changeNavigationBarColor('white', true);
    } catch (error) {}
  }

  render() {
    return (
      <Loading />
    );
  }
}
