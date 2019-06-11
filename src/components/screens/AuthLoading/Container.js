import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import Loading from './Loading';

@inject('stores')
@observer
export default class Container extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user && this.props.stores.me.id) this.props.navigation.navigate('App');
    } catch (error) {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <Loading />
    );
  }
}
