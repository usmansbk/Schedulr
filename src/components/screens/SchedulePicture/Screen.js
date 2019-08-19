import React from 'react';
import { I18n } from 'aws-amplify';
import Viewer from 'components/common/ImageViewer';
import Error from 'components/common/Error';

export default class AvatarViewer extends React.Component {
  _goBack = () => this.props.navigation.goBack();

  _removeImage = async () => {
    const { uploadPhoto, schedule: { id } } = this.props;
    const input = {
      id,
      picture: null
    };
    await uploadPhoto(input);
  };

  _uploadImage = async (picture) => {
    const { schedule: { id }, uploadPhoto } = this.props;
    const input = {
      id,
      picture
    };
    await uploadPhoto(input);
  };

  render() {
    const { schedule } = this.props;
    if (!schedule) return <Error
      message={I18n.get("ERROR_itemMayHaveBeenDeletedContactOwner")}
    />;
    const {id, name, isOwner, picture } = schedule;

    return (
      <Viewer
        id={id}
        title={name}
        goBack={this._goBack}
        onUploadPhoto={this._uploadImage}
        onRemovePhoto={this._removeImage}
        folder="schedule_picture"
        me={isOwner}
        s3Object={picture}
        fit="contain"
      />
    );
  }
}