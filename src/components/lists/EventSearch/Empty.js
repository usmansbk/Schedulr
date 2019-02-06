import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default (props) => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
      Find an event
    </Headline>
    {
      !props.trend && (
        <Paragraph style={styles.paragraph}>
          Press the <Icon name="near-me" size={12} /> button to find near-by events.
        </Paragraph>
      )
    }
  </View>
);
