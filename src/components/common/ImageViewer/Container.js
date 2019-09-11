import React from 'react';
import ImagePicker from 'react-native-image-picker';
import SimpleToast from 'react-native-simple-toast';
import { Storage, I18n } from 'aws-amplify';
import config from 'aws_config';
import getImageUrl from 'helpers/getImageUrl';
import Alert from 'components/dialogs/Alert';s
import Screen from './Screen';

const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region
} = config;

const MAX_FILE_SIZE = 1024 * 4000;
const EPSILON = 1024 * 100;

export default class ImageViewerContainer extends React.Component {
  state = {
    loading: false,
    showRemoveImageAlert: false
  };

  componentDidMount = () => {
    const { s3Object, uri } = this.props;
    if (!(s3Object || uri)) SimpleToast.show(I18n.get("TOAST_noImageFound"), SimpleToast.SHORT);
  };

  _goBack = () => this.props.goBack();

  _showRemoveImageAlert = () => this.setState({ showRemoveImageAlert: true });
  _hideRemoveImageAlert = () => this.setState({ showRemoveImageAlert: false });

  _removePhoto = async () => {
    const { onRemovePhoto, s3Object } = this.props;
    this.setState({ loading: true });
    if (s3Object) {
      try {
        await Storage.remove(s3Object.key).catch();
      } catch(error) {
        SimpleToast.show(error.message, SimpleToast.SHORT);
      }
    }
    try {
      await onRemovePhoto();
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  _uploadPhoto = () => {
    const { id, onUploadPhoto, s3Object, folder="public" } = this.props;
    ImagePicker.showImagePicker(null, async (response) => {
      if (response.error) {
        SimpleToast.show(response.error.message, SimpleToast.SHORT);
      } else {
        const { type, uri, fileName, fileSize } = response;
        if (fileSize > (MAX_FILE_SIZE + EPSILON)) {
          SimpleToast.show(I18n.get("WARNING_fileTooLarge"), SimpleToast.SHORT);
        } else {
          try {
            const key = `${folder}/${id}${fileName}`;
            const fileForUpload = {
              key,
              bucket,
              region
            };
  
            if (uri) {
              const fetchResponse = await fetch(uri);
              const blob = await fetchResponse.blob();
              this.setState({ loading: true });
              if (s3Object) await Storage.remove(s3Object.key).catch();
              await Storage.put(key, blob, {
                contentType: type
              }).catch();
              await onUploadPhoto(fileForUpload);
              this.setState({ loading: false });
            }
          } catch (error) {
            SimpleToast.show(error.message, SimpleToast.SHORT);
          }
        }
      }
    })
  };

  render() {
    const { title, uri, me, s3Object, fit } = this.props;

    const url = s3Object ? getImageUrl(s3Object, 1040, fit) : uri;
    
    return (
      <>
      <Screen
        loading={this.state.loading}
        goBack={this._goBack}
        title={title}
        uri={url}
        uploadPhoto={this._uploadPhoto}
        deletePhoto={this._showRemoveImageAlert}
        me={me}
        s3Object={s3Object}
      />
      <Alert
        visible={this.state.showRemoveImageAlert}
        title={I18n.get("ALERT_deleteImage")}
        onConfirm={this._removePhoto}
        handleDismiss={this._hideRemoveImageAlert}
      />
      </>
    );
  }
}