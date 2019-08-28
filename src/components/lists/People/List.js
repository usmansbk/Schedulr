import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import getImageUrl from 'helpers/getImageUrl';
import { bookmarkedEvents } from 'lib/constants';

const { ITEM_HEIGHT, SEPARATOR_HEIGHT } = bookmarkedEvents;

class List extends Component {
  state = {
    fetchingMore: false
  };

  static defaultProps = {
    people: [],
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
  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id });
  _keyExtractor = (item) => String(item.id); 
  _onEndReached = async () => {
    const { fetchMore, loading, nextToken } = this.props;
    if (!loading && nextToken) {
      this.setState({ fetchingMore: true });
      await fetchMore(Number(nextToken));
      this.setState({ fetchingMore: false });
    }
  };

  _renderItem = ({ item: {
    id,
    name,
    pictureUrl,
    avatar
  }}) => (<Item
    id={id}
    name={name}
    pictureUrl={avatar ? getImageUrl(avatar) : pictureUrl}
    navigateToProfile={this._navigateToProfile}
  />);

  _renderEmptyList = () => <Empty
    search={this.props.search}
    error={this.props.error}
    loading={this.props.loading}
  />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer
    visible={this.props.people.length}
    loading={this.props.loading && this.state.fetchingMore}
    onPress={this._onEndReached}
    hasMore={this.props.from}
  />;

  render() {
    const {
      people,
      loading,
      onRefresh,
      stores
    } = this.props;
    const { fetchingMore } = this.state;

    const styles = stores.appStyles.bookmarkedEventsList;
    const colors = stores.themeStore.colors;

    return (
      <FlatList
        refreshing={loading && !fetchingMore}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading && !fetchingMore}
            colors={[colors.primary]}
            progressBackgroundColor={colors.bg}
          />
        }
        onRefresh={onRefresh}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={0}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={people}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
        keyboardShouldPersistTaps="always"
      />
    )
  }
}

const withStores = inject("stores")(observer(List));

export default withNavigationFocus(withStores);