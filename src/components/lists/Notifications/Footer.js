import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './styles';

export default ({ visible }) => visible ? (
  <View style={styles.footer}>
    <Text style={styles.footerText}>You've caught up!</Text>
  </View>
) : null;
