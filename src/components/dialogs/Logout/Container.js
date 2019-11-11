import React from 'react';
import { Auth } from'aws-amplify';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { withApollo } from 'react-apollo';
import Dialog from './Dialog';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _signOut = async () => {
    this.setState({ loading: true });
    try { await this.props.client.clearStore(); } catch(error){}
    try { await Auth.signOut({ global: true }); } catch(error) {}
    this._handleDimiss();
    this.props.stores.reset();
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

const withStores = inject("stores")(observer(withApollo(Container)));

export default withNavigation(withStores);