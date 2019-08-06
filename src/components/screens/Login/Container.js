import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Login from './Login';

export default class Container extends React.Component {
  state = { loading: false };

  componentDidMount = async () => {
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch(event) {
        case "signIn":
          const user = await Auth.currentAuthenticatedUser();
          const { signInUserSession: { idToken: { payload } } } = user;
          // SimpleToast.show(`Welcome ${name}!`, SimpleToast.SHORT);
          // alert(`${payload.email} - ${user.username}`);
          alert(JSON.stringify(user));
          break;
      }
    });
    try {
      await changeNavigationBarColor('white');
    } catch (error) {
    }
  }

  _signInAsync = async (provider) => {
    try {
      this.setState({ loading: true })
      await Auth.federatedSignIn({ provider });
      this.setState({ loading: false });
    } catch (error) {
    }
  };

  render() {
    return <Login
      handleLogin={this._signInAsync}
      loading={this.state.loading}
    />;
  }
}
