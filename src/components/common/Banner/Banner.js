import React from 'react';
import {TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';
import env from 'config/env';

const styles = StyleSheet.create({
  container: {
    // width: 320,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const adUnitId = __DEV__ ? TestIds.BANNER : env.BANNER_ID;

export default function Banner({navigateToBanner, id, pictureUrl, isOwner}) {
  const onPress = React.useCallback(() => navigateToBanner(id));
  const source = pictureUrl ? {uri: pictureUrl} : require('assets/work.png');
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        defaultSource={require('assets/work.png')}
        style={styles.image}
        source={source}
        resizeMode="cover">
        {!pictureUrl && !isOwner && (
          <BannerAd
            size={BannerAdSize.MEDIUM_RECTANGLE}
            unitId={adUnitId}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}
