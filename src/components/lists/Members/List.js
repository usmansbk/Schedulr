import React from 'react';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';
import styles, {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} from './styles';
import dummy from './dummy';

class List extends React.Component {
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _onPressItem = (id) => this.props.navigation.navigate('UserProfile', id);
  _keyExtractor = item => String(item.id);
  _renderFooter = () => <Footer />;
  _renderSeparator = () => <Separator />;
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
        style={styles.list}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this._renderFooter}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        getItemLayout={this._getItemLayout}
        data={dummy}
      />
    )
  }
}

export default withNavigationFocus(List);