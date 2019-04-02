import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './styles';
import { BULLET } from 'lib/constants';

export default ({visible}) => visible ? (
  <View style={styles.footer}>
    <Text style={styles.footerText}>{BULLET}</Text>
  </View>
) : null;
