import React from 'react';
import UserAvatar from 'react-native-user-avatar';

export default ({ size, name }) => {
  return (
    <UserAvatar
      name={name}
      size={size}
    />
  );
};
