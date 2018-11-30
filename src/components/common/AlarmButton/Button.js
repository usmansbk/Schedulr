import React from 'react';
import { IconButton } from 'react-native-paper';

export default ({
  size,
  color,
  alarmSet
}) => (
  <IconButton
    icon={`alarm-${alarmSet ? 'on' : '-add'}`}
    color={color}
    size={size}
    onPress={() => console.log('Log')}
  />
);
