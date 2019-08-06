import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import { withNavigationFocus } from'react-navigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Login from './Login';

class Container extends React.Component {

  componentDidMount = async () => {
      this.props.stores.appState.setLoginState(false);
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch(event) {
        case "signIn":
          console.log(data);
          // do gql logic here
          this.props.navigation.navigate('App');
          break;
      }
    });
    try {
      await changeNavigationBarColor('white', true);
    } catch (error) {
    }
  }

  _signInAsync = async (provider) => {
    try {
      this.props.stores.appState.setLoginState(true);
      const user = await Auth.federatedSignIn({ provider });
      console.log(user);
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