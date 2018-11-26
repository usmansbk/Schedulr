import React from 'react';
import { FlatList } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';
import items from './items';
import styles from './styles';

export default class List extends React.Component {
  _renderHeader = () => <Header />;
  _renderFooter = () => <Footer />;
  _renderItem = ({
    item: {
      name,
      icon,
      onPress
    }
  }) => <Item name={name} icon={icon} onPress={onPress} />;
  _renderSeparator = () => <Separator />;
  _keyExtractor = (item) => item.id;

  render() {
    return (
      <FlatList
        style={styles.container}
        data={items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        ListFooterComponent={this._renderFooter}
        ListHeaderComponent={this._renderHeader}
      />
    );
  }
}