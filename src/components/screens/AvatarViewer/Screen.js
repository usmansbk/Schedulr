import React from 'react';
import Viewer from 'components/common/ImageViewer';

export default class AvatarViewer extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _uploadImage = () => console.log('upload');

  render() {
    const { user: { name, me, pictureUrl } } = this.props;
    console.log(name, me, pictureUrl);
    return (
      <Viewer
        title={name}
        uri={pictureUrl}
        goBack={this._goBack}
        uploadPhoto={this._uploadImage}
        me={me}
      />
    );
  }
}