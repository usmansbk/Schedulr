import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      Be the first to join!
    </Headline>
  </View>
);
