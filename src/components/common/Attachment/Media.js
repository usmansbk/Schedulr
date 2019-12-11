import React from 'react';
import { View, Image } from 'react-native';
import { Text, Caption, TouchableRipple, ProgressBar } from 'react-native-paper';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { I18n, Storage } from 'aws-amplify';
import numeral from 'numeral';
import { inject, observer } from 'mobx-react';
import getImageUrl from 'helpers/getImageUrl';
import logger from 'config/logger';

const Doc = inject('stores')(observer(({ stores, onPress, file, downloading, progress }) => {
  const { name, size, type } = file;
  const styles = stores.appStyles.media;
  let source = require('../../../assets/doc.png');

  if (type.includes('audio')) {
    source = require('../../../assets/audio.png');
  } else if (type.includes('video')) {
    source = require('../../../assets/video.png');
  } else if (type.includes('pdf')) {
    source = require('../../../assets/pdf.png');
  } else if (type.includes('text')) {
    source = require('../../../assets/txt.png');
  } else if (type.includes('zip') || (type.includes('compressed') || type.includes('archive'))) {
    source = require('../../../assets/zip.png'); 
  } else {
    source = require('../../../assets/doc.png'); 
  }

  return (
    <TouchableRipple onPress={onPress}>
      <>
      <View style={styles.docContent}>
        <Image
          source={source}
          style={styles.mediaIcon}
        />
        <View style={styles.docBody}>
          <Text style={styles.docName} ellipsizeMode="middle" numberOfLines={1}>{name}</Text>
          <Caption>{numeral(size).format('0b')}</Caption>
        </View>
      </View>
      { Boolean(downloading) && <ProgressBar progress={progress} /> }
      </>
    </TouchableRipple>
  )
}));

class MediaItem extends React.Component {
  state = {
    downloading: false,
    progress: 0
  };

  _onPress = () => {
    const { file } = this.props;
    this.props.navigateToViewEmbed({
      s3Object: file,
      subtitle: file.name,
      uri: getImageUrl(file)
    });
  };

  _downloadFile = async () => {
    const { file: { key, name }, stores } = this.props;
    this.setState({ downloading: true });
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
    const { downloading, progress } = this.state;
    const { file, stores } = this.props;
    const styles = stores.appStyles.media;
    
    let Item = null;
    if (file.type.includes('image')) {
      const uri = getImageUrl(file, 320);
      const source = {
        uri
      };
      Item = (
        <TouchableRipple onPress={this._onPress}>
          <View style={styles.view}>
            <Image source={source} style={styles.image} />
            <Caption style={styles.caption}>{numeral(file.size).format('0b')}</Caption>
          </View>
        </TouchableRipple>
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