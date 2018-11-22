import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './styles';

export default ({ title: { heading, subheading }}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeading}>{heading}</Text>
    <Text style={styles.sectionSubHeading}>{subheading}</Text>
  </View>
);
