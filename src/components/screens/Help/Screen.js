import React from 'react';
import { Linking, Platform } from 'react-native';
import Help from './Help';
import env from 'config/env';
import logger from 'config/logger';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _onPressItem = (id) => {
    let url;
    switch(id) {
      case 'faq':
        url = env.FAQ_URL;
        break;
      case 'contact':
        url = `mailto:${env.EMAIL}?subject=[${Platform.OS}] User Feedback`;
        break;
      case 'copyright':
        url = env.LEGALITY_URL;
        break;
      case 'terms':
        url = env.TERMS_URL;
        break;
      case 'privacy':
        url = env.PRIVACY_URL;
        break;
      default:
        url = env.APP_URL;
        break;
    }
    Linking.openURL(url)
      .catch(logger.logError);
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