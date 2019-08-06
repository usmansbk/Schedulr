import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import { withNavigationFocus } from'react-navigation';
import gql from 'graphql-tag';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SimpleToast from 'react-native-simple-toast';
import Login from './Login';
import { getUser } from 'mygraphql/queries';
import { createUser } from 'mygraphql/mutations';
import client from 'config/client';

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
          const currentUser = await Auth.currentAuthenticatedUser();
          const { signInUserSession : { idToken: { payload } } } = currentUser;
          const { email, name, picture } = payload;
          let pictureUrl;
          if (picture) {
            if (payload["cognito:username"].startsWith('Facebook')) {
              const json = JSON.parse(picture)
              pictureUrl = json.data.url;
            } else {
              pictureUrl = picture;
            }
          }
          const response = await client.query({
            query: gql(getUser),
            variables: {
              id: email
            }
          });
          const { data } = response;
          if (!data.getUser) {
            await client.mutate({
              mutation: gql(createUser),
              variables: {
                input: {
                  id: email,
                  name,
                  email,
                  pictureUrl
                }
              }
            });
          }
          this.props.stores.appState.setUserId(email);
          this.props.navigation.navigate('App');
        } catch(error) {
          SimpleToast.show("Sign-in failed", SimpleToast.LONG);
          console.error(error.message);
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