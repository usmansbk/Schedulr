import React from 'react';
import { IconButton } from 'react-native-paper';

export default ({ location, size, color }) => (
  <IconButton
    icon={`location-${location ? 'on' : 'off'}`}
    onPress={() => alert(location)}
    size={size}
    color={color}
  />
);
