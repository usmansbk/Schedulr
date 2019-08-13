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
  getCategory
} from 'lib/parseItem';
import { sortBookmarks } from 'lib/utils';
import { getEvents } from 'lib/calendr';
import { bookmarkedEvents } from 'lib/constants';

const { ITEM_HEIGHT, SEPARATOR_HEIGHT } = bookmarkedEvents;

class List extends Component {
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

  _renderItem = ({ item: {
    id,
    title,
    category,
    isCancelled,
    cancelledDates,
    startAt,
    endAt,
    recur,
    venue,
    schedule,
    allDay,
    isConcluded,
    bookmarksCount,
    commentsCount
  }}) => (<Item
    id={id}
    title={title}
    status={getStatus({
      isCancelled,
      cancelledDates: cancelledDates || [],
      startAt, endAt, isConcluded
    })}
    startAt={startAt}
    endAt={endAt}
    bookmarksCount={bookmarksCount}
    commentsCount={commentsCount}
    isBookmarked
    category={getCategory(category)}
    recur={parseRepeat(recur)}
    time={getHumanTime({ allDay, startAt, endAt })}
    eventScheduleId={schedule && schedule.id}
    duration={getDuration(startAt, endAt, allDay)}
    address={venue}
    onPressItem={this._onPressItem}
    onPressComment={this._navigateToComments}
    navigateToInfo={this._navigateToInfo}
  />);

  _renderEmptyList = () => <Empty search={this.props.search} error={this.props.error} loading={this.props.loading} />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.events.length} />;

  render() {
    const {
      events,
      loading,
      onRefresh,
      stores
    } = this.props;

    const styles = stores.appStyles.bookmarkedEventsList;
    const colors = stores.themeStore.colors;

    return (
      <FlatList
        refreshing={loading}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[colors.primary]}
            progressBackgroundColor={colors.bg}
          />
        }
        onRefresh={onRefresh}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={5}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={sortBookmarks(getEvents(events))}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

const withStores = inject("stores")(observer(List));

export default withNavigationFocus(withStores);