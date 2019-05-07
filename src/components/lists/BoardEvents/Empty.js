import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ error, loading }) =>{
  if (loading) return null;
  return (
    <View style={styles.empty}>
      <Headline style={styles.emptyTitle}>
      {
        error ? 'Network error' : 'No schedule yet'
      }
      </Headline>
      {
        error && (
          <Paragraph style={styles.paragraph}>
            Check your internet connection. Pull to refresh.
          </Paragraph>
        )
      }
    </View>
  );  
}