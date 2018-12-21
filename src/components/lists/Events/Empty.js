import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import styles from './styles';

export default (props) => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>
    {
      props.starred ? 'Nothing to see here - yet' : (
        'When you join a group, their events and agendas show up here'
      )
    }
    </Headline>
  </View>
);
