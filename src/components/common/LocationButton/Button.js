import React from 'react';
import { IconButton } from 'react-native-paper';

export default ({
  size,
  color,
  address,
  longitude,
  latitude
}) => (
  <IconButton
    disabled={!address}
    icon="map"
    color={color}
    size={size}
    onPress={() => alert(address)}
  />
);
