import React from 'react';
import { Button } from 'react-native-paper';

export default ({
  style,
  isMember,
}) => (
  <Button
    style={style}
    mode="outlined"
  >{isMember ? 'Unfollow' : 'Follow'}</Button>
);
