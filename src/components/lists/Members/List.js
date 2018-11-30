import React from 'react';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Footer from './Footer';
import Item from './Item';
import dummy from './dummy';

class List extends React.Component {
  shouldComponentUpdate = () => this.props.isFocused;
  _onPressItem = (id) => this.props.navigation.navigate('UserProfile', id);
  _keyExtractor = item => String(item.id);
  _renderFooter = () => <Footer />;
  _renderItem = ({item: {
    id,
    name,
    pictureUrl
  }}) => {
    return (
      <Item
        id={id}
        name={name}
        pictureUrl={pictureUrl}
        onPressItem={this._onPressItem}
      />
    )
  }
  render() {
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this._renderFooter}
        renderItem={this._renderItem}
        data={dummy}
      />
    )
  }
}

export default withNavigationFocus(List);