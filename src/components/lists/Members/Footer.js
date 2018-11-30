import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>End of list</Text>
  </View>
);
