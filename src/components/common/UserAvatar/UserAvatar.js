import React from 'react';
import { View, Image } from 'react-native';
import { Title } from 'react-native-paper';
import { getInitials, getAvatarBackgroundColor } from './helpers';
import { avatarColorsWithOpacity } from 'config/colors';

export default ({
  src,
  size=64,
  name="John Doe"
}) => {
  const source = {uri: src};

  const initials = getInitials(name);
  const bgColor = getAvatarBackgroundColor(name);
  const style = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: src ? 'transparent' : avatarColorsWithOpacity[bgColor],
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <View style={style}>
      {
        src ? (
          <Image
            style={style}
            source={source}
            defaultSource={require('../../../assets/placeholder.png')}
          />
        ) : (
          <Title
            style={{
              color: bgColor,
              fontSize: 24,
              fontFamily: 'sans-serif-light',
            }} adjustsFontSizeToFit>{initials}</Title>
        )
      }
    </View>
  )
};