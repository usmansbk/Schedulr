import React from 'react';
import ImagePicker from 'react-native-image-picker';
import SimpleToast from 'react-native-simple-toast';
import uuid from'uuid/v4';
import { Storage } from 'aws-amplify';
import config from 'aws_config';
import Screen from './Screen';

const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region
} = config;

export default class ImageViewerContainer extends React.Component {
  state = {
    loading: false
  };

  _goBack = () => this.props.goBack();
  _uploadPhoto = () => {
    const { uploadPhoto } = this.props;
    ImagePicker.showImagePicker(null, async (response) => {
      if (response.error) {
        SimpleToast.show(response.error.message, SimpleToast.SHORT);
        console.error(response.error);
      } else {
        const { type, uri, fileName } = response;

        try {
          const key = `${uuid()}${fileName}`;
          const fileForUpload = {
            key,
            bucket,
            region
          };

          const fetchResponse = await fetch(uri);
          const blob = await fetchResponse.blob();
          this.setState({ loading: true });
          await Storage.put(key, blob, {
            contentType: type
          });
          await uploadPhoto(fileForUpload);
          this.setState({ loading: false });
        } catch (error) {
          console.error(error);
          SimpleToast.show(error.message, SimpleToast.SHORT);
        }
      }
    })
  };

  render() {
    const { title, uri, me, loading } = this.props;

    return (
      <Screen
        loading={this.state.loading || loading}
        goBack={this._goBack}
        title={title}
        uri={uri}
        uploadPhoto={this._uploadPhoto}
        me={me}
      />
    );
  }
}