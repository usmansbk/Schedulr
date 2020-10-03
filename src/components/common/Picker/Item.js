import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';

class Item extends React.Component {
  _onLongPress = () =>
    this.props.onLongPress && this.props.onLongPress(this.props.value);

  render() {
    const {stores, marked, label, editable} = this.props;
    const styles = stores.styles.customTypes;
    const colors = stores.theme.colors;

    return (
      <View onLongPress={this._onLongPress} style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.text}>{label}</Text>
          {marked && <Icon name="check" size={20} color={colors.primary} />}
          {/* {editable && !marked && (
            <TouchableOpacity onPress={this._onLongPress}>
              <Icon name="close" size={20} color={colors.light_red} />
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    );
  }
}

export default inject('stores')(observer(Item));
