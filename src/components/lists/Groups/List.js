import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import styles, {
  ITEM_HEIGHT,
  SEPERATOR_HEIGHT
} from './styles';
import groups from './dummy';

class List extends Component {
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPERATOR_HEIGHT,
      index
    }
  );
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  _onPressItem = (id) => this.props.navigation.navigate('GroupEvents', { id });
  _keyExtractor = (item) => String(item.node.id);
  _renderEmptyList = () => <Empty />;
  _renderItem = ({item: { node }}) => {
    const {
      id,
      name,
      description,
      isPrivate,
      closed,
      isAdmin,
    } = node;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        isPrivate={isPrivate}
        closed={closed}
        isAdmin={isAdmin}
        onPressItem={this._onPressItem}
      />
    )
  }

  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={defaultProps.groups.length} />;

  render() {
    const {
      groups=[],
    } = defaultProps;
    return (
      <FlatList
        style={styles.list}
        initialNumToRender={5}
        extraData={groups.length}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={groups}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

const defaultProps = {
  groups,
  loading: false,
}

export default withNavigationFocus(List);