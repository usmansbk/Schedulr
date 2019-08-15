import React from 'react';
import Screen from './Screen';

export default class ImageViewerContainer extends React.Component {
  _goBack = () => this.props.goBack();
  _uploadPhoto = () => {
    console.log('call picker');
    this.props.uploadPhoto('file');
  };

  render() {
    const { title, uri, me } = this.props;

    return (
      <Screen
        goBack={this._goBack}
        title={title}
        uri={uri}
        uploadPhoto={this._uploadPhoto}
        me={me}
      />
    );
  }
}