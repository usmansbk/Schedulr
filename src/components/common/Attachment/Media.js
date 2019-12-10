import React from 'react';
import { View, Image } from 'react-native';
import { Text, Caption, IconButton, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import numeral from 'numeral';
import { inject, observer } from 'mobx-react';
import getImageUrl from 'helpers/getImageUrl';

const Doc = inject('stores')(observer(({ stores, onPress, file }) => {
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
    <View style={styles.docContent}>
      <Image
        source={source}
        style={styles.mediaIcon}
      />
      <View style={styles.docBody}>
        <Text style={styles.docName} ellipsizeMode="middle" numberOfLines={1}>{name}</Text>
        <Caption>{numeral(size).format('0b')}</Caption>
      </View>
      <IconButton
        onPress={onPress}
        color={stores.themeStore.colors.primary}
        size={20}
        icon={({ size, color }) => <Icon
          name="download"
          size={size}
          color={color}
        />}
      />
    </View>
  )
}));

class MediaItem extends React.Component {
  _onPress = () => {
    const { file } = this.props;
    this.props.navigateToViewEmbed({
      s3Object: file,
      subtitle: file.name,
      uri: getImageUrl(file)
    });
  };

  render() {
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
          </View>
        </TouchableRipple>
      );
    } else {
      Item = <Doc file={file} onPress={this._onPress} />;
    }

    return Item;
  }
}

export default inject('stores')(observer(MediaItem));