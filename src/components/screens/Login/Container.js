import React from 'react';
import { Auth } from 'aws-amplify';
import SimpleToast from 'react-native-simple-toast';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { inject, observer } from 'mobx-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import client from 'config/client';
import { LoginUser } from 'mygraphql/mutations';
import Login from './Login';
import Loading from 'components/common/Loading';

@inject("stores")
@observer
class Container extends React.Component {
  state = { loading: false };
  
  _bootstrap = async () => {
    try {
      client.clearCaches && client.clearCaches();
      await client.clearStore();
    } catch (e) {}
  }

  componentDidMount = async () => {
    const { stores } = this.props;
    const colors = stores.themeStore.colors;
    try {
      await changeNavigationBarColor(colors.primary_light, false);
    } catch (error) {}
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
        email,
        name: email
      });
      this.props.stores.me.login({
        id: email,
        name,
        email,
        pictureUrl
      });
      await this.props.onSubmit({
        name,
        email,
        pictureUrl
      });
      this.props.navigation.navigate('AuthLoading');
      SimpleToast.show(`Welcome ${name}!`, SimpleToast.SHORT);
    } catch (error) {
      SimpleToast.show('Login failed: ' + error.message, SimpleToast.SHORT);
      this.setState({ loading: false });
    }
  };

  render() {
    return this.state.loading ? ( <Loading />
    ) : ( <Login handleLogin={this._signInAsync} loading={this.state.loading} /> );
  }
}

export default graphql(gql(LoginUser), {
  alias: 'withLoginScreen',
  props: ({ mutate, ownProps }) => ({
    onSubmit: (input) => mutate({
      variables: {
        input
      }
    }),
    ...ownProps
  })
})(Container);
