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

const GET_USER = gql(getUser);
const CREATE_USER = gql(createUser);

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
            query: GET_USER,
            variables: {
              id: email
            }
          });
          const { data } = response;
          if (!data.getUser) {
            const result = await client.mutate({
              mutation: CREATE_USER,
              variables: {
                input: {
                  name,
                  email,
                  pictureUrl
                }
              }
            });
            const user = result.data.createUser;
            client.writeQuery({
              query: GET_USER,
              variables: {
                id: email
              },
              data: {
                getUser: user
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

  _emailSignIn = () => this.props.navigation.navigate('EmailLogin');

  render() {
    return <Login
      handleLogin={this._signInAsync}
      handleEmailLogin={this._emailSignIn}
    />;
  }
}

const withFocus = withNavigationFocus(Container);

export default inject("stores")(observer(withFocus));