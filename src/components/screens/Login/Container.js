import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import { withNavigationFocus } from'react-navigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SimpleToast from 'react-native-simple-toast';
import Login from './Login';

class Container extends React.Component {

  componentWillUnmount() {
    Hub.remove('auth', this._authListener);
  }

  componentDidMount = async () => {
    this.props.stores.appState.setLoginState(false);
    Hub.listen('auth', this._authListener);
    try {
      await changeNavigationBarColor('white', true);
    } catch (error) {
    }
  };

  _authListener = async ({ payload: { event } }) => {
    switch(event) {
      case "signIn":
        try {
          const user = await Auth.currentAuthenticatedUser();
          const { signInUserSession : { idToken: { payload } } }= user;
          const { email } = payload;
          this.props.stores.appState.setUserId(email);
          this.props.navigation.navigate('App');
        } catch(error) {
          SimpleToast.show("Sign-in failed", SimpleToast.SHORT);
        }
        break;
    }
  };

  _signInAsync = async (provider) => {
    try {
      this.props.stores.appState.setLoginState(true);
      await Auth.federatedSignIn({ provider });
    } catch (error) {
      this.props.stores.appState.setLoginState(false);
    }
  };

  render() {
    return <Login
      handleLogin={this._signInAsync}
    />;
  }
}

const withFocus = withNavigationFocus(Container);

export default inject("stores")(observer(withFocus));