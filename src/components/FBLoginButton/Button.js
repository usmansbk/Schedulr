import React from 'react';
import {
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} from 'react-native-fbsdk';
import {
  Text,
  Button,
  Icon
} from 'native-base';
import Firebase from 'react-native-firebase';
import client from '../../config/apolloClient';
import i18n from '../../config/i18n';
import { clearNotifications } from '../../lib/notifications';
import styles from './styles';

const LOGIN_CANCELLED = 'Login cancelled!';

class FbButton extends React.Component {

  state = {
    isLoggedIn: false
  }

  componentDidMount = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isFbLoggedIn') || false;
      this.setState({
        isLoggedIn
      });
    } catch (e) {
      Firebase.crashlytics().log(e.message);
    }
  }

  _handleLogout = async () => {
    clearNotifications();
    LoginManager.logOut();
    try {
      await AsyncStorage.multiRemove(['token', 'isFbLoggedIn']);
      client.resetStore();
      this.props.navigation.navigate('Auth');
    } catch (e) {
      ToastAndroid.show(i18n.t('error.login_failed'), ToastAndroid.SHORT);
      Firebase.crashlytics().log(e.message);
    }
  }

  _handleLogin = () => {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      this._handleLogout();
    } else {
      LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then(this._handleResponse, this._handleError);
    }
  }

  _handleError = (error) => ToastAndroid.show(`${i18n.t('error.login_failed')}: ${error.message}`, ToastAndroid.SHORT);
  
  _handleResponse = (result) => {
    if (result.isCancelled) {
      ToastAndroid.show(LOGIN_CANCELLED);
    } else {
      this._onLoginFinised();
    }
  }

  _responseInfoCallback = async (error, result) => {
    if (error) {
      ToastAndroid.show(`${i18n.t('error.login_failed')}: ${error.message}`, ToastAndroid.SHORT);
    } else if (result.isCancelled) {
      ToastAndroid.show(LOGIN_CANCELLED)
    } else {
      const { email, name, picture } = result;
      let photo;
      if (picture) {
        const { data } = picture;
        if (data) {
          photo = data.url;
        }
      }
      const { handleLogin } = this.props;
      try {
        await AsyncStorage.setItem('isFbLoggedIn', 'true');
        handleLogin({ email, name, photo });
      } catch (e) {
        ToastAndroid.show(i18n.t('error.login_failed'));
      }
    }
  }

  _onLoginFinised = async () => {
    const accessData = await AccessToken.getCurrentAccessToken();

    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessData,
        parameters: {
          fields: {
            string: 'id, email, picture.type(large)',
          }
        }
      },
      this._responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <Button
        rounded
        bordered
        onPress={this._handleLogin}
        block
        iconLeft
        style={styles.buttonSpacing}
      >
        <Icon style={{ color: '#3b5998' }} type="FontAwesome" name="facebook-official" />
        <Text uppercase={false}>
        {
          isLoggedIn ? i18n.t('auth.logout') : i18n.t('auth.fb_sign_in')
        }    
        </Text>
      </Button>
    )
  }
}

export default withNavigation(FbButton);