import React from 'react';
import { Auth, Analytics, Cache } from 'aws-amplify';
import Toast from 'react-native-simple-toast';
import Loading from '../../common/Loading';
import Login from './Login';

export default class LoginScreen extends React.Component {
  state = { loading: false };

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
      await Auth.federatedSignIn(provider, {
        token,
        expires_at,
      },{
        email
      });
      const { loginUser: { id } } = await this.props.onLogin({
        name,
        email,
        pictureUrl
      });
      await Cache.setItem('loginInfo', JSON.stringify({
        id,
        name,
        email,
        pictureUrl
      }));
      this.props.navigation.navigate('App');
    } catch (error) {
      Toast.show('Login failed', Toast.SHORT);
      this.setState({ loading: false });
      Analytics.record({
        name: 'login_error',
        attributes: {
          errorName: error.name,
          loginProvider: provider,
          errorMessage: error.message,
          component: 'LoginScreenContainer'
        }
      });
    }
  };

  render() {
    return this.state.loading ? ( <Loading />
    ) : ( <Login handleLogin={this._signInAsync} /> );
  }
}