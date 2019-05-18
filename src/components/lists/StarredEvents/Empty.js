import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default ({ error, loading, search }) =>{
  if (loading) return null;
  return (
    <View style={styles.empty}>
      <Headline style={styles.emptyTitle}>
      {
        error ? 'Network error' : `${search ? "No event found" : "You haven't starred any event yet"}`
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