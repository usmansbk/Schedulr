import React from 'react';
import { Auth, Analytics } from 'aws-amplify';
import SimpleToast from 'react-native-simple-toast';
import Login from './Login';
import Loading from '../../common/Loading';

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
      await this.props.onLogin({
        name,
        email,
        pictureUrl
      });
      this.props.navigation.navigate('App');
    } catch (error) {
      SimpleToast.show('Login failed', SimpleToast.SHORT);
      this.setState({ loading: false });
      // Analytics.record({
      //   name: 'login_error',
      //   attributes: {
      //     errorName: error.name,
      //     loginProvider: provider,
      //     errorMessage: error.message,
      //     component: 'LoginScreenContainer'
      //   }
      // });
    }
  };

  render() {
    return this.state.loading ? ( <Loading />
    ) : ( <Login handleLogin={this._signInAsync} /> );
  }
}