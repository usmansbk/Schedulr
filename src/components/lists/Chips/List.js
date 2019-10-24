import React from 'react';
import { FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import Item from './Item';

const ITEM_HEIGHT = 48;

class List extends React.Component {
  static defaultProps = {
    data: [],
    filters: []
  };

  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index
    }
  );

  _onPressItem = (id) => this.props.stores.appState.toggleFilter(id);

  _renderItem = ({ item }) => (
    <Item
      text={item}
      onPress={this._onPressItem}
      selected={this.props.stores.appState.isToggled(item)}
    />
  );

  _keyExtractor = (item, index) => item + index;

  render() {
    const { stores, data } = this.props;
    return (
      <FlatList
        horizontal
        contentContainerStyle={stores.appStyles.chipList.container}
        data={data}
        renderItem={this._renderItem}
        initialNumToRender={5}
        keyExtractor={this._keyExtractor}
        showsHorizontalScrollIndicator={false}
        extraData={stores.appState.discoverFilter}
        getItemLayout={this._getItemLayout}
      />
    );
  }
}

export default inject("stores")(observer(List));