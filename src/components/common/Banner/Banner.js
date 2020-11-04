import React from 'react';
import {TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import Icon from '../Icon';
import env from 'config/env';

const styles = StyleSheet.create({
  container: {
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
