import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Login from './Login';

class Container extends React.Component {
  state = { loading: false };

  componentDidMount = async () => {
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
      this.props.stores.appState.toggleLoginStatus();
      await Auth.federatedSignIn({ provider });
    } catch (error) {
      this.props.stores.appState.toggleLoginStatus();
    }
  };

  render() {
    return <Login
      handleLogin={this._signInAsync}
      loading={this.state.loading}
    />;
  }
}

export default inject("stores")(observer(Container));