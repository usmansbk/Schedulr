import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default ({stores, color, size, focused }) => {
  return (
    <View style={styles.container}>
      <Icon
        name={`notifications${focused ? '' : '-none'}`}
        color={color}
        size={size}
      />
      {
        stores.updates.hasNotification && <View style={styles.indicator}/>
      }
    </View>
  );
};

const color = '#1DA1F2';

const styles = StyleSheet.create({
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 5,
    right: 4,
    borderWidth: 1,
    borderColor: color,
    backgroundColor: color,
  }
})