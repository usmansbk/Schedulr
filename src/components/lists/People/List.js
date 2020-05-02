import React from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { people_list } from 'lib/constants';
import { calendarTime } from 'lib/time';
import getImageUrl from 'helpers/getImageUrl';
import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';
import Empty from './Empty';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = people_list;

class List extends React.Component {
  state = {
    fetchingMore: false
  };

  static defaultProps = {
    people: [],
    loading: false,
    hasMore: false,
    onRefresh: () => null,
    fetchMore: () => null
  };
  shouldComponentUpdate = (nextProps, nextState) => { 
    return (nextProps.isFocused &&
      (
        nextProps.people !== this.props.people ||
        nextProps.loading !== this.props.loading ||
        nextProps.error !== this.props.error ||
        nextState.fetchingMore !== this.state.fetchingMore
      )
    );
  };
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _onPressItem = (id) => this.props.navigation.navigate('UserProfile', { id });
  _keyExtractor = item => String(item.id);
  _renderFooter = () => <Footer
    hide={!this.props.people.length}
    loading={this.props.loading && this.state.fetchingMore}
    hasMore={this.props.hasMore}
    onPress={this._onEndReached}
  />;
  _renderSeparator = () => <Separator />;
  _renderEmpty = () => <Empty
    loading={this.props.loading}
    onRefresh={this.props.onRefresh}
    error={this.props.error}
    isOwner={this.props.isOwner}
    isBookmarks={this.props.isBookmarks}
    search={this.props.search}
  />;
  _renderItem = ({item}) => {
    const user = this.props.search ? item : item.user;
    const {
      id,
      name,
      avatar,
      pictureUrl
    } = user;
    const createdAt = item.user && item.createdAt;

    return (
      <Item
        id={id}
        name={name}
        pictureUrl={avatar ? getImageUrl(avatar) : pictureUrl}
        joined={createdAt && calendarTime(createdAt)}
        onPressItem={this._onPressItem}
      />
    )
  };

  _fetchMore = async () => {
    const { nextToken, fetchMoreFollowers, loading } = this.props;
    if (nextToken && !loading) {
      this.setState({ fetchingMore: true });
      await fetchMoreFollowers(nextToken);
      this.setState({ fetchingMore: false });
    }
  };

  _onEndReached = () => setTimeout(this._fetchMore, 0);

  render() {
    const {
      people,
      loading,
      onRefresh,
      stores
    } = this.props;

    const styles = stores.appStyles.peopleList;

    return (
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this._renderFooter}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        ListEmptyComponent={this._renderEmpty}
        getItemLayout={this._getItemLayout}
        data={people}
        onEndReachedThreshold={0.5}
        onEndReached={this._onEndReached}
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
          />
        }
      />
    )
  }
}

const withStores = inject("stores")(observer(List));

export default withNavigationFocus(withStores);