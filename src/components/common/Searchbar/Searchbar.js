import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    padding: 16
  },
  placeholder: {
    color: colors.gray,
    fontSize: 18,
    paddingLeft: 16
  }
});

export default ({ placeholder, icon, onPress }) => (
  <TouchableRipple onPress={onPress}>
    <View style={styles.container}>
      <Icon name={icon || 'search'} size={24} />
      <Text style={styles.placeholder}>{ placeholder }</Text>
    </View>
  </TouchableRipple>
);