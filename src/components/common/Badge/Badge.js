import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Badge from './Badge';
import colors from 'config/colors';

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: 8,
    borderRadius: 4,
    position: 'absolute',
    bottom: 30,
    right: 8,
  },
  Cancelled: {
    backgroundColor: colors.light_red,
  },
  Ongoing: {
    backgroundColor: colors.green
  },
  Ended: {
    backgroundColor: colors.soft_blue,
  },
  Upcoming: {
    backgroundColor: colors.yellow,
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