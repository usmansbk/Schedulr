import React, { PureComponent } from 'react';
import { StyleSheet, Image } from 'react-native';

const ENCODING = 'data:image/png;base64,'

export default class Logo extends PureComponent {
  render() {
    const {
      src,
    } = this.props;

    const url = ENCODING + src;
    const uri = { uri: src ? url : 'logo' }

    return (
      <Image
        source={uri}
        style={styles.logo}
        resizeMode='contain'
      />
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
})