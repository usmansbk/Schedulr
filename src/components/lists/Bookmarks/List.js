import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-navigation';
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
import getImageUrl from 'helpers/getImageUrl';

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
    banner,
    startAt,
    endAt,
    recurrence,
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
      cancelledDates,
      startAt, endAt, isConcluded
    })}
    startAt={startAt}
    endAt={endAt}
    pictureUrl={banner && getImageUrl(banner)}
    isBookmarked={this.props.stores.appState.isBookmarked(id)}
    bookmarksCount={bookmarksCount}
    commentsCount={commentsCount}
    category={getCategory(category)}
    recurrence={parseRepeat(recurrence)}
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

    return (
      <FlatList
        refreshing={loading}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
          />
        }
        onRefresh={onRefresh}
        style={stores.appStyles.bookmarkedEventsList.list}
        contentContainerStyle={stores.appStyles.bookmarkedEventsList.contentContainer}
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

export default inject("stores")(observer(List));