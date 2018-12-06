import React from 'react';
import { Cache, Analytics } from 'aws-amplify';
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _signOut = async () => {
    this.setState({ loading: true });
    this._fbLogout();
    this._googleSignout();
    await Cache.clear();
    this.setState({ loading: false });
    this._handleDismiss();
    this.props.navigation.navigate('Auth');
    Analytics.record('logout');
  };

  _fbLogout = async () => {
    try {
      await LoginManager.logOut();
    } catch (error) {
      // offline
    }
  };

  _googleSignout = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      // offline
    }
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