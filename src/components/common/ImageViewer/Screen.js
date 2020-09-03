import React from 'react';
import PhotoView from 'react-native-image-zoom-viewer';
import {Appbar, ProgressBar} from 'react-native-paper';
import {View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {Storage, I18n} from 'aws-amplify';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Icon from 'components/common/Icon';
import Loading from '../Loading';
import logger from 'config/logger';
import downloadPath from 'helpers/fs';
import snackbar from 'helpers/snackbar';
import Suspense from '../Suspense';

class ImageViewer extends React.Component {
  state = {
    progress: 0,
    loadingImage: false,
    downloading: false,
    display: false,
  };

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  _downloadImage = async () => {
    const {
      s3Object: {key, name},
    } = this.props;
    this.setState({downloading: true, progress: 0});
    try {
      const fromUrl = await Storage.get(key);
      const toFile = await downloadPath(name);
      const options = {
        fromUrl,
        toFile,
        progress: ({bytesWritten, contentLength}) => {
          this.setState({
            progress: bytesWritten / contentLength,
          });
        },
      };

      const exists = await RNFS.exists(toFile);
      if (exists) {
        FileViewer.open(toFile);
        this.setState({downloading: false});
      } else {
        snackbar(I18n.get('TOAST_downloading'));
        await RNFS.downloadFile(options).promise.then(() => {
          FileViewer.open(toFile);
          this.setState({downloading: false});
        });
      }
    } catch (error) {
      this.setState({downloading: false});
      snackbar(I18n.get('TOAST_downloadFailed'), true);
      logger.logError(error);
    }
  };

  render() {
    const {display, downloading, progress, loadingImage} = this.state;
    if (!display) return <Suspense />;
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
      loading,
    } = this.props;

    const source = {
      url: uri,
      props: {
        source: uri ? undefined : require('../../../assets/photographer.png'),
      },
    };

    return (
      <>
        <Appbar.Header style={stores.styles.appStyles.header}>
          <Appbar.Action
            color={stores.theme.colors.primary}
            onPress={goBack}
            icon={({color, size}) => (
              <Icon name="arrow-left" color={color} size={size} />
            )}
          />
          <Appbar.Content
            title={title}
            subtitle={subtitle}
            titleStyle={stores.styles.appStyles.headerColor}
          />
          {Boolean(s3Object) && (
            <Appbar.Action
              onPress={this._downloadImage}
              disabled={downloading || loadingImage || uploadProgress}
              color={stores.theme.colors.primary}
              icon={({color, size}) => (
                <Icon name="download" size={size} color={color} />
              )}
            />
          )}
          {me && (
            <>
              {Boolean(s3Object) && (
                <Appbar.Action
                  onPress={deletePhoto}
                  color={stores.theme.colors.primary}
                  icon={({color, size}) => (
                    <Icon name="trash" size={size} color={color} />
                  )}
                />
              )}
              <Appbar.Action
                onPress={uploadPhoto}
                color={stores.theme.colors.primary}
                icon={({color, size}) => (
                  <Icon name="camera" size={size} color={color} />
                )}
              />
            </>
          )}
        </Appbar.Header>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: stores.theme.colors.bg,
          }}>
          {Boolean(uploadProgress) && <ProgressBar progress={uploadProgress} />}
          {downloading && <ProgressBar progress={progress} />}
          {loadingImage && <ProgressBar indeterminate />}
          {loading ? (
            <Loading loading />
          ) : (
            <PhotoView
              imageUrls={[source]}
              enableImageZoom={Boolean(uri)}
              useNativeDriver
              renderIndicator={() => null}
              saveToLocalByLongPress={false}
              backgroundColor={stores.theme.colors.bg}
            />
          )}
        </View>
      </>
    );
  }
}

export default inject('stores')(observer(ImageViewer));
