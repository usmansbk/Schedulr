import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { CachedImage } from 'react-native-cached-image';
import UserAvatar from 'react-native-user-avatar';
import emojiRegex from 'emoji-regex';

export default ({
  name,
  src,
  onPress,
  size,
  style
}) => {
  const emojiMatch = emojiRegex().exec(name);
  let avatarName;
  if (emojiMatch) {
    avatarName = emojiMatch[0];
  } else {
    const [ first, second ] = name.split(' ');
    avatarName = `${first} ${second ? second : ''}`;
  }

  return (
    <TouchableRipple onPress={onPress} style={style}>
      <UserAvatar
        name={avatarName}
        src={src}
        size={size}
        component={CachedImage}
      />
    </TouchableRipple>
  )
};
