import React from 'react';
import {
  Text,
  TouchableRipple
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id);
  render() {
    const { value } = this.props;
    return (
      <TouchableRipple onPress={this._onPress}>
        <View style={styles.container}>
          <Text>
            # {value}
          </Text>
        </View>
      </TouchableRipple>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
  }
});
