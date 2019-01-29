import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ search, profile }) => {
  let title = "What interests you?";
  let paragraph = "Find a board, follow, and get notified on event updates."

  return (
    <View style={styles.empty}>
      <Headline style={styles.emptyTitle}>{title}</Headline>
      <Paragraph style={styles.paragraph}>{paragraph}</Paragraph>
    </View>
  );
};
