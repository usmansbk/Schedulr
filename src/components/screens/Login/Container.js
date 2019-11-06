import React from 'react';
import uuidv5 from 'uuid/v5';
import { Auth, Hub } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import { withNavigationFocus } from'react-navigation';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SimpleToast from 'react-native-simple-toast';
import { me } from 'api/queries';
import { createUser, createSchedule, createPreference } from 'api/mutations';
import defaultSchedule from 'i18n/schedule';
import Login from './Login';

const GET_USER = gql(me);
const CREATE_USER = gql(createUser);
const CREATE_SCHEDULE = gql(createSchedule);
const CREATE_PREFERENCE = gql(createPreference);

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
    const { client } = this.props;
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
          if (!data.me) {
            await client.mutate({
              mutation: CREATE_PREFERENCE,
              variables: {
                input: {
                  disablePush: false
                }
              }
            });
            const result = await client.mutate({
              mutation: CREATE_USER,
              variables: {
                input: {
                  name,
                  email,
                  pictureUrl,
                  userPreferenceId: email
                }
              }
            });
            const user = result.data.createUser;
            
            const id = uuidv5(email, uuidv5.DNS);
            const input = {
              id,
              ...defaultSchedule(this.props.stores.settingsStore.language)
            };

            await client.mutate({
              mutation: CREATE_SCHEDULE,
              variables: {
                input
              }
            });
            client.writeQuery({
              query: GET_USER,
              variables: {
                id: email
              },
              data: {
                me: user
              }
            });
          } else {
            const user = data.me;
            this.props.stores.settingsStore.setUserPreference(user.preference);
          }
          this.props.stores.appState.setUserId(email);
          this.props.navigation.navigate('App');
        } catch(error) {
          SimpleToast.show("Sign-in failed", SimpleToast.LONG);
          console.log(error.message);
        }
        this.props.stores.appState.setLoginState(false);
        break;
    }
  };

  _signInAsync = async (provider) => {
    try {
      this.props.stores.appState.setLoginState(true);
      await Auth.federatedSignIn({ provider });
    } catch (error) {
      console.log(error);
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

const withApolloClient = withApollo(Container);
const withFocus = withNavigationFocus(withApolloClient);

export default inject("stores")(observer(withFocus));