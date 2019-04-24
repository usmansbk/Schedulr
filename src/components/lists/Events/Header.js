import React from 'react';
import { TouchableRipple, ActivityIndicator, Text } from 'react-native-paper';
import styles from './styles';

export default ({ onPress }) => (
  <TouchableRipple onPress={onPress} style={styles.header}>
    <Text style={styles.headerText}>Load past few days</Text>
  </TouchableRipple>
);
