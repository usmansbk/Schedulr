import React from 'react';
import Viewer from 'components/common/ImageViewer';

export default class AvatarViewer extends React.Component {
  _goBack = () => this.props.navigation.goBack();

  _removeImage = async () => {
    const { uploadPhoto, user: { id } } = this.props;
    const input = {
      id,
      pictureUrl: null,
      avatar: null
    };
    await uploadPhoto(input);
  };

  _uploadImage = async (avatar) => {
    const { user: { id }, uploadPhoto } = this.props;
    const input = {
      id,
      avatar
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
        onUploadPhoto={this._uploadImage}
        onRemovePhoto={this._removeImage}
        folder="profile_image"
        me={me}
        s3Object={avatar}
      />
    );
  }
}