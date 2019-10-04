import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import Loading from './Loading';

class Container extends Component {
  componentDidMount = async () => {
    if (this.props.stores.appState.prefs.showAppIntro) {
      this.props.navigation.navigate('Intro');
    } else {
      try {
        await Auth.currentAuthenticatedUser();
        if (this.props.stores.appState.userId) {
          this.props.navigation.navigate('App');
        } else {
          await Auth.signOut();
          this.props.navigation.navigate('Auth');
        }
      } catch (error) {
        this.props.navigation.navigate('Auth');
      }
    }
  }

  render() {
    return (
      <Loading />
    );
  }
}

export default inject("stores")(observer(Container));
