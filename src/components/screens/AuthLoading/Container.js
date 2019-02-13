import React, { Component } from 'react';
import { Cache } from 'aws-amplify';
import Loading from './Loading';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      const { token } = await Cache.getItem('federatedInfo');
      if (token) this.props.navigation.navigate('App');
      // await Auth.currentAuthenticatedUser();
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
