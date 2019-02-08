import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      Explore
    </Headline>
    <Caption style={styles.paragraph}>
      Nearby, sponsored and suggested events
    </Caption>
  </View>
);
