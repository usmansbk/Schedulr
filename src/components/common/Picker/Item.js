import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import Confirm from 'components/common/Confirm';

class Item extends React.Component {
  _onPress = () => this.props.onValueChange({value: this.props.value});

  _onLongPress = () => this.confirm?.open();
  _onConfirmDelete = () =>
    this.props.stores.appState.removeCustomType(this.props.value);

  render() {
    const {stores, marked, label, onDeleteItem} = this.props;
    const styles = stores.styles.customTypes;
    const colors = stores.theme.colors;

    return (
      <>
        <TouchableOpacity
          onPress={this._onPress}
          onLongPress={onDeleteItem && this._onLongPress}>
          <View style={styles.content}>
            <View style={styles.row}>
              <Text style={styles.text}>{label}</Text>
              {marked && <Icon name="check" size={20} color={colors.primary} />}
            </View>
          </View>
        </TouchableOpacity>
        {Boolean(onDeleteItem) && (
          <Confirm
            height={250}
            title="Delete tag?"
            ref={(ref) => (this.confirm = ref)}
            onConfirm={this._onConfirmDelete}
          />
        )}
      </>
    );
  }
}

export default inject('stores')(observer(Item));
