import React from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import env from 'config/env';

const adUnitId = __DEV__ ? TestIds.BANNER : env.BANNER;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function AdBanner({large, mediumRect}) {
  const height = large ? (mediumRect ? 250 : 100) : 50;
  const width = mediumRect ? 300 : 320;
  const size = large
    ? mediumRect
      ? BannerAdSize.MEDIUM_RECTANGLE
      : BannerAdSize.LARGE_BANNER
    : BannerAdSize.BANNER;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('assets/nature-rays.jpg')}
        style={[
          styles.image,
          {
            height,
            width,
          },
        ]}>
        <BannerAd unitId={adUnitId} size={size} />
      </ImageBackground>
    </View>
  );
}
