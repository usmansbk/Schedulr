import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './styles';

export default ({ section: { title: { heading, subheading } } }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeading}>{heading}</Text>
    <Text style={styles.sectionSubheading}>{subheading}</Text>
  </View>
);
