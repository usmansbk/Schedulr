import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './styles';

export default ({ section }) => {
  if (section.data.length) return null;
  return (
    <View style={styles.sectionFooter}>
      <Text style={styles.footerText}>No events</Text>
    </View>
  );
}
