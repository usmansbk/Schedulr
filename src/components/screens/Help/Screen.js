import React from 'react';
import { Linking } from 'react-native';
import email from 'react-native-email';
import Help from './Help';
import env from 'config/env';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _onPressItem = (id) => {
    let url;
    switch(id) {
      case 'faq':
        url = env.FAQ_URL;
        break;
      case 'contact':
        // url = env.CONTACT_URL;
        email(env.EMAIL, {
          subject: 'Massage from application user'
        }).catch(console.error);
        break;
      case 'copyright':
        url = env.LEGALITY_URL;
        break;
      case 'terms':
        url = env.TERMS_URL;
        break;
      default:
        url = env.APP_URL;
        break;
    }
    Linking.openURL(url)
      .catch(console.log);
  };

  render() {
    return (
      <Help
        goBack={this._goBack}
        onPressItem={this._onPressItem}
      />
    );
  }
}