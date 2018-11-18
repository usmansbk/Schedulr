import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import AppContainer from './src/App';
import theme from './src/config/theme';

export default class App extends React.Component {
  componentDidMount = () => {
    SplashScreen.hide();
  }
  
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    );
  }
}
