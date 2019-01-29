import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ isConnected }) => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      {
        isConnected ? 'Find an event' : 'Searching offline...'
      }
    </Headline>
    <Paragraph style={styles.paragraph}>
      Press the <Icon name="filter-list" size={12} /> button to customize your search.
    </Paragraph>
  </View>
);
