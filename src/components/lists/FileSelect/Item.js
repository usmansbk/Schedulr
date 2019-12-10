import React from 'react';
import { View, Image } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {
  _onPress = () => this.props.onPress(this.props.uri);
  
  render() {
    const { stores, type, uri, disabled } = this.props;
    const styles = stores.appStyles.fileSelect;
    let source;
    if (type.includes('image')) {
      source = {
        uri
      };
    } else if (type.includes('audio')) {
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
      <TouchableRipple disabled={disabled} style={styles.itemContainer} onPress={this._onPress}>
        <View style={styles.itemContent}>
          <Image style={{width: 60, height: 60}} source={source} resizeMode="contain" />
        </View>
      </TouchableRipple>
    );
  }
}

export default inject('stores')(observer(Item));