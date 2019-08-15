import React from 'react';
import ImagePicker from 'react-native-image-picker';
import SimpleToast from 'react-native-simple-toast';
import uuid from'uuid/v4';
import gql from 'graphql-tag';
import { Storage } from 'aws-amplify';
import config from 'aws_config';
import client from 'config/client';
import { getUser } from 'api/queries';
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
    const { uploadPhoto, me, id } = this.props;
    let s3;
    if (me) {
      const { getUser: { avatar } } = client.readQuery({
        query: gql(getUser),
        variables: {
          id
        }
      });
      console.log(avatar);
      s3 = avatar;
    }
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

          if (uri) {
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
          }
        } catch (error) {
          console.error(error);
          SimpleToast.show(error.message, SimpleToast.SHORT);
        }
      }
    })
  };

  render() {
    const { title, uri, me } = this.props;

    return (
      <Screen
        loading={this.state.loading}
        goBack={this._goBack}
        title={title}
        uri={uri}
        uploadPhoto={this._uploadPhoto}
        me={me}
      />
    );
  }
}