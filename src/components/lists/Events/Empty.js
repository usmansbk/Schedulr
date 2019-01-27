import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
    No schedule - yet
    </Headline>
    <Paragraph style={styles.paragraph}>
      Use the top-left filter button to customize your search.
    </Paragraph>
  </View>
);
