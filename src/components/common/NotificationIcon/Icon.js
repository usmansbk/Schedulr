import React from 'react';
import { View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';

const NotificationIcon = ({ name, color, size, stores }) => {
  return (
    <View style={styles.container}>
      <Icon
        name={name}
        color={color}
        size={size}
      />
      { stores.appState.hasNotifications && <View style={styles.indicator}/> }
    </View>
  );
};

export default inject("stores")(observer(NotificationIcon));

const color = '#1DA1F2';

const styles = StyleSheet.create({
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 2,
    right: 2,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: color,
  }
})