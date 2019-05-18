import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import { board_search } from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = board_search;

@inject('stores')
@observer
class List extends Component {
  static defaultProps = {
    boards: [],
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
  shouldComponentUpdate = (nextProps) => { 
    return (nextProps.navigation.isFocused &&
      (
        nextProps.boards !== this.props.boards ||
        nextProps.loading !== this.props.loading
      )
    );
  };
  _onPressItem = (id, cacheFirst) => this.props.navigation.navigate('BoardInfo', { id, cacheFirst });
  _keyExtractor = (item) => String(item.id);
  _renderEmptyList = () => this.props.loading ? null : <Empty />;
  _renderItem = ({item}) => {
    const {
      id,
      name,
      description,
      isPublic,
      status,
      isAuthor,
    } = item;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        isPublic={isPublic}
        isClosed={status === 'CLOSED'}
        isAuthor={isAuthor}
        onPressItem={this._onPressItem}
        navigateToBoardInfo={this._navigateToInfo}
      />
    )
  }

  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.boards.length} />;

  render() {
    const {
      boards,
      loading,
      onRefresh,
      stores
    } = this.props;

    const styles = stores.appStyles.boardSearch;

    return (
      <FlatList
        refreshing={loading}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[stores.themeStore.colors.primary]}
          />
        }
        onRefresh={onRefresh}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={7}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={boards}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

export default withNavigationFocus(List);