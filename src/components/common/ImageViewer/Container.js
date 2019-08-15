import React from 'react';
import ImagePicker from 'react-native-image-picker';
import SimpleToast from 'react-native-simple-toast';
import { Alert } from 'react-native';
import uuid from'uuid/v4';
import { Storage, I18n } from 'aws-amplify';
import config from 'aws_config';
import getImageUrl from 'helpers/getImageUrl';
import Screen from './Screen';

const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region
} = config;

const MAX_FILE_SIZE = 1024 * 2000;
const EPSILON = 1024 * 100;

export default class ImageViewerContainer extends React.Component {
  state = {
    loading: false
  };

  componentDidMount = () => {
    const { s3Object, uri } = this.props;
    if (!(s3Object || uri)) SimpleToast.show(I18n.get("TOAST_noImageFound"), SimpleToast.SHORT);
  };

  _goBack = () => this.props.goBack();

  _removePhoto = async () => {
    const { onRemovePhoto, s3Object } = this.props;
    Alert.alert(
      I18n.get("ALERT_deleteImage"),
      '',
      [
        {text: I18n.get("BUTTON_dismiss"), onPress: () => null },
        {
          text: I18n.get("BUTTON_continue"),
          onPress: async () => {
            this.setState({ loading: true });
            if (s3Object) {
              try {
                await Storage.remove(s3Object.key);
              } catch(error) {
                SimpleToast.show(error.message, SimpleToast.SHORT);
              }
            }
            try {
              await onRemovePhoto();
              this.setState({ loading: false });
            } catch (error) {
              console.error(error);
            }
          }
        }
      ]
    )
  };

  _uploadPhoto = () => {
    const { onUploadPhoto, s3Object, folder="public" } = this.props;
    ImagePicker.showImagePicker(null, async (response) => {
      if (response.error) {
        SimpleToast.show(response.error.message, SimpleToast.SHORT);
        console.error(response.error);
      } else {
        const { type, uri, fileName, fileSize } = response;
        if (fileSize > (MAX_FILE_SIZE + EPSILON)) {
          SimpleToast.show(I18n.get("WARNING_fileTooLarge"), SimpleToast.SHORT);
          console.log(response);
        } else {
          try {
            const key = `${folder}/${uuid()}${fileName}`;
            const fileForUpload = {
              key,
              bucket,
              region
            };
  
            if (uri) {
              const fetchResponse = await fetch(uri);
              const blob = await fetchResponse.blob();
              this.setState({ loading: true });
              if (s3Object) await Storage.remove(s3Object.key);
              await Storage.put(key, blob, {
                contentType: type
              });
              await onUploadPhoto(fileForUpload);
              this.setState({ loading: false });
            }
          } catch (error) {
            console.error(error);
            SimpleToast.show(error.message, SimpleToast.SHORT);
          }
        }
      }
    })
  };

  render() {
    const { title, uri, me, s3Object } = this.props;

    const url = s3Object ? getImageUrl(s3Object.key, 320) : uri;

    return (
      <Screen
        loading={this.state.loading}
        goBack={this._goBack}
        title={title}
        uri={url}
        uploadPhoto={this._uploadPhoto}
        deletePhoto={this._removePhoto}
        me={me}
        s3Object={s3Object}
      />
    );
  }
}