import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text  } from 'react-native-paper';
import styles from './styles';

export default ({ visible, loading }) => {
  if (loading) return <ActivityIndicator animating={loading} size="small" />;
  if (visible) return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>No more events</Text>
    </View>
  );
  return null;
}
