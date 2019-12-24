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
    const { data=[], isOwner } = this.props;
    const isEmpty = !data.length;
    return <Footer
      isEmpty={isEmpty}
      isOwner={isOwner}
    />;
  };

  _keyExtractor = item => item.key;

  render() {
    const { data=[], isOwner } = this.props;
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={(data.length && !isOwner) ? null : this._renderFooter}
      />
    );
  }
}