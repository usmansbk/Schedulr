import React from 'react';
import { TouchableRipple, Text } from 'react-native-paper';
import styles from './styles';

export default ({ visible, onPress }) => visible ? (
  <TouchableRipple onPress={onPress} style={styles.header}>
    <Text style={styles.headerText}>Load recent events</Text>
  </TouchableRipple>
): null;
