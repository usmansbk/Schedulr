import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import {
  getDuration,
  getHumanTime,
  parseRepeat,
  getStatus,
  getEventType
} from 'lib/parseItem';
import { getEvents } from 'lib/calendr';
import { starredEvents } from 'lib/constants';

const { ITEM_HEIGHT, SEPARATOR_HEIGHT } = starredEvents;

class List extends Component {
  state = {
    fetchingMore: false
  };

  static defaultProps = {
    events: [],
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
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _navigateToInfo = (id) => this.props.navigation.navigate('ScheduleInfo', { id });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });
  _keyExtractor = (item) => String(item.id); 
  _onEndReached = async () => {
    const { fetchMore, loading, from } = this.props;
    if (!loading && from) {
      this.setState({ fetchingMore: true });
      await fetchMore(Number(from));
      this.setState({ fetchingMore: false });
    }
  }

  _renderItem = ({ item: {
    id,
    title,
    eventType,
    isCancelled,
    cancelledDates,
    startAt,
    endAt,
    repeat,
    venue,
    board,
    allDay,
    isConcluded,
    starsCount,
    commentsCount,
    isStarred
  }}) => (<Item
    id={id}
    title={title}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt, isConcluded})}
    startAt={startAt}
    endAt={endAt}
    starsCount={starsCount}
    commentsCount={commentsCount}
    isStarred={isStarred}
    eventType={getEventType(eventType)}
    repeat={parseRepeat(repeat)}
    time={getHumanTime({ allDay, startAt, endAt })}
    boardId={board && board.id}
    duration={getDuration(startAt, endAt, allDay)}
    address={venue}
    onPressItem={this._onPressItem}
    onPressComment={this._navigateToComments}
    navigateToInfo={this._navigateToInfo}
  />);

  _renderEmptyList = () => <Empty
    search={this.props.search}
    error={this.props.error}
    loading={this.props.loading}
  />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer
    visible={this.props.events.length}
    loading={this.props.loading && this.state.fetchingMore}
    onPress={this._onEndReached}
    hasMore={this.props.from}
  />;

  render() {
    const {
      events,
      loading,
      onRefresh,
      stores
    } = this.props;
    const { fetchingMore } = this.state;

    const styles = stores.appStyles.starredEventsList;
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
        data={getEvents(events)}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
        onEndReachedThreshold={0.5}
        onEndReached={this._onEndReached}
        keyboardShouldPersistTaps="always"
      />
    )
  }
}

const withStores = inject("stores")(observer(List));

export default withNavigationFocus(withStores);