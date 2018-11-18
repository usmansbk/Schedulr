/**
 * Schdlr App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { YellowBox } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { MenuProvider } from 'react-native-popup-menu';
import { Root } from 'native-base';
import Config from 'react-native-config';
import RNLanguages from 'react-native-languages';
import Firebase from 'react-native-firebase';
import AppContainer from './src/components/Navigator';
import client from './src/config/apolloClient';
import i18n from './src/config/i18n';

const prefix = Config.APP_URL;

const defaultHandler = (ErrorUtils.getGlobalHandler &&
  ErrorUtils.getGlobalHandler()) || ErrorUtils._globalHandler;

ErrorUtils.setGlobalHandler((error, isFatal) => {
  Firebase.crashlytics().log(error.stack);
  if (isFatal) {
    //Firebase.crashlytics().crash();
  } else {
    Firebase.crashlytics().recordError(0, 'non-fatal');
  }
  defaultHandler.apply(this.arguments);
})

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

export default class App extends React.Component {
  componentWillMount() {
    RNLanguages.addEventListener('change', this._onLanguagesChange);
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this._onLanguagesChange);
  }

  _onLanguagesChange = ({ language }) => {
    i18n.locale = language;
  };

  render() {
    return (
      <Root>
        <MenuProvider backHandler>
          <ApolloProvider client={client}>
            <AppContainer uriPrefix={prefix} />
          </ApolloProvider>
        </MenuProvider>
      </Root>
    )
  }
}