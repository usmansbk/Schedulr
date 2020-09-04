import React from 'react';
import uuidv5 from 'uuid/v5';
import {Auth, Hub, I18n} from 'aws-amplify';
import crashlytics from '@react-native-firebase/crashlytics';
import {inject, observer} from 'mobx-react';
import {withNavigationFocus} from 'react-navigation';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {getUserData} from 'api/queries';
import {createUser, createSchedule, createPreference} from 'api/mutations';
import Login from './Login';
import logger from 'config/logger';
import {baseEventsFilter} from 'graphql/filters';
import snackbar from 'helpers/snackbar';

const GET_USER = gql(getUserData);
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
      changeNavigationBarColor('white', true);
    } catch (error) {
      logger.logError(error);
    }
  };

  _authListener = async ({payload: {event}}) => {
    const {client, stores} = this.props;
    switch (event) {
      case 'signIn_failure':
        this.props.stores.appState.setLoginState(false);
        snackbar(I18n.get('ERROR_signInFailure'), true);
        break;
      case 'signIn':
        try {
          const currentUser = await Auth.currentAuthenticatedUser();
          const {
            signInUserSession: {
              idToken: {payload},
            },
          } = currentUser;
          const {email, name, picture} = payload;
          let pictureUrl;
          if (picture) {
            if (payload['cognito:username'].startsWith('Facebook')) {
              const json = JSON.parse(picture);
              pictureUrl = json.data.url;
            } else {
              pictureUrl = picture;
            }
          }
          const response = await client.query({
            query: GET_USER,
            fetchPolicy: 'network-only',
            variables: {
              filter: baseEventsFilter(),
              limit: 50,
            },
          });
          const {data} = response;
          let user = data && data.getUserData;
          if (!user) {
            await client.mutate({
              mutation: CREATE_PREFERENCE,
              variables: {
                input: {
                  disablePush: false,
                  language: stores.settings.userPreference.language || 'en',
                },
              },
            });
            const result = await client.mutate({
              mutation: CREATE_USER,
              variables: {
                input: {
                  name,
                  email,
                  pictureUrl,
                  userPreferenceId: email,
                },
              },
            });
            user = result.data.createUser;
            // Create user personal schedule
            const id = uuidv5(email, uuidv5.DNS);
            const input = {
              id,
              ...I18n.get('personalSchedule'),
            };

            await client.mutate({
              mutation: CREATE_SCHEDULE,
              variables: {
                input,
              },
            });

            await client.query({
              query: GET_USER,
              fetchPolicy: 'network-only',
            });
          }
          this.props.stores.appState.setState(user.state);
          this.props.stores.appState.setUserId(email);
          this.props.stores.settings.setUserPreference(user.preference);
          crashlytics().setAttributes({email});
          logger.log('sign-in');
          this.props.navigation.navigate('App');
          this.props.stores.appState.setLoginState(false);
        } catch (error) {
          this.props.stores.appState.setLoginState(false);
          snackbar(I18n.get('ERROR_signInFailure'));
          logger.logError(error);
        }
        break;
    }
  };

  _signInAsync = async (provider) => {
    this.props.stores.appState.setLoginState(true);
    try {
      await Auth.federatedSignIn({provider});
    } catch (error) {
      logger.logError(error);
    }
  };

  _emailSignIn = () => this.props.navigation.navigate('EmailLogin');

  render() {
    return (
      <Login
        handleLogin={this._signInAsync}
        handleEmailLogin={this._emailSignIn}
      />
    );
  }
}

const withApolloClient = withApollo(Container);
const withFocus = withNavigationFocus(withApolloClient);

export default inject('stores')(observer(withFocus));
