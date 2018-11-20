import React from 'react';
import { FAB } from 'react-native-paper';

const Fab = ({ onPress, style, icon, small }) => (
  <FAB
    onPress={onPress}
    style={style}
    color="#fff"
    icon={icon}
    small={small}
  />
);

export default Fab;