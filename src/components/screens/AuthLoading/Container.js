import React, { Component } from 'react'
import { Cache } from 'aws-amplify';
import Loading from './Loading';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    let userToken;
    try {
      const { token } = await Cache.getItem('federatedInfo');
      userToken = token;
    } catch (error) {
      userToken = null;
    }
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }
  
  render() {
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    )
  }
}
