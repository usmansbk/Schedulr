import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import { withNavigationFocus } from'react-navigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Login from './Login';

class Container extends React.Component {
  shouldComponentUpdate = nextProps => nextProps.navigation.isFocused();

  componentDidMount = async () => {
      this.props.stores.appState.setLoginState(false);
    // Hub.listen("auth", async ({ payload: { event, data } }) => {
    //   switch(event) {
    //     case "signIn":
    //       const user = await Auth.currentAuthenticatedUser();
    //       const { signInUserSession: { idToken: { payload } } } = user;
    //       // SimpleToast.show(`Welcome ${name}!`, SimpleToast.SHORT);
    //       alert(`${payload.email} - ${user.username}`);
    //       break;
    //   }
    // });
    try {
      await changeNavigationBarColor('white', true);
    } catch (error) {
    }
  }

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