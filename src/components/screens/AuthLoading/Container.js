import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Loading from './Loading';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      this.props.navigation.navigate('App');
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
