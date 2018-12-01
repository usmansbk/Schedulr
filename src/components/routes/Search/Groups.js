import React from 'react';
import { View, StyleSheet } from 'react-native';
import List from '../../lists/Groups';

export default class Groups extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <List />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
