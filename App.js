import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import { GoogleSignin } from 'react-native-google-signin';
import { ApolloProvider } from 'react-apollo';
import { Provider as MobxProvider } from 'mobx-react/native';
import { Rehydrated } from 'aws-appsync-react';
import SplashScreen from 'react-native-splash-screen';
import 'babel-polyfill';
import Amplify, { Auth } from 'aws-amplify';
import AppContainer from './src/App';
import Loading from './src/components/common/Loading';
import NavigationService from './src/config/navigation';
import config from './src/aws-exports';
import client from './src/config/client';
import theme from './src/config/theme';
import env from './src/config/env';
import stores from './src/stores';
// import { refreshGoogleToken } from './src/config/auth';

console.disableYellowBox = true;

// window.LOG_LEVEL = 'DEBUG';
GoogleSignin.configure({
  webClientId: env.WEB_CLIENT_ID,
  offlineAccess: true
});
Amplify.configure(config);
// Auth.configure({
//   refreshHandlers: {
//     'google': refreshGoogleToken
//   } 
// });

export default class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide();
  }

  render() {
    return (
      <MenuProvider backHandler={true}>
        <PaperProvider theme={theme}>
          <ApolloProvider client={client}>
            <Rehydrated loading={<Loading />}>
              <MobxProvider stores={stores}>
                <AppContainer
                  ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                  }}
                />
              </MobxProvider>
            </Rehydrated>
          </ApolloProvider>
        </PaperProvider>
      </MenuProvider>
    );
  }
}
