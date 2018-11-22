import React from 'react';
import { IconButton } from 'react-native-paper';

export default ({
  location,
  color,
}) => (
  <IconButton
  disabled={!location}
  icon={`location-${location ? 'on' : 'off'}`}
  onPress={() => {
    alert('Open maps to ' + location);
  }}
  color={color}
/>
);
