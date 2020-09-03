import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text, Caption, ProgressBar} from 'react-native-paper';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {I18n, Storage} from 'aws-amplify';
import numeral from 'numeral';
import {inject, observer} from 'mobx-react';
import getImageUrl from 'helpers/getImageUrl';
import getFilePath from 'helpers/fs';
import logger from 'config/logger';
import MediaIcon from '../MediaIcon';
import snackbar from 'helpers/snackbar';

const Doc = inject('stores')(
  observer(({stores, onPress, file, downloading, progress}) => {
    const {name, size, type} = file;
    const styles = stores.styles.media;
    return (
      <TouchableOpacity onPress={onPress} disabled={downloading}>
        <>
          <View style={styles.docContent}>
            <MediaIcon type={type} style={styles.mediaIcon} />
            <View style={styles.docBody}>
              <Text
                style={styles.docName}
                ellipsizeMode="middle"
                numberOfLines={1}>
                {name}
              </Text>
              <Caption>{numeral(size).format('0b')}</Caption>
            </View>
          </View>
          {Boolean(downloading) && <ProgressBar progress={progress} />}
        </>
      </TouchableOpacity>
    );
  }),
);

class MediaItem extends React.Component {
  state = {
    downloading: false,
    progress: 0,
  };

  _onPress = () => {
    const {file} = this.props;
    this.props.navigateToViewEmbed({
      s3Object: file,
      subtitle: file.name,
      uri: getImageUrl(file),
    });
  };

  _downloadFile = async () => {
    const {
      file: {key, name},
      stores,
    } = this.props;
    this.setState({downloading: true, progress: 0});
    try {
      const fromUrl = await Storage.get(key);
      const toFile = await getFilePath(name);
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
        FileViewer.open(toFile).catch(logger.log);
        this.setState({downloading: false});
      } else {
        await RNFS.downloadFile(options).promise.then(() => {
          FileViewer.open(toFile).catch(logger.log);
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
    const {downloading, progress} = this.state;
    const {file, stores} = this.props;
    const styles = stores.styles.media;

    let Item = null;
    if (file.type.includes('image')) {
      const uri = getImageUrl(file, 320);
      const source = {
        uri,
      };
      Item = (
        <View style={styles.view}>
          <TouchableOpacity onPress={this._onPress}>
            <View>
              <Image source={source} style={styles.image} />
              <Caption style={styles.caption} numberOfLines={1}>
                {numeral(file.size).format('0b')}
              </Caption>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      Item = (
        <Doc
          downloading={downloading}
          progress={progress}
          file={file}
          onPress={this._downloadFile}
        />
      );
    }

    return Item;
  }
}

export default inject('stores')(observer(MediaItem));
