import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import colors from 'config/colors';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'sans-serif-bold',
    fontWeight: 'bold'
  },
  Cancelled: {
    color: colors.light_red,
  },
  Ongoing: {
    color: colors.green
  },
  Ended: {
    color: colors.soft_blue,
  },
  Upcoming: {
    color: colors.yellow,
  },
  Closed: {
    color: colors.light_red,
    fontWeight: 'normal',
    fontSize: 12
  }
});

export default ({ status }) => {
  let statusStyle = styles[status];
  return (
    <Text style={[styles.text, statusStyle]}>{status}</Text>
  );
};