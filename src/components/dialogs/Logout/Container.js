import React from 'react';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import {withApollo} from 'react-apollo';
import Dialog from './Dialog';
import logger from 'config/logger';

class Container extends React.Component {
  state = {
    loading: false,
  };

  _confirmRef = (ref) => (this.confirmRef = ref);
  open = () => this.confirmRef.open();

  _signOut = async () => {
    this.setState({loading: true});
    try {
      await this.props.client.clearStore();
      this.props.stores.reset();
      await Auth.signOut();
    } catch (error) {
      logger.logError(error);
    }
    try {
      await AsyncStorage.clear();
    } catch (e) {
      logger.logError(error);
    }
    this.props.navigation.navigate('Auth');
  };

  render() {
    return <Dialog handleLogout={this._signOut} ref={this._confirmRef} />;
  }
}

const withStores = inject('stores')(
  observer(withApollo(Container, {withRef: true})),
);

export default withNavigation(withStores);
