import React from 'react';
import { FAB } from 'react-native-paper';

const Fab = ({ onPress, style, icon }) => (
  <FAB
    onPress={onPress}
    style={style}
    color="#fff"
    icon={icon}
  />
);

export default Fab;