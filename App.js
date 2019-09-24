import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloProvider } from 'react-apollo';
import { Provider as MobxProvider } from 'mobx-react';
import { Rehydrated } from 'aws-appsync-react';
import SplashScreen from 'react-native-splash-screen';
import { observer } from 'mobx-react';
import Amplify from 'aws-amplify';
import AppContainer from './src/App';
import Loading from 'components/common/Hydrating';
import NavigationService from 'config/navigation';
import aws_config from 'aws_config';
import client from 'config/client';
import stores from 'stores';
import env from 'config/env';
import i18n from 'config/i18n';

console.disableYellowBox = true;

// window.LOG_LEVEL = 'DEBUG';

Amplify.configure(aws_config);

@observer
export default class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide();
    i18n(stores.settingsStore.language);
  }

  render() {
    return (
      <PaperProvider theme={stores.themeStore.theme}>
        <ApolloProvider client={client}>
          <Rehydrated loading={<Loading />}>
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
