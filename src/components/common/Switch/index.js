import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  TouchableRipple,
  Switch,
  Text,
  Caption
} from 'react-native-paper'

export default ({label, textStyle, onValueChange, value, description }) => {
  return (
    <TouchableWithoutFeedback onPress={onValueChange} style={styles.container}>
      <View style={Boolean(label) ?styles.content: styles.button }>
        {Boolean(label) && <View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={textStyle}>{label}</Text>
          { Boolean(description) && <Caption>{description}</Caption>}
        </View>}
        <Switch value={value} onValueChange={onValueChange} />
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
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});