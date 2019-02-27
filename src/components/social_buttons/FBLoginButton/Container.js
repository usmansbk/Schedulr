import React from 'react';
import { Analytics } from 'aws-amplify';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} from 'react-native-fbsdk';
import SimpleToast from 'react-native-simple-toast';
import Button from './Button';

export default class Container extends React.Component {
  state = {
    loading: false,
  };

  _signIn = async () => {
    this.setState({ loading: true });
    try {
      const response = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (response.isCancelled) {
        SimpleToast.show('Login cancelled', SimpleToast.SHORT);
      } else {
        return await this._requestUserInfo();
      }
    } catch (error) {
      SimpleToast.show('Connection error', SimpleToast.SHORT);
    }
    this.setState({ loading: false });
  };

  _requestUserInfo = async () => {
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

  _responseInfoCallback = async (error, result) => {
    if (error) {
      SimpleToast.show(error.message, SimpleToast.LONG);
      // Analytics.record({
      //   name: 'fb_login_error',
      //   attributes: {
      //     name: error.name,
      //     message: error.message
      //   },
      // });
    } else if (result) {
      const { email, name, picture } = result;
      return await this.props.onLogin({
        provider: 'facebook',
        email,
        name,
        pictureUrl: picture && picture.data && picture.data.url
      });
    } else {
      SimpleToast.show('Something went wrong', SimpleToast.SHORT);
    }
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <Button
        loading={loading}
        disabled={loading}
        onPress={this._signIn}
      />
    )
  }
}