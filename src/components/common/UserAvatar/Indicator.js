import React from 'react';
import UserAvatar from 'react-native-user-avatar';
import FastImage from 'react-native-fast-image';

export default ({ size, name }) => {
  return (
    <UserAvatar
      name={name}
      size={size}
      component={FastImage}
    />
  );
};
