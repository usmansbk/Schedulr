import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { people_list } from 'lib/constants';
import { timeAgo } from 'lib/time';
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
  };
  shouldComponentUpdate = (nextProps, nextState) => { 
    return (nextProps.navigation.isFocused() &&
      (
        nextProps.people !== this.props.people ||
        nextProps.loading !== this.props.loading ||
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
  _renderEmpty = () => this.props.loading ? null : <Empty
    onRefresh={this.props.onRefresh}
    error={this.props.error}
    isOwner={this.props.isOwner}
  />;
  _renderItem = ({item: {
    user: {
      id,
      name,
      avatar,
      pictureUrl
    },
    createdAt
  }}) => {
    return (
      <Item
        id={id}
        name={name}
        pictureUrl={avatar ? getImageUrl(avatar) : pictureUrl}
        joined={timeAgo(createdAt)}
        onPressItem={this._onPressItem}
      />
    )
  }

  _onEndReached = async () => {
    const { nextToken, fetchMoreFollowers, loading } = this.props;
    if (nextToken && !loading) {
      this.setState({ fetchingMore: true });
      await fetchMoreFollowers(nextToken);
      this.setState({ fetchingMore: false });
    }
  };

  render() {
    const {
      people,
      loading,
      onRefresh,
      stores
    } = this.props;

    const { fetchingMore } = this.state;

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
        refreshing={loading && !fetchingMore}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.5}
        onEndReached={this._onEndReached}
        refreshControl={
          <RefreshControl
            refreshing={loading && !fetchingMore}
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