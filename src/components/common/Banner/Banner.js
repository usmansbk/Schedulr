import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  // View,
} from 'react-native';
import Icon from '../Icon';
// import BannerAd from './Ad';
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

export default function Banner({navigateToBanner, id, pictureUrl, isOwner}) {
  const onPress = React.useCallback(() => navigateToBanner(id));

  // if (!pictureUrl && !isOwner) {
  //   return (
  //     <View style={styles.image}>
  //       <BannerAd large mediumRect />
  //     </View>
  //   );
  // }
  const source = {uri: pictureUrl || `${env.UNSPLASH_DAILY}`};
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        defaultSource={require('assets/placeholder.png')}
        style={styles.image}
        source={source}
        resizeMode="cover">
        {!pictureUrl && <Icon name="camera" size={56} />}
      </ImageBackground>
    </TouchableOpacity>
  );
}
