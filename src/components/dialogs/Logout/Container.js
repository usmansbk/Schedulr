import React from 'react';
import { Auth } from'aws-amplify';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import client from 'config/client';
import Dialog from './Dialog';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _signOut = async () => {
    this.setState({ loading: true });
    Auth.signOut().then(() => {
      this.props.navigation.navigate('Auth');
      this.props.stores.reset();
      client.clearStore();
    });
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

const withStores = inject("stores")(observer(Container));

export default withNavigation(withStores);