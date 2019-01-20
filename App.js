import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import SplashScreen from 'react-native-splash-screen';
import Amplify from 'aws-amplify';
import AppContainer from './src/App';
import Loading from './src/components/common/Loading';
import NavigationService from './src/config/navigation';
import config from './src/aws-exports';
import client from './src/config/client';
import theme from './src/config/theme';
import { initRefreshHandlers } from './src/config/auth';

// console.disableYellowBox = true;

Amplify.configure(config);

export default class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide();
    initRefreshHandlers();
  }
  
  render() {
    return (
      <MenuProvider backHandler={true}>
        <PaperProvider theme={theme}>
          <ApolloProvider client={client}>
            <Rehydrated loading={<Loading />}>
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
