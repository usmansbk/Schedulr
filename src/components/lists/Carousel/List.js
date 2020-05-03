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
    return <Footer id={this.props.id} isOwner={this.props.isOwner} />;
  };

  _keyExtractor = item => item.key;

  render() {
    const { isOwner, pictureUrl } = this.props;
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[]}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={
          (isOwner || pictureUrl) ? this._renderHeader : undefined
        }
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}