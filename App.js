import React from 'react';
import { YellowBox } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import SplashScreen from 'react-native-splash-screen';
import Amplify from 'aws-amplify';
import AppContainer from './src/App';
import NavigationService from './src/config/navigation';
import config from './src/aws-exports';
import client from './src/config/client';
import theme from './src/config/theme';

// console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
YellowBox.ignoreWarnings(['Module RCTImageLoader requires']);
YellowBox.ignoreWarnings(['Remote debugger is in a background tab']);

Amplify.configure(config);

export default class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide();
  }
  
  render() {
    return (
      <MenuProvider backHandler={true}>
        <PaperProvider theme={theme}>
          <ApolloProvider client={client}>
            <Rehydrated>
              <AppContainer
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </Rehydrated>
          </ApolloProvider>
        </PaperProvider>
      </MenuProvider>
    );
  }
}
