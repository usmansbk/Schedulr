import React from 'react';
import { withNavigation } from 'react-navigation';
import Dialog from './Dialog';

class Container extends React.Component {
  state = {
    loading: false
  };

  _signOut = async () => {
    this.setState({ loading: true });
    await AsyncStorage.clear();
    this.setState({ loading: false });
    this._handleDismiss();
    this.props.navigation.navigate('Auth');
  }

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