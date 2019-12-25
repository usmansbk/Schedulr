import React from 'react';
import { FlatList } from 'react-native';
import Footer from './footer';
import Item from './Item';

export default class List extends React.Component {
  _navigateToBanner = () => this.props.navigateToBanner(this.props.id);
  _renderItem = ({ item }) => {
    return <Item pictureUrl={item} />;
  };

  _renderHeader = () => {
    const { banner } = this.props;
    return <Item pictureUrl={banner} onPress={this._navigateToBanner} />;
  };

  _renderFooter = () => {
    return <Footer />;
  };

  _keyExtractor = item => item.key;

  render() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[]}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}