import React from 'react';
import { FlatList } from 'react-native';
import Item from './Item';

const ITEM_HEIGHT = 48;

export default class List extends React.Component {

  _onPressItem = (id) => {
    this.props.onValueChange(id);
    this.props.hideModal();
  };
  
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
      onLongPressItem={this.props.onLongPressItem}
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
        keyboardShouldPersistTaps="always"
      />
    )
  }
}