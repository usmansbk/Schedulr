import React from 'react';
import { Cache } from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';
import client from 'config/client';
import stores from 'stores';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _signOut = async () => {
    this.setState({ loading: true });
    this._handleDismiss();
    await this._clearStore();
    await this._clearCache();
    this.props.navigation.navigate('Auth');
    stores.reset();
  };

  _clearCache = async () => {
    Cache.clear();
    await AsyncStorage.clear();
  };

  _clearStore = async () => {
    try {
      await client.clearStore();
    } catch(e) {
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