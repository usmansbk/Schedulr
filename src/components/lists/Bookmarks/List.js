import React, { Component } from 'react';
import { FlatList } from 'react-navigation';
import { RefreshControl } from 'react-native';
import { inject, observer } from 'mobx-react';
import Item from './Item';
import Unavailable from './Unavailable';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import {
  parseRepeat,
  getStatus,
  getCategory
} from 'lib/parseItem';
import {
  getDuration,
  getHumanTime
} from 'lib/time';
import { sortBookmarks } from 'lib/utils';
import { processEvents } from 'lib/calendr';
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

  _onRefresh = () => this.props.refresh();
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', { id });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });
  _keyExtractor = (item) => typeof item === 'string' ? item : String(item.id); 
  _onEndReached = async () => {
    if (!this.props.loading && this.props.nextToken) {
      await this.props.fetchMore(this.props.nextToken);
    }
  };

  _renderItem = ({ item }) => {
    if (typeof item === 'string') return <Unavailable id={item} />;

    const {
      id,
      title,
      category,
      isCancelled,
      allDay,
      cancelledDates,
      isPublic,
      isOwner,
      banner,
      startAt,
      endAt,
      ref_date,
      recurrence,
      venue,
      schedule,
      isConcluded,
      isBookmarked,
      bookmarksCount,
      commentsCount,
      updatedAt
    } = item;

    return (<Item
      id={id}
      title={title}
      status={getStatus({
        isCancelled,
        cancelledDates,
        startAt, endAt, isConcluded
      })}
      startAt={startAt}
      endAt={endAt}
      ref_date={ref_date}
      allDay={allDay}
      pictureUrl={banner && getImageUrl(banner)}
      isBookmarked={isBookmarked}
      isAuth={isPublic || isOwner || (schedule && schedule.isFollowing)}
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
      navigateToBanner={this._navigateToBanner}
      updatedAt={updatedAt}
    />);
  };

  _renderEmptyList = () => <Empty search={this.props.search} error={this.props.error} loading={this.props.loading} />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer loading={this.props.loading} visible={this.props.events.length} />;

  render() {
    const {
      events,
      stores,
      loading
    } = this.props;
    
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={this._onRefresh}
            refreshing={loading}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
          />
        }
        style={stores.appStyles.bookmarkedEventsList.list}
        contentContainerStyle={stores.appStyles.bookmarkedEventsList.contentContainer}
        initialNumToRender={1}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={sortBookmarks(processEvents(events))}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
        onEndReached={this._onEndReached}
      />
    )
  }
}

export default inject("stores")(observer(List));