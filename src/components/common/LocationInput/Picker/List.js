import React from 'react';
import { FlatList, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Item from './Item';

const ITEM_HEIGHT = 48;

class List extends React.Component {
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
      onPressItem={this._onPressItem}
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

export default inject("stores")(observer(List));