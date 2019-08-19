import React from 'react';
import { I18n } from 'aws-amplify';
import Viewer from 'components/common/ImageViewer';
import Error from 'components/common/Error';

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
    const { event } = this.props;
    if (!event) return <Error
      message={I18n.get("ERROR_itemMayHaveBeenDeletedContactOwner")}
    />;

    const {id, title, isOwner, banner } = event;
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