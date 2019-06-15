import React from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class Item extends React.Component {
  _onLongPress = () => this.props.onLongPressItem(this.props.value);
  _onPress = () => this.props.onPressItem(this.props.value);

  render() {
    const { value, stores, marked } = this.props;
    const styles = stores.appStyles.customTypes;

    return  (
      <TouchableRipple
        style={styles.container}
        onPress={this._onPress}
        onLongPress={this._onLongPress}
      >
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>{value}</Text>
            { marked && <Icon name="check" size={20} /> }
          </View>
        </View>
      </TouchableRipple>
    )
  }
}
