import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {ApolloProvider} from 'react-apollo';
import {Provider as MobxProvider} from 'mobx-react';
import {MenuProvider} from 'react-native-popup-menu';
import {Rehydrated} from 'aws-appsync-react';
import SplashScreen from 'react-native-splash-screen';
import {observer} from 'mobx-react';
import Amplify from 'aws-amplify';
import AppContainer from './src/App';
import Loading from 'components/common/Hydrating';
import NavigationService from 'config/navigation';
import aws_config from 'aws_config';
import client from 'config/client';
import env from 'config/env';
import push from 'config/pushnotification';
import i18n from 'config/i18n';
import stores from 'stores';
import logger from 'config/logger';
import urlOpener from 'helpers/urlOpener';

Amplify.configure({
  ...aws_config,
  oauth: {
    ...aws_config.oauth,
    urlOpener,
  },
});
i18n(stores);
stores.init();

@observer
export default class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide();
    push.init();
  };

  componentDidCatch = (error) => {
    logger.logError(error);
    if (__DEV__) return;
  };

  render() {
    return (
      <PaperProvider theme={stores.theme.theme}>
        <MenuProvider backHandler>
          <ApolloProvider client={client}>
            <Rehydrated loading={<Loading dark={stores.settings.dark} />}>
              <MobxProvider stores={stores}>
                <AppContainer
                  uriPrefix={env.uriPrefix}
                  ref={(navigatorRef) => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                  }}
                />
              </MobxProvider>
            </Rehydrated>
          </ApolloProvider>
        </MenuProvider>
      </PaperProvider>
    );
  }
}
