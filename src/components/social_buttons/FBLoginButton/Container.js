import React from 'react';
import firebase from 'react-native-firebase';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} from 'react-native-fbsdk';
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
        alert('Login was cancelled');
      } else {
        await this._requestUserInfo();
      }
    } catch (error) {
      alert('Connection Error: Login failed');
      this.setState({ loading: false });
    }
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
      alert('Error fetching data: ' + error.message);
      firebase.crashlytics().log(error.message);
    } else if (result) {
      console.log(result);
      const { email, name, picture } = result;
      await this.props.onLogin({
        provider: 'facebook',
        email,
        name,
        pictureUrl: picture && picture.data && picture.data.url
      });
    } else {
      alert('Something went wrong!');
    }
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