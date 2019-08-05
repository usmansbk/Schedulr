import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import Loading from './Loading';

class Container extends Component {
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

export default inject("stores")(observer(Container));
