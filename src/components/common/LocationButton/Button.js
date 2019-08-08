import React from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { createOpenLink } from 'react-native-open-maps';

export default ({
  size,
  color,
  address,
}) => (
  <IconButton
    disabled={!address}
    icon={() => <Icon
      name="map-pin"
      size={size}
      color={color}
    />}
    size={size}
    onPress={createOpenLink({
      query: address,
    })}
  />
);
