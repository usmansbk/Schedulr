import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloProvider } from 'react-apollo';
import { Provider as MobxProvider } from 'mobx-react';
import { Rehydrated } from 'aws-appsync-react';
import SplashScreen from 'react-native-splash-screen';
import codepush from 'react-native-code-push';
import { observer } from 'mobx-react';
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

console.disableYellowBox = true;
Amplify.configure(aws_config);
i18n(stores);
stores.init();

@codepush
@observer
export default class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide();
    push.init();
    if (__DEV__) {
      codepush.sync({
        deploymentKey: env.CODE_PUSH_STAGING
      });
    }
  };

  componentDidCatch = (error) => {
    logger.logError(error);
    if (__DEV__) return;
  };

  render() {
    return (
      <PaperProvider theme={stores.themeStore.theme}>
        <ApolloProvider client={client}>
          <Rehydrated loading={<Loading  dark={stores.settingsStore.dark}/>} >
            <MobxProvider stores={stores}>
                <AppContainer
                  uriPrefix={env.uriPrefix}
                  ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                  }}
                />
            </MobxProvider>
          </Rehydrated>
        </ApolloProvider>
      </PaperProvider>
    );
  }
}
