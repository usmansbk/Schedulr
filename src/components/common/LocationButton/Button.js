import React from 'react';
import { IconButton } from 'react-native-paper';
import { createOpenLink } from 'react-native-open-maps';

export default ({
  size,
  color,
  address,
}) => (
  <IconButton
    disabled={!address}
    icon={address ? 'location-on' : 'location-off'}
    color={color}
    size={size}
    onPress={createOpenLink({
      query: address,
    })}
  />
);
