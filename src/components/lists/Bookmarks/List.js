import React, {Component} from 'react';
import {FlatList} from 'react-navigation';
import {RefreshControl} from 'react-native';
import {inject, observer} from 'mobx-react';
import Item from './Item';
import Header from './Header';
import Unavailable from './Unavailable';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import {parseRepeat, getCategory} from 'lib/formatEvent';
import {getDuration, getHumanTime} from 'lib/time';
import {bookmarkedEvents} from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const {ITEM_HEIGHT, SEPARATOR_HEIGHT} = bookmarkedEvents;

class List extends Component {
  static defaultProps = {
    events: [],
    loading: false,
    onRefresh: () => null,
  };
  state = {
    loadingPrev: false,
  };
  _getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
    index,
  });

  _onRefresh = () => this.props.onRefresh();
  _onPressItem = (id, from) =>
    this.props.navigation.navigate('EventDetails', {id, from});
  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', {id});
  _keyExtractor = (item) => (typeof item === 'string' ? item : String(item.id));
  _onEndReached = async () => {
    if (!this.props.loading && this.props.nextToken) {
      await this.props.fetchMore(this.props.nextToken);
    }
  };
  _fetchMore = () => (this.timer = setTimeout(this._fetchPastEvents, 0));

  _fetchPastEvents = async () => {
    const {loading, fetchPastEvents, nextToken, pastEventsCount} = this.props;
    if (fetchPastEvents && !loading && pastEventsCount > 0) {
      this.setState({loadingPrev: true});
      await fetchPastEvents(nextToken);
      this.setState({loadingPrev: false});
    }
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  _renderItem = ({item}) => {
    if (typeof item === 'string') return <Unavailable id={item} />;

    const {
      id,
      title,
      category,
      allDay,
      cancelledDates,
      isCancelled,
      isPublic,
      isOwner,
      banner,
      startAt,
      endAt,
      until,
      recurrence,
      schedule,
      isBookmarked,
      updatedAt,
    } = item;

    return (
      <Item
        id={id}
        title={title}
        startAt={startAt}
        endAt={endAt}
        allDay={allDay}
        isCancelled={isCancelled}
        cancelledDates={cancelledDates}
        until={until}
        pictureUrl={banner && getImageUrl(banner)}
        isBookmarked={isBookmarked}
        isAuth={isPublic || isOwner || (schedule && schedule.isFollowing)}
        category={getCategory(category)}
        recurrence={parseRepeat(recurrence)}
        time={getHumanTime({allDay, startAt, endAt})}
        eventScheduleId={schedule && schedule.id}
        duration={getDuration(startAt, endAt, allDay)}
        onPressItem={this._onPressItem}
        navigateToBanner={this._navigateToBanner}
        updatedAt={updatedAt}
      />
    );
  };

  _renderEmptyList = () => (
    <Empty
      isBookmarks={this.props.isBookmarks}
      error={this.props.error}
      loading={this.props.loading}
    />
  );
  _renderSeparator = () => <Separator />;
  _renderFooter = () => (
    <Footer loading={this.props.loading} visible={this.props.events.length} />
  );
  _renderHeader = () =>
    this.props.pastEventsCount > 0 ? (
      <Header
        onPress={this._fetchMore}
        loading={this.props.loading && this.state.loadingPrev}
        count={this.props.pastEventsCount}
      />
    ) : null;

  render() {
    const {events, stores, loading} = this.props;

    return (
      <FlatList
        data={events}
        refreshControl={
          <RefreshControl
            onRefresh={this._onRefresh}
            refreshing={loading}
            colors={[stores.theme.colors.primary]}
            progressBackgroundColor={stores.theme.colors.bg}
          />
        }
        style={stores.styles.bookmarkedEventsList.list}
        contentContainerStyle={
          stores.styles.bookmarkedEventsList.contentContainer
        }
        initialNumToRender={1}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
        ListHeaderComponent={this._renderHeader}
        onEndReached={this._onEndReached}
      />
    );
  }
}

export default inject('stores')(observer(List));
