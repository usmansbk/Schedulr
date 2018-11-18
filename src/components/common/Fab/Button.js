import React from 'react';
import { withTheme, FAB } from 'react-native-paper';

const Fab = ({ onPress, style, icon, theme }) => (
  <FAB
    onPress={onPress}
    style={style}
    icon={icon}
    theme={{
      colors: {
        accent: theme.colors.primary,
        text: '#fff'
      }
    }}
  />
);

export default withTheme(Fab);