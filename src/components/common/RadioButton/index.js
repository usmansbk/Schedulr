import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Text,
  RadioButton
} from 'react-native-paper'

export default ({label, textStyle, onPress, checked }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={styles.container}>
      <View style={Boolean(label) ? styles.content : styles.button}>
        {Boolean(label) && <Text style={textStyle}>{label}</Text>}
        <RadioButton onPress={onPress} status={checked ? 'checked' : 'unchecked'} />
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
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});