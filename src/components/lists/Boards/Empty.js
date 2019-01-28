import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ search, profile }) => {
  let title = "Follow a board or create a new one";
  let paragraph = "Find a board, follow, and get notified on event updates."
  if (search) title = "What interests you?";
  else if (profile) title = "No boards";

  return (
    <View style={styles.empty}>
      <Headline style={styles.emptyTitle}>{title}</Headline>
      { search && <Paragraph style={styles.paragraph}>{paragraph}</Paragraph> }
    </View>
  );
};
