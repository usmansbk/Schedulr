import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import sortBoards from 'lib/utils';
import { boards } from 'lib/constants';

const {
  AVATAR_SIZE,
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT,
} = boards;

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
  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused;
  _onPressItem = (id) => this.props.navigation.navigate('BoardEvents', { id, cacheFirst: true });
  _navigateToInfo = (id) => this.props.navigation.navigate('BoardInfo', { id });
  _keyExtractor = (item) => String(item.id);
  _renderEmptyList = () => this.props.loading ? null : <Empty error={this.props.error} profile={this.props.profile} />;
  _renderItem = ({item}) => {
    const {
      id,
      name,
      description,
      isPublic,
      status,
      isAuthor,
      isFollowing,
    } = item;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        isPublic={isPublic}
        isClosed={status === 'CLOSED'}
        isAuthor={isAuthor}
        isFollowing={isFollowing}
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
    const data = sortBoards(boards);
    const styles = stores.appStyles.boardsList;
    const colors = stores.themeStore.colors;

    return (
      <FlatList
        refreshing={loading}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[colors.primary]}
          />
        }
        onRefresh={onRefresh}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={7}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={data}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

export default withNavigationFocus(List);