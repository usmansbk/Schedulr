import React from 'react';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

export default class MyWebView extends React.Component {
  _webViewRef = ref => this.ref = ref;

  _handleReload = () => {
    this.ref && this.ref.reload();
  };

  render() {
    return (
      <Error />
    );
  }
} 