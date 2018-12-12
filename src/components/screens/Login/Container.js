import React from 'react';
import { Auth, Analytics } from 'aws-amplify';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-simple-toast';
import Loading from '../../common/Loading';
import Login from './Login';

export default class LoginScreen extends React.Component {
  state = {
    loading: false
  };

  _signInAsync = async ({
    name,
    email,
    pictureUrl,
    provider,
    token,
    expires_at
  }) => {
    this.setState({ loading: true });
    try {
      const credentials = await Auth.federatedSignIn(provider, {
        token,
        expires_at,
      },{
        email
      });
      await AsyncStorage.setItem('loginInfo', JSON.stringify({
        id: credentials.data.id,
        name,
        email,
        pictureUrl
      }));
      this.props.navigation.navigate('App');
      Analytics.record({
        name: 'sign_in',
        attributes: {
          username: name,
          email,
          provider
        }
      });
    } catch (error) {
      Toast.show('Login failed', Toast.SHORT);
      this.setState({ loading: false });
      Analytics.record({
        name: 'login_error',
        attributes: {
          username: name,
          name: error.name,
          message: error.message,
          component: 'LoginScreenContainer'
        }
      });
    }
  };

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <Login
        handleLogin={this._signInAsync}
      />
    );
  }
}