import React from 'react';
import { WebView } from 'react-native-webview';

export default (props) => (
  <WebView
    source={{
      uri: props.navigation.getParam('url')
    }}
  />
);