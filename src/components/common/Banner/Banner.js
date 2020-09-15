import React from 'react';
import {TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import BannerAd from './Ad';

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

export default function Banner({navigateToBanner, id, pictureUrl, isOwner}) {
  const onPress = React.useCallback(() => navigateToBanner(id));
  const source = pictureUrl ? {uri: pictureUrl} : require('assets/work.png');
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        defaultSource={require('assets/placeholder.png')}
        style={styles.image}
        source={source}
        resizeMode="cover">
        {!pictureUrl && !isOwner && <BannerAd large mediumRect />}
      </ImageBackground>
    </TouchableOpacity>
  );
}
