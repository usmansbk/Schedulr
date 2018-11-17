import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import {
  Text,
  Button,
  Icon,
  Spinner
} from 'native-base';
import Firebase from 'react-native-firebase';
import { withNavigation } from 'react-navigation';
import { ToastAndroid, AsyncStorage } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import UPDATE_LOGIN_AGENT from '../../graphql/mutation/UpdateLoginAgent';
import client from '../../config/apolloClient';
import { clearNotifications } from '../../lib/notifications';
import i18n from '../../config/i18n';

class GLoginButton extends PureComponent {
  state = {
    loading: false
  }

  componentDidMount = () => {
    GoogleSignin.configure();
  }

  signOut = async () => {
    try {
      this.setState({ loading: true });
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      Firebase.crashlytics().log(error.message)
    }
    await AsyncStorage.removeItem('token');
    this.setState({ loading: false });
    client.resetStore();
    clearNotifications();
    this.props.navigation.navigate('Auth');
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { user: { email, photo, name } } = await GoogleSignin.signIn();
      const { handleLogin, updateLoginAgent } = this.props;
      updateLoginAgent('google');
      handleLogin({ email, photo, name});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show('Cancelled', ToastAndroid.SHORT);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show('Signing in...', ToastAndroid.SHORT);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show('Play services not installed', ToastAndroid.SHORT);
      } else {
        const { handleLogin, updateLoginAgent } = this.props;
        updateLoginAgent('google');
        handleLogin({ email: 'test@gmail.com', photo: null, name: 'Test Usman Suleiman'});
        Firebase.crashlytics().log(error.message);
      }
    }
  };

  render() {
    const { isLoggedIn } = this.props;
    const { loading } = this.state;
    if (loading) return <Spinner />
    return (
      <Button
        disabled={loading}
        bordered
        rounded
        block
        onPress={isLoggedIn ? this.signOut : this.signIn}
      >
        <Icon type="FontAwesome" name="google" style={{ color: '#4285F4' }}/>
        <Text uppercase={false}>{
          isLoggedIn ? i18n.t('auth.sign_out') : i18n.t('auth.goog_sign_in')
        }</Text>
      </Button>
    )
  }
}

const WrappedComponent = graphql(UPDATE_LOGIN_AGENT, {
  props: ({ mutate }) => ({
    updateLoginAgent: agent => mutate({ variables: { agent } }),
  })
})(GLoginButton);

export default withNavigation(WrappedComponent);