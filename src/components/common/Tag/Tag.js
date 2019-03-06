import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../../config/colors';

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
  Done: {
    color: colors.soft_blue,
  },
  Upcoming: {
    color: colors.yellow,
  },
});

export default ({ status }) => {
  let statusStyle = styles[status];
  return (
    <Text style={[styles.text, statusStyle]}>{status}</Text>
  );
};