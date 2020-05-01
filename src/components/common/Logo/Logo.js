import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'react-native-fast-image';

const src = require('./img/logo.png');

export default () => (
  <View elevation={8} style={styles.iconContainer}>
    <Image
      source={src}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
);

const LOGO_LENGTH = 128;

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: LOGO_LENGTH,
    height: LOGO_LENGTH,
  },
  iconContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 16
  }
});