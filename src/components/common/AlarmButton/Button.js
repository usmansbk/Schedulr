import React from 'react';
import { IconButton } from 'react-native-paper';

export default ({
  size,
  color,
  alarmSet,
  title,
  start
}) => (
  <IconButton
    icon={`alarm-${alarmSet ? 'on' : 'add'}`}
    color={color}
    size={size}
    onPress={() => alert(`alarm set for "${title} at ${start}`)}
  />
);
