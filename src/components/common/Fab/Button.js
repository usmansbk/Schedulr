import React from 'react';
import { FAB } from 'react-native-paper';
import colors from '../../../config/colors';

const Fab = ({ onPress, label, icon, small }) => (
  <FAB
    label={label}
    onPress={onPress}
    theme={{
      colors: {
        accent: colors.primary
      }
    }}
    style={{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    }}
    color="#fff"
    icon={icon}
    small={small}
  />
);

export default Fab;