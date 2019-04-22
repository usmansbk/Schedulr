import React from 'react';
import {
  View,
  StyleSheet,
  PixelRatio
} from 'react-native';
import colors from 'config/colors';

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 17,
    right: 8,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'white'
  },
  Cancelled: {
    backgroundColor: colors.error,
  },
  Ongoing: {
    backgroundColor: colors.success
  },
  Ended: {
    backgroundColor: colors.soft_blue,
  },
  Upcoming: {
    backgroundColor: colors.warning,
  },
});

export default ({ status }) => {
  let statusStyle = styles[status];
  return (
    <View
      style={[styles.container, statusStyle]}
    />
  )
}