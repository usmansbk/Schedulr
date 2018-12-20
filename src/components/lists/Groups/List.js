import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import styles, {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} from './styles';
import colors from '../../../config/colors';

class List extends Component {
  static defaultProps = {
    groups: [],
    loading: false,
    onRefresh: () => null
  };
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  _onPressItem = (id) => this.props.navigation.navigate('GroupEvents', { id });
  _navigateToInfo = (id) => this.props.navigation.navigate('GroupInfo', { id });
  _keyExtractor = (item) => String(item.node.id);
  _renderEmptyList = () => <Empty />;
  _renderItem = ({item: { node }}) => {
    const {
      id,
      name,
      description,
      isPrivate,
      isClosed,
      isAdmin,
    } = node;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        isPrivate={isPrivate}
        isClosed={isClosed}
        isAdmin={isAdmin}
        onPressItem={this._onPressItem}
        navigateToGroupInfo={this._navigateToInfo}
      />
    )
  }

  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.groups.length} />;

  render() {
    const {
      groups=[],
      loading,
      onRefresh
    } = this.props;
    return (
      <FlatList
        refreshing={loading}
        refreshControl={<RefreshControl refreshing={loading} colors={[colors.primary]} />}
        onRefresh={onRefresh}
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

export default withNavigationFocus(List);