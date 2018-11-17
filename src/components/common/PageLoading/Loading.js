import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';

export default class PageLoading extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})