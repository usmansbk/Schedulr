import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Title } from 'react-native-paper';
import { getInitials, getAvatarBackgroundColor } from './helpers';

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
            source={source}
            defaultSource={require('../../../assets/placeholder.png')}
          />
        ) : (
          <Title style={{ color: 'white'}} adjustsFontSizeToFit>{initials}</Title>
        )
      }
    </View>
  )
};