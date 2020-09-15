import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import env from 'config/env';

const adUnitId = __DEV__ ? TestIds.BANNER : env.BANNER;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function AdBanner({large, mediumRect}) {
  const height = large ? (mediumRect ? 250 : 100) : 50;
  const width = 320;
  const size = large
    ? mediumRect
      ? BannerAdSize.MEDIUM_RECTANGLE
      : BannerAdSize.LARGE_BANNER
    : BannerAdSize.BANNER;
  return (
    <ImageBackground
      source={require('assets/nature-rays.jpg')}
      style={[
        styles.container,
        {
          height,
          width: '100%',
        },
      ]}>
      <BannerAd unitId={adUnitId} size={size} />
    </ImageBackground>
  );
}