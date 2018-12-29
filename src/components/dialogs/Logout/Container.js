import React from 'react';
import { Cache, Analytics, Auth } from 'aws-amplify';
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
    try {
      await this._awsSignOut();
      await this._fbLogout();
      await this._googleSignout();
      await client.cache.reset();
    } catch {
      // offline
    }
    await Cache.clear();
    this.setState({ loading: false });
    this._handleDismiss();
    this.props.navigation.navigate('Auth');
    Analytics.record('logout');
  };

  _awsSignOut = async () => await Auth.signOut();

  _fbLogout = async () => await LoginManager.logOut();

  _googleSignout = async () => await GoogleSignin.signOut();

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