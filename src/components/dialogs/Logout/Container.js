import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Dialog from './Dialog';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _signOut = async () => {
    this.setState({ loading: true });
    await this._clearCache();
    this._handleDismiss();
    this.props.navigation.navigate('Auth');
    this.props.stores.reset();
  };

  _clearCache = async () => {
    try {
      await AsyncStorage.clear();
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

const withStores = inject("stores")(observer(Container));

export default withNavigation(withStores);