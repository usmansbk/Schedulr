import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { CachedImage } from 'react-native-cached-image';
import UserAvatar from 'react-native-user-avatar';

export default ({
  name,
  src,
  onPress,
  size,
  style
}) => (
  <TouchableRipple onPress={onPress} style={style}>
    <UserAvatar
      name={name}
      src={src}
      size={size}
      component={CachedImage}
    />
  </TouchableRipple>
);
