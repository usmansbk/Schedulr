import React from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class Item extends React.Component {
  _onLongPress = () => this.props.onLongPressItem(this.props.id);
  _onPress = () => this.props.onPressItem(this.props.id);

  render() {
    const { value, stores } = this.props;
    const styles = stores.appStyles.customTypes;

    return  (
      <TouchableRipple
        style={styles.container}
        onPress={this._onPress}
        onLongPress={this._onLongPress}
      >
        <View style={styles.content}>
          <Text style={styles.text}>{value}</Text>
        </View>
      </TouchableRipple>
    )
  }
}
