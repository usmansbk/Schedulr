import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
    Join an event-group to see upcoming events and agendas
    </Headline>
  </View>
);
