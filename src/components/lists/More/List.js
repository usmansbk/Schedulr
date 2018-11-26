import React from 'react';
import { FlatList } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Item from './Item';
import items from './items';

export default class List extends React.Component {
  _renderHeader = () => <Header />;
  _renderFooter = () => <Footer />;
  _renderItem = () => <Item />;
  _keyExtractor = ({item}) => item.id;

  render() {
    return (
      <FlatList
        data={items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListFooterComponent={this._renderFooter}
        ListHeaderComponent={this._renderHeader}
      />
    );
  }
}