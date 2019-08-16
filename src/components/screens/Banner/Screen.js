import React from 'react';
import Viewer from 'components/common/ImageViewer';

export default class AvatarViewer extends React.Component {
  _goBack = () => this.props.navigation.goBack();

  _removeImage = async () => {
    const { uploadPhoto, event: { id } } = this.props;
    const input = {
      id,
      banner: null
    };
    await uploadPhoto(input);
  };

  _uploadImage = async (banner) => {
    const { event: { id }, uploadPhoto } = this.props;
    const input = {
      id,
      banner
    };
    await uploadPhoto(input);
  };

  render() {
    const { event: {id, title, isOwner, banner } } = this.props;
    
    return (
      <Viewer
        id={id}
        title={title}
        goBack={this._goBack}
        onUploadPhoto={this._uploadImage}
        onRemovePhoto={this._removeImage}
        folder="banner"
        me={isOwner}
        s3Object={banner}
        fit="contain"
      />
    );
  }
}