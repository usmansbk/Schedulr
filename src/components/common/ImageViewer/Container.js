import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { inject, observer } from 'mobx-react';
import { Storage, I18n } from 'aws-amplify';
import config from 'aws_config';
import getImageUrl from 'helpers/getImageUrl';
import Alert from 'components/dialogs/Alert';
import Screen from './Screen';
import logger from 'config/logger';

const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region
} = config;

const MAX_FILE_SIZE = 1024 * 6000; // 6MB
const EPSILON = 1024 * 100;

class ImageViewerContainer extends React.Component {
  state = {
    loading: false,
    showRemoveImageAlert: false
  };
  
  _goBack = () => this.props.goBack();

  _showRemoveImageAlert = () => this.setState({ showRemoveImageAlert: true });
  _hideRemoveImageAlert = () => this.setState({ showRemoveImageAlert: false });

  _removePhoto = async () => {
    if (this.props.stores.appState.isConnected) {
      const { onRemovePhoto, s3Object } = this.props;
      this.setState({ loading: true });
      if (s3Object) {
        try {
          this.props.stores.appState.removeKeysFromStorage([s3Object.key]);
          await onRemovePhoto();
        } catch(error) {
          this.props.stores.snackbar.show(I18n.get('ERROR_failedToRemoveImage'), true);
          logger.logError(error)
        }
      }
      this.setState({ loading: false, showRemoveImageAlert: false });
    } else {
      this.props.stores.snackbar.show(I18n.get("ERROR_noConnection"));
    }
  };

  _uploadPhoto = () => {
    if (this.props.stores.appState.isConnected) {
      const { id, onUploadPhoto, s3Object, folder="public" } = this.props;
      const options = {
        title: 'Select image',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
      ImagePicker.showImagePicker(options, async (response) => {
        if (response.error) {
          this.props.stores.snackbar.show(response.error.message);
        } else {
          const { type, uri, fileName, fileSize } = response;
          if (fileSize > (MAX_FILE_SIZE + EPSILON)) {
            this.props.stores.snackbar.show(I18n.get("WARNING_fileTooLarge"), true);
          } else {
            try {
              const key = `${folder}/${id}${fileName}`;
              const fileForUpload = {
                key,
                bucket,
                region,
                type,
                name: fileName
              };
    
              if (uri) {
                const fetchResponse = await fetch(uri);
                const blob = await fetchResponse.blob();
                this.setState({ loading: true });
                if (s3Object) this.props.stores.appState.removeKeysFromStorage([s3Object.key]);
                await Storage.put(key, blob, {
                  contentType: type
                });
                await onUploadPhoto(fileForUpload);
                this.setState({ loading: false });
              }
            } catch (error) {
              this.setState({ loading: false });
              this.props.stores.snackbar.show(I18n.get('ERROR_failedToUploadImage'), true);
              logger.logError(error);
            }
          }
        }
      });
    } else {
      this.props.stores.snackbar.show(I18n.get("ERROR_noConnection"));
    }
  };

  render() {
    const { title, subtitle, uri, me, s3Object, fit } = this.props;

    const url = s3Object ? getImageUrl(s3Object, 1040, fit) : uri;
    
    return (
      <>
      <Screen
        loading={this.state.loading}
        goBack={this._goBack}
        title={title}
        subtitle={subtitle}
        uri={url}
        uploadPhoto={this._uploadPhoto}
        deletePhoto={this._showRemoveImageAlert}
        me={me}
        s3Object={s3Object}
      />
      <Alert
        loading={this.state.loading}
        visible={this.state.showRemoveImageAlert}
        title={I18n.get("ALERT_deleteImage")}
        onConfirm={this._removePhoto}
        handleDismiss={this._hideRemoveImageAlert}
      />
      </>
    );
  }
}

export default inject("stores")(observer(ImageViewerContainer));