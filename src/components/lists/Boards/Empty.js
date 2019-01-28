import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ search, profile }) => profile ? null : (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
    {
      search ? "What interests you?" : "Follow a board or create a new one"
    }
    </Headline>
    {
      search && (
        <Paragraph style={styles.paragraph}>
          Find a board, follow, and get notified on event updates.
        </Paragraph>
      )
    }
  </View>
);
