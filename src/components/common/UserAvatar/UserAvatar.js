import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import { Title } from 'react-native-paper';
import { getInitials, getAvatarBackgroundColor } from './helpers';

export default ({
  src,
  size=64,
  name="John Doe"
}) => {
  const initials = getInitials(name);
  const bgColor = getAvatarBackgroundColor(name);
  const style = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: src ? 'transparent' : bgColor,
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <View style={style}>
      {
        src ? (
          <Image
            style={style}
            source={{uri: src}}
          />
        ) : (
          <Title style={{ color: 'white'}} adjustsFontSizeToFit>{initials}</Title>
        )
      }
    </View>
  )
};