import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import { schedule_search, SCHEDULE_CLOSED } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = schedule_search;

class List extends Component {
  state = {
    fetchingMore: false
  };
  static defaultProps = {
    schedules: [],
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
    return (nextProps.navigation.isFocused() &&
      (
        nextProps.schedules !== this.props.schedules ||
        nextProps.loading !== this.props.loading
      )
    );
  };
  _onPressItem = (id) => this.props.navigation.navigate('ScheduleInfo', { id });
  _keyExtractor = (item) => String(item.id);
  _onEndReached = async () => {
    const { fetchMore, loading, from } = this.props;
    if (!loading && from) {
      this.setState({ fetchingMore: true });
      await fetchMore(Number(from));
      this.setState({ fetchingMore: false });
    }
  };
  _renderEmptyList = () => this.props.loading ? null : <Empty />;
  _renderItem = ({item}) => {
    const {
      id,
      name,
      description,
      picture,
      isPublic,
      status,
      isOwner,
    } = item;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        pictureUrl={picture && getImageUrl(picture)}
        isPublic={isPublic}
        isClosed={status === SCHEDULE_CLOSED}
        isOwner={isOwner}
        isFollowing={this.props.appState.isFollowing(id)}
        onPressItem={this._onPressItem}
        navigateToScheduleInfo={this._navigateToInfo}
      />
    )
  }

  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer
    visible={this.props.schedules.length}
    loading={this.props.loading && this.state.fetchingMore}
    onPress={this._onEndReached}
    hasMore={this.props.from}
  />;

  render() {
    const {
      schedules,
      loading,
      onRefresh,
      stores
    } = this.props;
    const { fetchingMore } = this.state;

    const styles = stores.appStyles.scheduleSearch;

    return (
      <FlatList
        refreshing={loading && !fetchingMore}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading && !fetchingMore}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
          />
        }
        onRefresh={onRefresh}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={0}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={schedules}
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