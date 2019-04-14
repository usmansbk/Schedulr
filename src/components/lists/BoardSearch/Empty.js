import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import styles from './styles';

export default () => {
  return (
    <View style={styles.empty}>
      <Headline style={styles.emptyTitle}>What interests you?</Headline>
      <Caption style={styles.paragraph}>Find a calendar, follow, and get notified on event updates.</Caption>
    </View>
  );
};
