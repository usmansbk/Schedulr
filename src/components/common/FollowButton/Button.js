import React from 'react';
import { Button } from 'react-native-paper';

export default ({
  style,
  mode,
  isMember,
}) => (
  <Button
    style={style}
    mode={mode}>{isMember ? 'LEAVE' : 'JOIN'}</Button>
);
