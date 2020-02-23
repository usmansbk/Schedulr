import React from 'react';
import { withOAuth } from 'aws-amplify-react-native';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { withApollo } from 'react-apollo';
import Dialog from './Dialog';
import logger from 'config/logger';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _signOut = async () => {
    this.setState({ loading: true });
    try { await this.props.client.clearStore(); } catch(error){}
    try {
      await this.props.signOut();
      this.props.stores.reset();
    } catch(error) {
      logger.logError(error);
    }
    this._handleDimiss();
    this.props.navigation.navigate('Auth');
  };

  _handleDimiss = () => this.props.handleDismiss();

  render() {
    return (
      <Dialog
        visible={this.props.visible}
        loading={this.state.loading}
        handleLogout={this._signOut}
        handleDismiss={this._handleDimiss}
      />
    );
  }
}

const withStores = inject("stores")(observer(withApollo(withOAuth(Container))));

export default withNavigation(withStores);