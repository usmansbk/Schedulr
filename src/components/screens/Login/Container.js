import React from 'react';
import uuidv5 from 'uuid/v5';
import {Auth, Hub, I18n} from 'aws-amplify';
import {inject, observer} from 'mobx-react';
import {withNavigationFocus} from 'react-navigation';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
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
    this.props.stores.appState.setLoginState(null);
    Hub.listen('auth', this._authListener);
  };

  _authListener = async ({payload: {event}}) => {
    const {client, stores} = this.props;
    switch (event) {
      case 'signIn_failure':
        snackbar(I18n.get('ERROR_signInFailure'), true);
        this.props.stores.appState.setLoginState(null);
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
                  id: email,
                  disablePush: false,
                  language: stores.settings.userPreference.language || 'en',
                },
              },
            });
            const result = await client.mutate({
              mutation: CREATE_USER,
              variables: {
                input: {
                  id: email,
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
          this.props.stores.appState.setState(user.state || {});
          this.props.stores.appState.setUserId(email);
          this.props.stores.settings.setUserPreference(user.preference);
          logger.log('sign-in');
          this.props.navigation.navigate('App');
        } catch (error) {
          snackbar(I18n.get('ERROR_signInFailure'));
          logger.logError(error);
        }
        this.props.stores.appState.setLoginState(null);
        break;
    }
  };

  _signInAsync = async (provider) => {
    this.props.stores.appState.setLoginState(provider);
    try {
      await Auth.federatedSignIn({provider});
    } catch (error) {
      logger.logError(error);
      this.props.stores.appState.setLoginState(null);
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
