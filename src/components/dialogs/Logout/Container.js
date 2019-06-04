import React from 'react';
import { AsyncStorage } from 'react-native';
import { Auth } from 'aws-amplify';
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { withNavigation } from 'react-navigation';
import SimpleToast from 'react-native-simple-toast';
import Dialog from './Dialog';
import client from 'config/client';
import stores from 'stores';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _signOut = async () => {
    this.setState({ loading: true });
    await this._awsSignOut();
    await this._fbLogout();
    await this._googleSignout();
    await this._clearStore();
    await this._purgeAsyncStorage();
    this._clearMobxStore();
    this.setState({ loading: false });
    this._handleDismiss();
    this.props.navigation.navigate('Auth');
    SimpleToast.show("You've been logged out", SimpleToast.SHORT);
  };

  _clearMobxStore = () => {
    stores.reset();
  }

  _purgeAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch(e) {}
  }

  _clearStore = async () => {
    try {
      //await client.cache.reset();
      await client.clearStore();
    } catch(e) {}
  };

  _awsSignOut = async () => {
    try {
      await Auth.signOut();
    } catch(e) {}
  };

  _fbLogout = async () => {
    try {
      await LoginManager.logOut();
    } catch(e) {}
  };

  _googleSignout = async () => {
    try {
      await GoogleSignin.signOut();
    } catch(e) {}
  };

  _handleDismiss = () => this.props.handleDismiss();

  render() {
    return (
      <Dialog
        visible={this.props.visible}
        loading={this.state.loading}
        handleDismiss={this._handleDismiss}
        handleLogout={this._signOut}
      />
    );
  }
}

export default withNavigation(Container);