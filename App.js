import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import { ApolloProvider } from 'react-apollo';
import SplashScreen from 'react-native-splash-screen';
import Amplify from 'aws-amplify';
import AppContainer from './src/App';
import NavigationService from './src/config/navigation';
import config from './src/aws-exports';
import client from './src/config/client';
import theme from './src/config/theme';

// console.disableYellowBox = true;

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
            <AppContainer
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </ApolloProvider>
        </PaperProvider>
      </MenuProvider>
    );
  }
}
