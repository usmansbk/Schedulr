import React from 'react';
import Screen from './Screen';

export default class ImageViewerContainer extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _uploadPhoto = () => console.log('wip');

  render() {
    const { title, uri } = this.props;

    return (
      <Screen
        goBack={this._goBack}
        title={title}
        uri={uri}
        uploadPhoto={this._uploadPhoto}
      />
    );
  }
}