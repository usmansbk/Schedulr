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
    loading: false,
    uri: null
  };

  componentDidMount = async () => {
    const { s3, uri } = this.props;
    if(s3) {
      try {
        // const result = await Storage.get(s3.key, { level: 'public', download: true });
        const result = await Storage.get(s3.key);
        console.log(result);
        this.setState({
          uri: result
        });
        console.log(result);
      } catch(error) {
        console.error(error);
      }
    } else {
      this.setState({ uri });
    }
  };

  _goBack = () => this.props.goBack();
  _uploadPhoto = () => {
    const { uploadPhoto, s3 } = this.props;
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
          if (s3) {
            await Storage.remove(s3.key);
          }
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
    const { title, me, loading } = this.props;

    return (
      <Screen
        loading={this.state.loading || loading}
        goBack={this._goBack}
        title={title}
        uri={this.state.uri}
        uploadPhoto={this._uploadPhoto}
        me={me}
      />
    );
  }
}