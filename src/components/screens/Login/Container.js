import React from 'react';
import { Auth, Analytics } from 'aws-amplify';
import SimpleToast from 'react-native-simple-toast';
import { inject, observer } from 'mobx-react/native';
import client from 'config/client';
import Login from './Login';
import Loading from 'components/common/Loading';

@inject("stores")
@observer
export default class LoginScreen extends React.Component {
  state = { loading: false };
  
  _bootstrap = async () => {
    try { await client.clearStore() } catch (e) {}
    // try { await Auth.signOut() } catch (e) {}
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
      await this.props.stores.me.login({
        name,
        email,
        pictureUrl
      });
      this.props.navigation.navigate('App');
      SimpleToast.show(`Welcome ${name}!`, SimpleToast.SHORT);
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