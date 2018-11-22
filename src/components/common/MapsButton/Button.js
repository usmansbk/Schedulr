import React from 'react';
import { IconButton } from 'react-native-paper';

export default ({
  location,
  color,
  size
}) => (
  <IconButton
  disabled={!location}
  size={size || 24}
  icon={`location-${location ? 'on' : 'off'}`}
  onPress={() => {
    alert('Open maps to ' + location);
  }}
  color={color}
/>
);
