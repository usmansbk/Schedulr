import React from 'react';
import { WebView } from 'react-native-webview';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

export default class MyWebView extends React.Component {
  _webViewRef = ref => this.ref = ref;

  _handleReload = () => {
    this.ref && this.ref.reload();
  };

  render() {
    return (
      <WebView
        ref={this._webViewRef}
        source={{
          uri: this.props.navigation.getParam('url')
        }}
        startInLoadingState
        renderLoading={() => <Loading />}
        renderError={() => <Error onRefresh={this._handleReload} />}
      />
    );
  }
} 