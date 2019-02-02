import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ error, loading }) => loading ? null : (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      {
        error ? 'Network error' : 'No comments'
      }
    </Headline>
    {
      error && (
        <Paragraph style={styles.paragraph}>
          Check your internet connection. Pull to refresh.
        </Paragraph>
      )
    }
  </View>
);
