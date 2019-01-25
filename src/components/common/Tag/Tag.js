import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  red: {
    fontFamily: 'sans-serif-bold',
    color: colors.light_red,
    fontWeight: 'bold'
  },
  started: {
    fontFamily: 'sans-serif-bold',
    color: colors.green,
    fontWeight: 'bold'
  },
  ended: {
    fontFamily: 'sans-serif-bold',
    color: colors.soft_blue,
    fontWeight: 'bold'
  },
  pending: {
    fontFamily: 'sans-serif-bold',
    color: colors.yellow,
    fontWeight: 'bold'
  },
});

export default ({ status }) => {
  let statusStyle = styles.status;
  if (status === 'Ongoing') {
    statusStyle = styles.started;
  } else if (status === 'Pending') {
    statusStyle = styles.pending;
  } else if (status === 'Done') {
    statusStyle = styles.ended;
  } else if (status === 'Cancelled') {
    statusStyle = styles.red;
  }
  return (
    <Text style={statusStyle}>{status}</Text>
  );
};