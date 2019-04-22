import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const src = require('./img/logo.png');

export default () => (
  <Image
    source={src}
    style={styles.logo}
    resizeMode="contain"
  />
);

const LENGTH = 200;

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: LENGTH,
    height: LENGTH
  }
});