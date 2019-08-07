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
import { eventsChanged } from 'lib/utils';
import { schedule_events } from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = schedule_events;

class List extends Component {
  state = {
    loadingPrev: false,
    hasPrev: true
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
  shouldComponentUpdate = (nextProps, nextState) => { 
    return (nextProps.navigation.isFocused() &&
      (
        nextProps.loading !== this.props.loading ||
        eventsChanged(this.props.events, nextProps.events) ||
        this.state.loadingPrev !== nextState.loadingPrev ||
        this.state.hasPrev !== nextState.hasPrev
      )
    );
  };
  _onPressItem = (id, refStartAt, refEndAt) => (
    this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt }));
  _keyExtractor = (item) => String(item.id);

  _renderItem = ({ item: {
    id,
    title,
    category,
    startAt,
    endAt,
    repeat,
    schedule,
    allDay,
    isConcluded,
    isCancelled,
    cancelledDates,
  }}) => (<Item
    id={id}
    title={title}
    startAt={startAt}
    endAt={endAt}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt, isConcluded})}
    category={getCategory(category)}
    repeat={parseRepeat(repeat)}
    time={getHumanTime({ allDay, startAt, endAt })}
    scheduleId={schedule && schedule.id}
    duration={getDuration(startAt, endAt, allDay)}
    onPressItem={this._onPressItem}
  />);

  _renderEmptyList = () => <Empty error={this.props.error} loading={this.props.loading} />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer
    onPress={this._fetchPastEvents}
    loading={this.props.loading && this.state.loadingPrev}
    hasPrev={this.state.hasPrev}
  />;

  _fetchPastEvents = async () => {
    const { loading, nextToken, fetchPastEvents, events } = this.props;
    if (fetchPastEvents && !loading) {
      const sorted = events.sort((a, b) => a.raw_startAt - b.raw_startAt);
      const lastEvent = sorted[0];
      const lastDate = lastEvent && lastEvent.raw_startAt;
      this.setState({ loadingPrev: true });
      await fetchPastEvents(nextToken, lastDate);
      this.setState({ loadingPrev: false });
    }
  };

  render() {
    const {
      events,
      loading,
      onRefresh,
      stores
    } = this.props;
    const { loadingPrev } = this.state;

    const colors = stores.themeStore.colors;
    const styles = stores.appStyles.scheduleEvents;

    return (
      <FlatList
        refreshing={loading && !loadingPrev}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading && !loadingPrev}
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
        data={events}
        renderItem={this._renderItem}
        // onEndReached={this._fetchPastEvents}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

const withStores = inject("stores")(observer(List));
export default withNavigationFocus(withStores);