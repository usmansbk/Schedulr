import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Item from './Item';
import Separator from './Separator';
import Footer from 'components/lists/Events/Footer';
import Header from './Header';
import Empty from './Empty';
import { eventsChanged } from 'lib/utils';
import { schedule_events } from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = schedule_events;

class List extends Component {
  state = {
    loadingPrev: false
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
    return (nextProps.isFocused &&
      (
        nextProps.loading !== this.props.loading ||
        eventsChanged(this.props.events, nextProps.events) ||
        this.state.loadingPrev !== nextState.loadingPrev
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
    recurrence,
    schedule,
    allDay,
    banner,
    isConcluded,
    isCancelled,
    cancelledDates,
    updatedAt
  }}) => (<Item
    id={id}
    title={title}
    startAt={startAt}
    endAt={endAt}
    banner={banner}
    isCancelled={isCancelled}
    cancelledDates={cancelledDates}
    isConcluded={isConcluded}
    allDay={allDay}
    recurrence={recurrence}
    category={category}
    scheduleId={schedule && schedule.id}
    onPressItem={this._onPressItem}
    updatedAt={updatedAt}
  />);

  _renderEmptyList = () => <Empty
    error={this.props.error}
    loading={this.props.loading}
    isAuth={this.props.isAuth}
  />;
  _renderSeparator = () => <Separator />;
  _renderHeader = () => (this.props.pastEventsCount > 0 && this.props.isAuth) ? <Header
    onPress={this._fetchMore}
    loading={this.props.loading && this.state.loadingPrev}
    count={this.props.pastEventsCount}
  /> : null;
  _renderFooter = () => this.props.events.length ? <Footer /> : null;

  _fetchMore = () => setTimeout(this._fetchPastEvents, 0);

  _fetchPastEvents = async () => {
    const { loading, fetchPastEvents, nextToken, pastEventsCount } = this.props;
    if (fetchPastEvents && !loading && (pastEventsCount > 0)) {
      this.setState({ loadingPrev: true });
      await fetchPastEvents(nextToken);
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
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading && !loadingPrev}
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
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

const withStores = inject("stores")(observer(List));
export default withNavigationFocus(withStores);