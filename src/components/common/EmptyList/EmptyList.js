import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
    padding: 24
  },
  text: {
    fontSize: 24,
    textAlign: 'center'
  },
  note: {
    textAlign: 'center',
    color: '#404040'
  },
})

export default (props) => {
  const { title, note } = props;
  return (
    <View style={styles.container}>
      <Text uppercase={false} style={styles.text} note>{title}</Text>
      {
        Boolean(note) && (
          <Text style={styles.note}>{note}</Text>
        )
      }
    </View>
  )
}