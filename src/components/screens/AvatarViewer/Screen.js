import React from 'react';
import Viewer from 'components/common/ImageViewer';

export default class AvatarViewer extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _uploadImage = async (avatar) => {
    const { user: { id }, uploadPhoto } = this.props;
    const { key, bucket, region } = avatar;
    const pictureUrl = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    const input = {
      id,
      pictureUrl,
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
        uploadPhoto={this._uploadImage}
        me={me}
        prevS3Object={avatar}
      />
    );
  }
}