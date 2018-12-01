import React from 'react';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import styles from './styles';

class List extends React.Component {
  shouldComponentUpdate = nextProps => nextProps.isFocused;
  _keyExtractor = item => item.id;
  _renderItem = () => <Item />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer />;
  _renderEmpty = () => <Empty />;

  render() {
    <FlatList
      style={styles.list}
      getItemLayout={this._getItemLayout}
      keyExtractor={this._keyExtractor}
      renderItem={this._renderItem}
      ItemSeparatorComponent={this._renderSeparator}
      ListFooterComponent={this._renderFooter}
      ListEmptyComponent={this._renderEmpty}
    />
  }
}

export default withNavigationFocus(List);