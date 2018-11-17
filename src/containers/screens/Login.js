import React, { PureComponent } from 'react';
import { ToastAndroid, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Mutation, Query } from 'react-apollo';
import updateSubscriptionStatus from '../../lib/updateSubscriptionStatus';
import Login from '../../components/screens/Login';
import LOGIN from '../../graphql/mutation/Login';
import LOGIN_STATUS from '../../graphql/localState/query/LoginStatus';
import UPDATE_LOGIN_STATUS from '../../graphql/mutation/UpdateLoginStatus';
import { LOGIN_ERROR } from '../../lib/errorMessages';

class LoginContainer extends PureComponent {

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _handleError = () => ToastAndroid.show(LOGIN_ERROR, ToastAndroid.SHORT)
  
  render() {
    const community = this.props.navigation.getParam('community');
    const { logo } = community || {};
    return (
      <Query query={LOGIN_STATUS}>
        {({ data: { loginStatus: { isLoggedIn, agent } } }) => {
          return (
            <Mutation mutation={UPDATE_LOGIN_STATUS}>
              {(updateLoginStatus) => {
                return (
                  <Mutation
                    mutation={LOGIN}
                    onCompleted={async (result) => {
                      const { login: { token } } = result;
                      await AsyncStorage.setItem('token', token);
                      updateLoginStatus({
                        variables: {
                          isLoggedIn: true,
                        }
                      });
                      updateSubscriptionStatus();
                      this.props.navigation.navigate('App');
                    }}
                  >
                    {(login, { loading, error}) => {
                      return (
                        <Login
                          loading={loading}
                          error={error}
                          logo={logo}
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

export default withNavigation(LoginContainer);