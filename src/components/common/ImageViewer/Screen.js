import React from 'react';
import PhotoView from 'react-native-photo-view';
import { Appbar, ProgressBar } from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Storage, I18n } from 'aws-amplify';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Icon from 'react-native-vector-icons/Feather';
import Loading from '../Loading';
import logger from 'config/logger';
import downloadPath from 'helpers/fs';
import snackbar from 'helpers/snackbar';

class ImageViewer extends React.Component {

  state = {
    progress: 0,
    loadingImage: false,
    downloading: false
  };

  _toggleLoadingImage = () => this.setState(prev => ({ loadingImage: !prev.loadingImage }));
  _onError = (error) => logger.log(error.message);

  _downloadImage = async () => {
    const { stores, s3Object: { key, name } } = this.props;
    this.setState({ downloading: true, progress: 0 });
    try {
      const fromUrl = await Storage.get(key);
      const toFile = await downloadPath(name);
      const options = {
        fromUrl,
        toFile,
        progress: ({ bytesWritten, contentLength })=> {
          this.setState({
            progress: bytesWritten / contentLength
          });
        }
      };

      const exists = await RNFS.exists(toFile);
      if (exists) {
        FileViewer.open(toFile);
        this.setState({ downloading: false });
      } else {
        snackbar(I18n.get('TOAST_downloading'));
        await RNFS.downloadFile(options).promise
          .then(() => {
            FileViewer.open(toFile);
            this.setState({ downloading: false });
          });
      }
    } catch (error) {
      this.setState({ downloading: false });
      snackbar(I18n.get('TOAST_downloadFailed'), true);
      logger.logError(error);
    }
  };

  render() {
    const {
      s3Object,
      goBack,
      title,
      subtitle,
      uploadPhoto,
      deletePhoto,
      uploadProgress,
      uri,
      stores,
      me,
      loading
    } = this.props;
    const { downloading, progress, loadingImage } = this.state;

    return (
    <>
    <Appbar.Header style={stores.appStyles.styles.header}>
      <Appbar.Action
        color={stores.themeStore.colors.primary}
        icon={({color, size}) => <Icon
          name="arrow-left"
          onPress={goBack}
          color={color}
          size={size}
        />}
      />
      <Appbar.Content
        title={title}
        subtitle={subtitle}
        titleStyle={stores.appStyles.styles.headerColor}
      />
      {
        Boolean(s3Object) && (
          <Appbar.Action
            onPress={this._downloadImage}
            disabled={downloading || loadingImage ||uploadProgress}
            color={stores.themeStore.colors.primary}
            icon={({ color,size }) => <Icon
              name="download"
              size={size}
              color={color}
            />}
          />
        )
      }
      {
        me && (
          <>
          {
            Boolean(s3Object) && (
              <Appbar.Action
                onPress={deletePhoto}
                color={stores.themeStore.colors.primary}
                icon={({ color, size }) => <Icon
                  name="trash-2"
                  size={size}
                  color={color}
                />}
              />
            )
          }
          <Appbar.Action
            onPress={uploadPhoto}
            color={stores.themeStore.colors.primary}
            icon={({ color, size }) => <Icon
              name="camera"
              size={size}
              color={color}
            />}
          />
          </>
        )
      }
    </Appbar.Header>
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: stores.themeStore.colors.bg }}>
      { Boolean(uploadProgress) && <ProgressBar progress={uploadProgress} />}
      { downloading && <ProgressBar progress={progress} />}
      { loadingImage && <ProgressBar indeterminate /> }
      {
        loading ? <Loading loading /> : (
          <PhotoView
            source={uri ? {uri} : require('../../../assets/photographer.png')}
            androidScaleType="fitCenter"
            style={ uri ? {flex: 1} : { alignSelf: 'center', width: 400, height: 400 }}
            onLoadStart={this._toggleLoadingImage}
            onLoadEnd={this._toggleLoadingImage}
            onError={this._onError}
          />
        )
      }
    </View>
    </>
  )

  }
}

export default inject("stores")(observer(ImageViewer));