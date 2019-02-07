import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      Explore
    </Headline>
    <Paragraph style={styles.paragraph}>
      Nearby, sponsored and suggested events
    </Paragraph>
  </View>
);
