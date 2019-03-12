import React from 'react';
import { TouchableRipple, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default ({ visible, onPress }) => (
  <TouchableRipple onPress={onPress} style={styles.header}>
    <Icon size={24} style={styles.headerText} name="keyboard-arrow-up" />
  </TouchableRipple>
);
