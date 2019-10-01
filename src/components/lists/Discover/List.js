import React, {Component} from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import Header from './Header';
import Item from 'components/lists/Bookmarks/Item';
import Separator from 'components/lists/Bookmarks/Separator';
import {
  parseRepeat,
  getStatus,
  getCategory
} from 'lib/parseItem';
import {
  getDuration,
  getHumanTime
} from 'lib/time';
import { processEvents } from 'lib/calendr';
import { bookmarkedEvents } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const { ITEM_HEIGHT, SEPARATOR_HEIGHT } = bookmarkedEvents;

class List extends Component{
  static defaultProps = {
    data: [],
    loading: false,
    error: false
  };

  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', { id });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });
  // _onEndReached = async () => {
  //   if (!this.props.loading && this.props.nextToken) {
  //     await this.props.fetchMore(this.props.nextToken);
  //   }
  // };

  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );

  _renderEmptyList = () => <Empty />;

  _renderHeader = () => <Header navigation={this.props.navigation} />;
  _renderSeparator = () => <Separator />;

  _renderItem = ({ item }) => {
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
      recurrence,
      venue,
      schedule,
      isConcluded,
      isBookmarked,
      bookmarksCount,
      commentsCount
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
    />);
  };

  _keyExtractor = (item) => item.id;

  _onRefresh = () => this.props.refresh();

  render() {
    const styles = this.props.stores.appStyles.discover;

    return (
      <FlatList
        style={styles.list}
        refreshControl={
          <RefreshControl
            onRefresh={this._onRefresh}
            refreshing={this.props.loading}
            colors={[this.props.stores.themeStore.colors.primary]}
            progressBackgroundColor={this.props.stores.themeStore.colors.bg}
          />
        }
        data={processEvents(this.props.data)}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
        ListHeaderComponent={this._renderHeader}
        initialNumToRender={5}
        getItemLayout={this._getItemLayout}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainer}
        onEndReached={this._onEndReached}
        ItemSeparatorComponent={this._renderSeparator}
      />
    )
  }
}

export default inject("stores")(observer(List));
