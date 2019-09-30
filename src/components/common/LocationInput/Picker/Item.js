import React from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.value);

  render() {
    const { value, stores } = this.props;
    const styles = stores.appStyles.customTypes;
    const colors = stores.themeStore.colors;

    return  (
      <TouchableRipple
        style={styles.container}
        onPress={this._onPress}
      >
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>{value}</Text>
          </View>
        </View>
      </TouchableRipple>
    )
  }
}

export default inject("stores")(observer(Item));