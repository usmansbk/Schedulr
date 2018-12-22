import React from 'react';
import { Button } from 'react-native-paper';

export default ({
  style,
  isFollowing,
}) => (
  <Button
    style={style}
    mode="outlined"
  >{isFollowing ? 'Unfollow' : 'Follow'}</Button>
);
