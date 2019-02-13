import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ profile, error }) => {
  let title = "Follow or create a board";
  if (profile) title = "No boards";
  if (error) {
    title = "Network error";
  }

  return (
    <View style={styles.empty}>
      <Headline style={styles.emptyTitle}>{title}</Headline>
    {
      error && (
        <Paragraph style={styles.paragraph}>
          Check your internet connection. Pull to refresh.
        </Paragraph>
      )
    }
    </View>
  );
};
