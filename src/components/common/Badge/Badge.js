import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import colors from 'config/colors';
import {dp} from 'lib/constants';

const styles = StyleSheet.create({
  container: {
    height: dp(10),
    width: dp(10),
    borderRadius: dp(5),
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
    backgroundColor: colors.tint
  },
  Concluded: {
    backgroundColor: colors.tint
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