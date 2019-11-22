import React, {Component} from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import Header from './Header';
import Item from 'components/lists/Bookmarks/Item';
import AdItem from './AdItem';
import Separator from 'components/lists/Bookmarks/Separator';
import Footer from 'components/lists/Bookmarks/Footer';
import {
  parseRepeat,
  getStatus,
  getCategory
} from 'lib/parseItem';
import {
  getDuration,
  getHumanTime
} from 'lib/time';
import { bookmarkedEvents, MEDIUM_RECTANGLE } from 'lib/constants';
import { injectMediumRectAd } from 'lib/utils';
import getImageUrl from 'helpers/getImageUrl';

const { ITEM_HEIGHT, SEPARATOR_HEIGHT } = bookmarkedEvents;

class List extends Component{
  static defaultProps = {
    data: [],
    loading: false,
    error: false,
    onRefresh: () => null
  };

  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', { id });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });

  _getItemLayout = (_, index) => {
    let length = ITEM_HEIGHT;
    if (index === 2) length = MEDIUM_RECTANGLE; // Medium Rectangle Size ad 
    return (
      {
        length,
        offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
        index
      }
    );
  };

  _renderEmptyList = () => <Empty />;

  _renderHeader = () => <Header
    onPressLocationButton={this.props.onPressLocationButton}
    navigation={this.props.navigation}
  />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.data.length} />;

  _renderItem = ({ item }) => {
    const {
      __typename,
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
    if (__typename === 'Advert') return <AdItem />;

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

  _onRefresh = () => this.props.onRefresh();

  render() {
    const styles = this.props.stores.appStyles.discover;
    let data = this.props.data;
    if (data.length >= 2) data = injectMediumRectAd(data);

    console.log(this.props.loading);
    return (
      <FlatList
        style={styles.list}
        refreshControl={
          <RefreshControl
            progressViewOffset={80}
            onRefresh={this._onRefresh}
            refreshing={this.props.loading}
            colors={[this.props.stores.themeStore.colors.primary]}
            progressBackgroundColor={this.props.stores.themeStore.colors.bg}
          />
        }
        data={data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
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
