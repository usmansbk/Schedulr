import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ error }) => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      Network error
    </Headline>
    <Paragraph>
      Check your internet connection. Swipe to refresh.
    </Paragraph>
  </View>
);
