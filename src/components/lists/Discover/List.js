import React, {Component} from 'react';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import Header from './Header';
import Item from 'components/lists/Bookmarks/Item';
import {
  parseRepeat,
  getStatus,
  getCategory
} from 'lib/parseItem';
import {
  getDuration,
  getHumanTime
} from 'lib/time';
import { bookmarkedEvents } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const { ITEM_HEIGHT, SEPARATOR_HEIGHT } = bookmarkedEvents;

class List extends Component{
  static defaultProps = {
    data: [],
    loading: false,
    error: false
  };

  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );

  _renderEmptyList = () => <Empty />;

  _renderHeader = () => <Header navigation={this.props.navigation} />;

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

  componentDidMount = async () => await this.props.stores.locationStore.fetchLocation(true);

  _keyExtractor = (item) => item.id; 

  render() {
    const styles = this.props.stores.appStyles.discover;

    return (
      <FlatList
        style={styles.list}
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
        ListHeaderComponent={this._renderHeader}
        initialNumToRender={5}
        getItemLayout={this._getItemLayout}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainer}
      />
    )
  }
}

export default inject("stores")(observer(List));
