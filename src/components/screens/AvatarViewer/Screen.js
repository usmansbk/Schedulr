import React from 'react';
import Viewer from 'components/common/ImageViewer';

export default class AvatarViewer extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _uploadImage = async (fileForUpload) => {
    const { user: { id }, uploadPhoto } = this.props;
    const input = {
      id,
      avatar: fileForUpload
    };
    await uploadPhoto(input);
  };

  render() {
    const { user: {id, name, me, pictureUrl, avatar } } = this.props;

    return (
      <Viewer
        id={id}
        title={name}
        uri={pictureUrl}
        goBack={this._goBack}
        uploadPhoto={this._uploadImage}
        s3={avatar}
        me={me}
      />
    );
  }
}