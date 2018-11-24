import React from 'react';
import { Button } from 'react-native-paper';

export default ({
  style,
  mode,
  following,
}) => (
  <Button
    style={style}
    mode={mode}>{`FOLLOW${following ? 'ING' : ''}`}</Button>
);
