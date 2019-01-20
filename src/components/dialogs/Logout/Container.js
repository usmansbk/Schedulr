import React from 'react';
import { Auth } from 'aws-amplify';
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import client from '../../../config/client';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _signOut = async () => {
    this.setState({ loading: true });
    await this._awsSignOut();
    await this._fbLogout();
    await this._googleSignout();
    this.setState({ loading: false });
    this._handleDismiss();
    this.props.navigation.navigate('Auth');
    await this._clearStore();
  };

  _clearStore = async () => {
    try {
      client.o
      await client.cache.reset();
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