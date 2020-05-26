import React from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'components/common/Icon';
import { createOpenLink } from 'react-native-open-maps';

export default ({
  size,
  color,
  address,
}) => (
  <IconButton
    disabled={!address}
    icon={() => <Icon
      name="map"
      size={size}
      color={color}
    />}
    size={size}
    onPress={createOpenLink({
      query: address,
    })}
  />
);
