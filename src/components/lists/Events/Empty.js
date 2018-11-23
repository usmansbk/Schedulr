import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Headline } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Icon style={styles.emptyIcon} name="event-busy" />
    <Headline style={styles.emptyTitle}>No upcoming event</Headline>
  </View>
);
