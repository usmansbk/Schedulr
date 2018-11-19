import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import colors from '../../../config/colors';

export default (props) => (
  <TouchableRipple
    disabled={props.disabled}
    onPress={props.onPress}
    style={[styles.button, props.style]}
  >
    <Text>{props.children}</Text>
  </TouchableRipple>
);

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius: 4,
  }
})