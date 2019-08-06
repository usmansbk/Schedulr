import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import colors from 'config/colors';

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

const LENGTH = 120;
const LOGO_LENGTH = 100;

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: LOGO_LENGTH,
    height: LOGO_LENGTH,
  },
  iconContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    width: LENGTH,
    height: LENGTH,
    borderRadius: LENGTH / 2,
    backgroundColor: colors.primary,
    elevation: 8,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: 0
    },
    marginBottom: 16
  }
});