import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Switch,
  Text
} from 'react-native-paper'

export default ({label, textStyle, onValueChange, value }) => {
  return (
    <TouchableWithoutFeedback onPress={onValueChange} style={styles.container}>
      <View style={styles.content}>
        <Text style={textStyle}>{label}</Text>
        <Switch onValueChange={onValueChange} value={value} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});