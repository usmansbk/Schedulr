import React from 'react';
import {
  View,
  StyleSheet
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
    borderWidth: 1,
    borderColor: 'white'
  },
  Cancelled: {
    backgroundColor: colors.error,
  },
  Ongoing: {
    backgroundColor: colors.success
  },
  Done: {
    backgroundColor: colors.soft_blue,
  },
  Upcoming: {
    backgroundColor: colors.warning,
  },
  muted: {
    backgroundColor: colors.tint
  }
});

export default ({ status, isMuted }) => {
  let statusStyle = isMuted ? styles.muted : styles[status];
  return (
    <View
      style={[styles.container, statusStyle]}
    />
  )
}