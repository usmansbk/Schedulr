import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Item from './Item';
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
import { bookmarkedEvents } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const { ITEM_HEIGHT, SEPARATOR_HEIGHT } = bookmarkedEvents;

class List extends Component {
  state = {
    fetchingMore: false
  };

  static defaultProps = {
    events: [],
    loading: false,
    onRefresh: () => null,
    fetchMore: () => null,
  };
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _navigateToInfo = (id) => this.props.navigation.navigate('ScheduleInfo', { id });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });
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
    title,
    category,
    isCancelled,
    isPublic,
    cancelledDates,
    banner,
    startAt,
    endAt,
    ref_date,
    recurrence,
    venue,
    schedule,
    allDay,
    isOwner,
    isConcluded,
    isBookmarked,
    bookmarksCount,
    commentsCount,
  }}) => (<Item
    id={id}
    title={title}
    status={getStatus({
      isCancelled,
      cancelledDates,
      startAt, endAt, isConcluded
    })}
    allDay={allDay}
    pictureUrl={banner && getImageUrl(banner)}
    startAt={startAt}
    endAt={endAt}
    ref_date={ref_date}
    bookmarksCount={bookmarksCount}
    commentsCount={commentsCount}
    isBookmarked={isBookmarked}
    category={getCategory(category)}
    recurrence={parseRepeat(recurrence)}
    isAuth={isPublic || isOwner || (schedule && schedule.isFollowing)}
    time={getHumanTime({ allDay, startAt, endAt })}
    scheduleId={schedule && schedule.id}
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
      nextToken,
      loading,
      onRefresh,
      stores
    } = this.props;
    const { fetchingMore } = this.state;

    const styles = stores.appStyles.bookmarkedEventsList;
    const colors = stores.themeStore.colors;

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading && !fetchingMore}
            colors={[colors.primary]}
            progressBackgroundColor={colors.bg}
          />
        }
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={1}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={events}
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