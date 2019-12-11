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

class ImageViewer extends React.Component {
  state = {
    progress: 0
  };

  _downloadImage = async () => {
    const { stores, s3Object: { key, name } } = this.props;
    try {
      const fromUrl = await Storage.get(key);
      const toFile = `${RNFS.DocumentDirectoryPath}/${name}`
      const options = {
        fromUrl,
        toFile,
        progress: ({ bytesWritten, contentLength })=> {
          this.setState({
            progress: bytesWritten / contentLength
          });
        }
      };

      this.setState({ downloading: true });
      stores.snackbar.show(I18n.get('TOAST_downloading'));
      await RNFS.downloadFile(options).promise
        .then(() => {
          FileViewer.open(toFile);
          this.setState({ downloading: false });
        });
    } catch (error) {
      this.setState({ downloading: false });
      stores.snackbar.show(I18n.get('TOAST_downloadFailed'), true);
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
      uri,
      stores,
      me,
      loading
    } = this.props;
    const { downloading, progress } = this.state;

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
      <Appbar.Action
        onPress={this._downloadImage}
        color={stores.themeStore.colors.primary}
        icon={({ color,size }) => <Icon
          name="download"
          size={size}
          color={color}
        />}
      />
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
      { downloading && <ProgressBar progress={progress} />}
      {
        loading ? <Loading loading /> : (
          <PhotoView
            source={uri ? {uri} : require('../../../assets/photographer.png')}
            loadingIndicatorSource={require('./img/loading.png')}
            androidScaleType="fitCenter"
            style={ uri ? {flex: 1} : { alignSelf: 'center', width: 400, height: 400 }}
          />
        )
      }
    </View>
    </>
  )

  }
}

export default inject("stores")(observer(ImageViewer));