import React from 'react';
import { Linking } from 'react-native';
import { Auth, Analytics } from 'aws-amplify';
import SimpleToast from 'react-native-simple-toast';
import client from '../../../config/client';
import NavigationService from '../../../config/navigation';
import Login from './Login';
import Loading from '../../common/Loading';

export default class LoginScreen extends React.Component {
  state = { loading: false };
  
  _bootstrap = async () => {
    try { await client.clearStore() } catch (e) {}
    try { await Auth.signOut() } catch (e) {}
  }

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
      await this._bootstrap();
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
      const url = await Linking.getInitialURL();
      if (url) NavigationService.deepLinkNavigate(url);
      else this.props.navigation.navigate('App');
    } catch (error) {
      SimpleToast.show('Login failed: ' + error.message, SimpleToast.SHORT);
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