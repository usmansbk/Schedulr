import React, { PureComponent } from 'react';
import { ToastAndroid, AsyncStorage } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import updateSubscriptionStatus from '../lib/updateSubscriptionStatus';
import LoginButtons from '../components/LoginButtons';
import LOGIN from '../graphql/mutation/Login';
import UPDATE_LOGIN_STATUS from '../graphql/mutation/UpdateLoginStatus';
import LOGIN_STATUS from '../graphql/localState/query/LoginStatus';
import { LOGIN_ERROR } from '../lib/errorMessages';

export default class LoginButtonsContainer extends PureComponent {
  _handleError = () => ToastAndroid.show(LOGIN_ERROR, ToastAndroid.SHORT)
  render() {
    return (
      <Query query={LOGIN_STATUS}>
        {({ data: { loginStatus: { isLoggedIn, agent } } }) => {
          return (
            <Mutation
              mutation={UPDATE_LOGIN_STATUS}
            >
              {(updateLoginStatus) => {
                return (
                  <Mutation
                    mutation={LOGIN}
                    onCompleted={async (result) => {
                      const { login: { token } } = result;
                      await AsyncStorage.setItem('token', token);
                      updateSubscriptionStatus();
                      updateLoginStatus({
                        variables: {
                          isLoggedIn: true
                        }
                      });
                    }}
                  >
                    {(login) => {
                      return (
                        <LoginButtons
                          isLoggedIn={isLoggedIn}
                          agent={agent}
                          handleLogin={(user) => {
                            login({
                              variables: {
                                input: {
                                  user
                                }
                              }
                            })
                          }}
                        />
                      )
                    }}
                  </Mutation>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}