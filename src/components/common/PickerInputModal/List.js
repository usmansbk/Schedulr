import React from 'react';
import { FlatList, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';
import Item from './Item';

const ITEM_HEIGHT = 48;

@inject('stores')
@observer
export default class List extends React.Component {
  _onLongPressItem = (id) => {
    Alert.alert(
      'Delete type?',
      id,
      [
        {
          text: 'Yes', onPress: () => this.props.stores.appState.removeCustomType(id),
        },
        {
          text: "No", onPress: () => null
        }
      ],
      { cancelable: true }
    )
  };
  _onPressItem = (id) => {
    this.props.onValueChange(id);
    this.props.hideModal();
  }
  
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index
    }
  );

  _keyExtractor = (item) => item;
  _renderItem = ({ item }) => (
    <Item
      value={item}
      onLongPressItem={this._onLongPressItem}
      onPressItem={this._onPressItem}
      marked={item.toLowerCase() === this.props.selectedValue.toLowerCase()}
    />
  );

  render() {
    const { data } = this.props;
    return (
      <FlatList
        renderItem={this._renderItem}
        data={data}
        keyExtractor={this._keyExtractor}
        getItemLayout={this._getItemLayout}
      />
    )
  }
}