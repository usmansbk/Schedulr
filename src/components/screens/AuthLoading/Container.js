import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Loading from './Loading';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    let userToken = null;
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      userToken = currentUser;
    } catch (error) {
      alert(error.message);
    }
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }
  
  render() {
    return (
      <Loading />
    );
  }
}
