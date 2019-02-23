import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default (props) => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      Find an event
    </Headline>
  </View>
);
