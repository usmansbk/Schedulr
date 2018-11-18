import React from 'react';
import { withTheme, FAB } from 'react-native-paper';

const Fab = ({ onPress, style, icon, theme }) => (
  <FAB
    onPress={onPress}
    style={style}
    icon={icon}
    color='#fff'
    theme={{
      colors: {
        accent: theme.colors.primary
      }
    }}
  />
);

export default withTheme(Fab);