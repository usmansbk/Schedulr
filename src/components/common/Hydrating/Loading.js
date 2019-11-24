import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import colors from 'config/colors';

export default class Loading extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray
  },
});