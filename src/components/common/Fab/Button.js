import React from 'react';
import { FAB } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

const Fab = inject('stores')(observer(
  ({ onPress, label, icon, small, stores }) => (
    <FAB
      label={label}
      onPress={onPress}
      theme={{
        colors: {
          accent: stores.themeStore.colors.primary
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
  )
));

export default Fab;