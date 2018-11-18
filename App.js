import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';
import theme from './src/config/theme';

export default () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
);