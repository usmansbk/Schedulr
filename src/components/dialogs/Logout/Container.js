import React from 'react';
import { Cache } from 'aws-amplify';
import { withNavigation } from 'react-navigation';
import SimpleToast from 'react-native-simple-toast';
import Dialog from './Dialog';
import client from 'config/client';
import stores from 'stores';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _signOut = () => {
    this.setState({ loading: true });
    this._handleDismiss();
    this._awsSignOut();
    this.setState({ loading: false });
    this.props.navigation.navigate('Auth');
    this._resetMobxStores();
    this._clearStore();

    SimpleToast.show("You've been logged out", SimpleToast.SHORT);
  };

  _resetMobxStores = () => {
    stores.reset();
  }

  _clearStore = async () => {
    try {
      await client.clearStore();
    } catch(e) {
      SimpleToast.show(e.message, SimpleToast.LONG);
    }
  };

  _awsSignOut = () => {
    Cache.clear();
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