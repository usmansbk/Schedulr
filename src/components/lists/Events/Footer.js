import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { gray } from './styles';

const styles = StyleSheet.create({
  container: { height: 48 },
  view: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontWeight: 'bold', color: gray }
})

export default ({ loading, onPress }) => {
  if (loading) return (
    <ActivityIndicator
      animating={loading}
      hideWhenStopped
      size="small"
    />
  );
  return (
    <TouchableRipple onPress={onPress} style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>Load more</Text>
      </View>
    </TouchableRipple>
  )
}
