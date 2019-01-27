import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      Find an event
    </Headline>
    <Paragraph style={styles.paragraph}>
      Press the top-left filter button to customize your search.
    </Paragraph>
  </View>
);
