import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Text,
} from 'native-base';
import palatte from '../../theme';

export default ({ message }) => (
  <View style={styles.error}>
    <Text style={styles.errorText}>
      {message}
    </Text>
  </View>
)

const styles = StyleSheet.create({ 
  errorText: {
    color: 'white',
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palatte.gray
  },
})