import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>No new notifications</Headline>
    <Caption style={styles.paragraph}>All caught up!</Caption>
  </View>
);
