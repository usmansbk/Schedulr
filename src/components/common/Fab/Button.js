import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  secondary: {
    position: 'absolute',
    margin: 16,
    right: 6,
    bottom: 80,
  }
})

const Fab = inject('stores')(observer(
  ({ onPress, label, icon, small, stores, secondary }) => (
    <FAB
      label={label}
      onPress={onPress}
      theme={{
        colors: {
          accent: secondary ? stores.themeStore.colors.primary_light : stores.themeStore.colors.primary
        }
      }}
      style={secondary ? styles.secondary : styles.fab}
      color="#fff"
      icon={icon}
      small={small || secondary}
    />
  )
));

export default Fab;