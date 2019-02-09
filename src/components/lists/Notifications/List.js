import React from 'react';
import { FlatList } from 'react-navigation';
import Empty from './Empty';
import Footer from './Footer';
import Item from './Item';

export default class List extends React.Component {
  _renderEmpty = () => <Empty visible />;
  _renderFooter = () => <Footer />;
  _renderItem = () => <Item />;
  render() {
    return (
      <FlatList
        data={[]}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmpty}
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}