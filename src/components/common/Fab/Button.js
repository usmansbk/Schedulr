import React from 'react';
import { FAB } from 'react-native-paper';
import colors from '../../../config/colors';

const Fab = ({ onPress, style, icon, small }) => (
  <FAB
    onPress={onPress}
    theme={{
      colors: {
        accent: colors.primary
      }
    }}
    style={style}
    color="#fff"
    icon={icon}
    small={small}
  />
);

export default Fab;