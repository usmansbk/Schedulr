import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import env from 'config/env';

const adUnitId = __DEV__ ? TestIds.BANNER : env.BANNER;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function AdBanner() {
  return (
    <View style={styles.container}>
      <BannerAd unitId={adUnitId} size={BannerAdSize.BANNER} />
    </View>
  );
}
