import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ error }) => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      {
        error ? 'Network error' : 'Ask a question'
      }
    </Headline>
    {
      error && (
        <Paragraph style={styles.paragraph}>
          Check your internet connection. Swipe down to refresh.
        </Paragraph>
      )
    }
  </View>
);
