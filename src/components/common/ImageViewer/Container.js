import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {inject, observer} from 'mobx-react';
import {Storage, I18n} from 'aws-amplify';
import config from 'aws_config';
import getImageUrl from 'helpers/getImageUrl';
import Confirm from 'components/common/Confirm';
import Screen from './Screen';
import logger from 'config/logger';
import snackbar from 'helpers/snackbar';
import {getFileName} from 'lib/utils';
import {file} from 'lib/constants';

const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region,
} = config;

const {MAX_FILE_SIZE, EPSILON} = file;

class ImageViewerContainer extends React.Component {
  state = {
    loading: false,
    progress: 0,
  };

  _goBack = () => this.props.goBack();
  _confirmRef = (ref) => (this.deleteConfirmRef = ref);
  _confirmDelete = () => this.deleteConfirmRef.open();

  _removePhoto = async () => {
    if (this.props.stores.appState.isConnected) {
      const {onRemovePhoto, s3Object} = this.props;
      this.setState({loading: true});
      if (s3Object) {
        try {
          this.props.stores.appState.removeKeysFromStorage([s3Object.key]);
          await onRemovePhoto();
        } catch (error) {
          snackbar(I18n.get('ERROR_failedToRemoveImage'), true);
          logger.logError(error);
        }
      }
      this.setState({loading: false});
    } else {
      snackbar(I18n.get('ERROR_noConnection'));
    }
  };

  _uploadPhoto = () => {
    if (this.props.stores.appState.isConnected) {
      const {onUploadPhoto, s3Object, folder = 'public'} = this.props;
      const options = {
        title: 'Select image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, async (response) => {
        if (response.didCancel) {
          // Do nothing
        } else if (response.error) {
          snackbar(response.error.message);
        } else {
          const {type, uri, fileSize} = response;
          if (fileSize > MAX_FILE_SIZE + EPSILON) {
            snackbar(I18n.get('WARNING_fileTooLarge'), true);
          } else {
            try {
              const name = getFileName(type, true);
              const key = `${folder}/${name}`;
              const fileForUpload = {
                key,
                bucket,
                region,
                type,
                name,
              };

              if (uri) {
                const fetchResponse = await fetch(uri);
                const blob = await fetchResponse.blob();
                this.setState({loading: true});
                if (s3Object)
                  this.props.stores.appState.removeKeysFromStorage([
                    s3Object.key,
                  ]);
                await Storage.put(key, blob, {
                  contentType: type,
                  progressCallback: (progress) => {
                    this.setState({
                      progress: progress.loaded / progress.total,
                    });
                  },
                });
                await onUploadPhoto(fileForUpload);
                this.setState({loading: false, progress: 0});
              }
            } catch (error) {
              this.setState({loading: false});
              snackbar(I18n.get('ERROR_failedToUploadImage'), true);
              logger.logError(error);
            }
          }
        }
      });
    } else {
      snackbar(I18n.get('ERROR_noConnection'));
    }
  };

  render() {
    const {title, subtitle, uri, me, s3Object, fit} = this.props;

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
          deletePhoto={this._confirmDelete}
          uploadProgress={this.state.progress}
          me={me}
          s3Object={s3Object}
        />
        <Confirm
          title={I18n.get('ALERT_deleteImage')}
          onConfirm={this._removePhoto}
          ref={this._confirmRef}
        />
      </>
    );
  }
}

export default inject('stores')(observer(ImageViewerContainer));
