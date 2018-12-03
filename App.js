import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';
import Amplify from 'aws-amplify';
import AppContainer from './src/App';
import config from './src/aws-exports';
import theme from './src/config/theme';

Amplify.configure(config);

export default class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide();
  }
  
  render() {
    return (
      <MenuProvider backHandler={true}>
        <PaperProvider theme={theme}>
          <AppContainer />
        </PaperProvider>
      </MenuProvider>
    );
  }
}
