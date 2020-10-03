import React from 'react';
import {Linking, Platform} from 'react-native';
import Help from './Help';
import env from 'config/env';
import logger from 'config/logger';
import Suspense from 'components/common/Suspense';

export default class Screen extends React.Component {
  state = {
    display: false,
  };

  componentDidMount = () => {
    this.timer = setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  _goBack = () => this.props.navigation.goBack();
  _onPressItem = (id) => {
    let url;
    switch (id) {
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
    Linking.openURL(url).catch(logger.logError);
  };

  render() {
    if (!this.state.display) return <Suspense />;
    return <Help goBack={this._goBack} onPressItem={this._onPressItem} />;
  }
}
