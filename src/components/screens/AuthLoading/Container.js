import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from './Loading';

class Container extends Component {
  _navigateToAuth = () => this.props.navigation.navigate('Auth');

  componentDidMount = () => {
    if (this.props.stores.appState.prefs.showAppIntro) {
      this.props.navigation.navigate('Intro');
    } else {
      if (!this.props.stores.appState.userId) {
        this._navigateToAuth();
      } else {
        this.props.navigation.navigate('App');
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
