import React from 'react';
import { withTheme, FAB } from 'react-native-paper';

const Fab = ({ onPress, style, icon, theme }) => (
  <FAB
    onPress={onPress}
    style={style}
    icon={icon}
    color={theme.colors.primary}
    theme={{
      colors: {
        text: '#fff'
      }
    }}
  />
);

export default withTheme(Fab);