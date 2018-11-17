import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { Text } from 'native-base';
import theme from '../../theme';

export default class Item extends React.PureComponent {
  render() {
    const {
      name,
      value,
      numberOfLines,
      ellipsizeMode,
      onPress
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.name}>
          {name}
        </Text>
        <Text
          style={styles.value}
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          onPress={onPress}
        >
          {value}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    marginLeft: 16,
  },
  name: {
    fontFamily: 'sans-serif-light',
  },
  value: {
    fontSize: 17,
    color: '#404040'
  },
  nav: {
    fontSize: 17,
    color: theme.bgLight,
  }
})