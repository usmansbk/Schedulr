import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';
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

  if (!pictureUrl && !isOwner) {
    return (
      <View style={styles.image}>
        <BannerAd large mediumRect />
      </View>
    );
  }
  const source = pictureUrl ? {uri: pictureUrl} : require('assets/upload.jpg');
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        defaultSource={require('assets/placeholder.png')}
        style={styles.image}
        source={source}
        resizeMode="cover"></ImageBackground>
    </TouchableOpacity>
  );
}
