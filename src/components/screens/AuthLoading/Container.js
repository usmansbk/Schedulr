import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import Loading from './Loading';

class Container extends Component {
  _navigateToAuth = () => this.props.navigation.navigate('Auth');

  componentDidMount = async () => {
    if (this.props.stores.appState.prefs.showAppIntro) {
      this.props.navigation.navigate('Intro');
    } else {
      try {
        await Auth.currentAuthenticatedUser();
        if (!this.props.stores.appState.userId) {
          throw new Error('GraphqlQL: No user found');
        }
        this.props.navigation.navigate('App');
      } catch (error) {
        console.log(error.message);
        this._navigateToAuth();
      }
    }
  };

  render() {
    return (
      <Loading />
    );
  }
}

export default inject("stores")(observer(Container));
