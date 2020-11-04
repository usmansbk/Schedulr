import React from 'react';
import {RefreshControl} from 'react-native';
import {SectionList} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import uuidv5 from 'uuid/v5';
import sectionListGetItemLayout from 'sectionlist-get-itemlayout';
import Header from './Header';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import SectionHeader from './SectionHeader';
import SectionFooter from './SectionFooter';
import Item from './Item';
import {isPastDate, tick} from 'lib/time';
import {eventsChanged} from 'lib/utils';
import {EventSectionGenerator} from 'lib/calendar';
import {events} from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT,
  SECTION_HEADER_HEIGHT,
  SECTION_FOOTER_HEIGHT,
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
} = events;

class List extends React.Component {
  static defaultProps = {
    loading: false,
    events: [],
    onRefresh: () => null,
    finite: false,
  };

  state = {
    events: [],
    sections: [],
    loadingMore: false,
    loadingPrev: false,
    afterDate: null,
    beforeDate: null,
  };

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      this.props.loading !== nextProps.loading ||
      this.state.sections !== nextState.sections ||
      this.state.loadingMore !== nextState.loadingMore ||
      this.state.loadingPrev !== nextState.loadingPrev
    );
  };

  UNSAFE_componentWillReceiveProps = (nextProps) =>
    this._processEvents(nextProps.events);

  componentDidMount = () => this._processEvents(this.props.events);

  _keyExtractor = (item) => item.id;

  _renderHeader = () =>
    this.state.sections.length && this.props.isAuth ? (
      <Header
        hide={this.props.error || !this.state.events.length}
        beforeDate={this.state.beforeDate}
        loading={this.state.loadingPrev}
        onPress={this._onLoadPrevious}
      />
    ) : null;

  _renderFooter = () =>
    this.state.sections.length ? (
      <Footer
        hide={!this.state.afterDate && this.state.sections.length === 1}
        hasMore={this.state.afterDate}
        onPress={this._onEndReached}
        loading={this.state.loadingMore}
      />
    ) : null;

  _renderEmptyList = () => (
    <Empty
      error={this.props.error && !this.state.events.length}
      loading={this.props.loading}
      onRefresh={this.props.onRefresh}
      isAuth={this.props.isAuth}
    />
  );

  _renderSeparator = () => <Separator />;

  _renderSectionHeader = ({section}) => (
    <SectionHeader onPress={this._onPressSectionHeader} section={section} />
  );

  _renderSectionFooter = ({section}) => <SectionFooter section={section} />;

  _renderItem = ({item, section}) => {
    const {
      __typename,
      id,
      title,
      category,
      cancelledDates,
      startAt,
      endAt,
      until,
      updatedAt,
      recurrence,
      banner,
      venue,
      schedule,
      allDay,
      isCancelled,
      isBookmarked,
      isOwner,
      isOffline,
    } = item;

    return (
      <Item
        id={id}
        title={title}
        startAt={startAt}
        endAt={endAt}
        until={until}
        from={section.title}
        category={category}
        isCancelled={isCancelled}
        cancelledDates={cancelledDates}
        recurrence={recurrence}
        banner={banner}
        allDay={allDay}
        address={venue}
        isMuted={this.props.stores.appState.isEventMuted(id, schedule.id)}
        eventScheduleId={schedule && schedule.id}
        isBookmarked={isBookmarked}
        isOwner={isOwner}
        isOffline={isOffline}
        onPressItem={this._onPressItem}
        navigateToBanner={this._navigateToBanner}
        navigateToCalendarEvent={this._navigateToCalendarEvent}
        timerTick={tick(startAt, endAt)}
        __typename={__typename}
        updatedAt={updatedAt}
      />
    );
  };

  _onPressItem = (id, from) =>
    this.props.navigation.navigate('EventDetails', {id, from});

  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', {id});

  _navigateToCalendarEvent = (id) =>
    this.props.navigation.navigate('CalendarEvent', {id});

  _onPressSectionHeader = (targetDate) => {
    let id = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    if (this.props.isOwner && this.props.id) {
      id = this.props.id;
    }
    if (!isPastDate(targetDate, true)) {
      this.props.navigation.navigate('NewEvent', {
        targetDate,
        eventScheduleId: id,
      });
    }
  };

  loadPreviousEvents = () => {
    if (this.state.beforeDate) {
      this.setState({loadingPrev: true});
      this.prevTimer = setTimeout(() => {
        const result = this.state.prevIterator.next(this.state.beforeDate);
        if (!result.done) {
          const {nextToken: beforeDate, items} = result.value;
          // const sections = items.concat(this.state.sections);
          const sections = items;
          this.setState(
            {
              sections,
              beforeDate,
              loadingPrev: false,
            },
            () => {
              if (this.prevTimer) {
                clearTimeout(this.prevTimer);
              }
            },
          );
        } else {
          this.setState(
            {
              loadingPrev: false,
              beforeDate: null,
            },
            () => {
              if (this.prevTimer) {
                clearTimeout(this.prevTimer);
              }
            },
          );
        }
      }, 0);
    }
  };

  loadMoreEvents = () => {
    if (this.state.afterDate) {
      this.setState({loadingMore: true});
      this.moreTimer = setTimeout(() => {
        const result = this.state.nextIterator.next(this.state.afterDate);
        if (!result.done) {
          const {items, nextToken: afterDate} = result.value;
          // const length = this.state.sections.length;
          // const sections =
          //   length < 20 ? this.state.sections.concat(items) : items;
          const sections = this.state.sections.concat(items);
          this.setState(
            {
              sections,
              afterDate,
              loadingMore: false,
            },
            () => {
              if (this.moreTimer) {
                clearTimeout(this.moreTimer);
              }
            },
          );
        } else {
          this.setState(
            {
              loadingMore: false,
              afterDate: null,
            },
            () => {
              if (this.moreTimer) {
                clearTimeout(this.moreTimer);
              }
            },
          );
        }
      }, 0);
    }
  };

  _processEvents(events, forceUpdate) {
    if (forceUpdate || eventsChanged(events, this.state.events)) {
      const nextIterator = EventSectionGenerator(events, false);
      const prevIterator = EventSectionGenerator(events, true);
      let result = nextIterator.next();
      if (!result.done) {
        const {items, nextToken} = result.value;
        this.setState({
          nextIterator,
          prevIterator,
          sections: items,
          afterDate: nextToken,
          beforeDate: nextToken,
          events,
        });
      }
    }
  }

  _onRefresh = () => {
    this._processEvents(this.state.events, true);
    this.props.fetchMore && this.props.fetchMore();
  };

  _onEndReached = () => {
    this.loadMoreEvents(this.state.events);
  };

  _onLoadPrevious = () => {
    this.loadPreviousEvents(this.state.events);
  };

  _onScroll = (event) => {
    this.props.handleScroll &&
      this.props.handleScroll(event.nativeEvent.contentOffset.y);
  };

  scrollToTop = () => {
    if (this.state.sections.length) {
      this.listRef.current.scrollToLocation({
        itemIndex: 0,
        sectionIndex: 0,
        viewPosition: SECTION_HEADER_HEIGHT,
      });
    }
  };

  _getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => ITEM_HEIGHT,
    getSeparatorHeight: () => SEPARATOR_HEIGHT,
    getSectionHeaderHeight: () => SECTION_HEADER_HEIGHT,
    getSectionFooterHeight: () => SECTION_FOOTER_HEIGHT,
    listHeaderHeight: HEADER_HEIGHT,
    listFooterHeight: FOOTER_HEIGHT,
  });

  render() {
    const {stores, loading} = this.props;
    const {sections} = this.state;

    return (
      <SectionList
        ref={this.listRef}
        initialNumToRender={1}
        getItemLayout={this._getItemLayout}
        contentContainerStyle={stores.styles.eventsList.contentContainer}
        style={stores.styles.eventsList.list}
        stickySectionHeadersEnabled
        sections={sections}
        extraData={stores.appState.extraData}
        ListHeaderComponent={this._renderHeader}
        ListEmptyComponent={this._renderEmptyList}
        ItemSeparatorComponent={this._renderSeparator}
        refreshControl={
          <RefreshControl
            onRefresh={this._onRefresh}
            refreshing={loading}
            colors={[stores.theme.colors.primary]}
            progressBackgroundColor={stores.theme.colors.bg}
          />
        }
        scrollEventThrottle={16}
        onScroll={this._onScroll}
        onEndReachedThreshold={0.5}
        onEndReached={this._onEndReached}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        renderSectionFooter={this._renderSectionFooter}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}

export default inject('stores')(observer(List));
