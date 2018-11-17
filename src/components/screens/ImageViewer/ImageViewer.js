import React, { PureComponent } from 'react';
import { ToastAndroid, StyleSheet } from 'react-native';
import { CachedImage as Image} from 'react-native-cached-image';
import { ReactNativeFile } from 'extract-files'
import ImagePicker from 'react-native-image-picker';
import {
  Header,
  Left,
  Right,
  Title,
  Body,
  Container,
  Spinner
} from 'native-base';
import IconButton from '../../common/IconButton';

const options = {
  title:  'Select Picture',
  storageOption: {
    skipBackup: true,
  },
};

const DEFAULT_IMAGE_PATH = '../../../assets/no_image.jpg';

export default class ImageViewer extends PureComponent {
  pickImage = () => {
    const { handleUpload } = this.props;
    ImagePicker.showImagePicker(options, (response) => {
      const { uri, fileName, type } = response;
      const imgData = {
        uri,
        name: fileName,
        type
      };
      if (response.didCancel || response.error) return;
      handleUpload(new ReactNativeFile(imgData));
    })
  }

  _onLoadStart = () => this.setState({ downloading: true });

  _onLoadEnd = () => this.setState({ downloading: false });

  _onError = () => ToastAndroid.show('Network error', ToastAndroid.SHORT);
  
  render() {
    const {
      handleRemoveImage,
      title,
      isAuthor,
      uri,
      thumbnail,
      loading
    } = this.props;

    let defaultSource = require(DEFAULT_IMAGE_PATH);
    if (thumbnail) {
      defaultSource = {uri: thumbnail.path}
    }
    return (
      <Container>
        <Header>
          <Left>
            <IconButton
              onPress={() => this.props.navigation.goBack()}
              name="arrow-left"
              type="Feather"
            />
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right>
            {
              isAuthor && (
                <React.Fragment>
                  <IconButton
                    onPress={this.pickImage}
                    name="image"
                    type="Feather"
                  />
                  {
                    Boolean(uri) && (
                      <IconButton
                        onPress={() => handleRemoveImage()}
                        name="trash"
                        type="Feather"
                      />
                    )
                  }
                </React.Fragment>
              )
            }
          </Right>
        </Header>
        { loading ?
          <Spinner /> :
          <Image
            resizeMode="contain"
            loadingIndicator={() => <Spinner />}
            fallbackSource={defaultSource}
            defaultSource={defaultSource}
            onLoadStart={this._onLoadStart}
            onLoadEnd={this._onLoadEnd}
            onError={this._onError}
            style={styles.container}
            source={{uri}}
          />
        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 }
})