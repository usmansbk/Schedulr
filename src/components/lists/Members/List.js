import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';
import styles, {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT,
  primaryColor
} from './styles';

class List extends React.Component {
  static defaultProps = {
    members: [],
    loading: false,
    hasMore: false,
    onRefresh: () => null,
  };
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
    const {
      members,
      loading,
      onRefresh
    } = this.props;
    return (
      <FlatList
        style={styles.list}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this._renderFooter}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        getItemLayout={this._getItemLayout}
        data={members}
        refreshing={loading}
        onRefresh={onRefresh}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} colors={[primaryColor]}/>}
      />
    )
  }
}

export default withNavigationFocus(List);