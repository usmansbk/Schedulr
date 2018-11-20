import React from 'react';
import { View } from 'react-native';
import { Text, Headline, Divider } from 'react-native-paper';
import styles from './styles';

export default (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.head}>
          <Headline style={styles.title}>(No Title)</Headline>
          <Text style={styles.date}>Tuesday, 20 November</Text>
          <Text style={styles.date}>02:30 - 03:30</Text>
        </View>
        <Divider />
        <View>
          <Text style={styles.label}>location</Text>
          <Text style={styles.value}>No location set</Text>
        </View>
      </View>
    </View>
  );
}