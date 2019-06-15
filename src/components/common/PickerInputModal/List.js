import React from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Item from './Item';

@inject('stores')
@observer
export default class List extends React.Component {

  _onLongPressItem = (id) => {
    alert('Long press: ' + id)
  };
  _onPressItem = (id) => {
    this.props.onValueChange(id);
    this.props.hideModal();
  }

  _keyExtractor = (item) => item;
  _renderSeparator = () => <Divider />;
  _renderItem = ({ item }) => (
    <Item
      value={item}
      onLongPressItem={this._onLongPressItem}
      onPressItem={this._onPressItem}
    />
  )

  render() {
    const { data } = this.props;

    return (
      <FlatList
        renderItem={this._renderItem}
        renderSeparator={<Divider />}
        data={data}
        keyExtractor={this._keyExtractor}

      />
    )
  }
}