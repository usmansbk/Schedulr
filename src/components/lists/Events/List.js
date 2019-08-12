import React from 'react';
import { RefreshControl } from 'react-native';
import { SectionList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import throttle from 'lodash.throttle';
import moment from 'moment';
import sectionListGetItemLayout from 'sectionlist-get-itemlayout';
import Header from './Header';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import SectionHeader from './SectionHeader';
import SectionFooter from './SectionFooter';
import Item from './Item';
import {
  getDuration,
  getStatus,
  getTime,
  isPast,
  parseRepeat,
  getCategory,
  isEventValid
} from 'lib/parseItem';
import { eventsChanged } from 'lib/utils';
import {
  generatePreviousEvents,
  generateNextEvents,
} from 'lib/calendr';
import { events } from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT,
  SECTION_HEADER_HEIGHT,
  SECTION_FOOTER_HEIGHT,
  HEADER_HEIGHT,
  FOOTER_HEIGHT
} = events;

const DAYS_PER_PAGE = 3;

class List extends React.Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }
  state = {
    events: [],
    loadingMore: false,
    loadingPrev: false,
    sections: [],
    afterDate: null,
    beforeDate: null
  };

  static defaultProps = {
    loading: false,
    events: [],
    onRefresh: () => null,
  };

  _keyExtractor = (item) => item.id + item.startAt;
  _renderHeader = () => (
    this.state.sections.length ?
    <Header
      hide={this.props.error || !this.state.events.length}
      hasPrev={this.state.beforeDate}
      loading={this.state.loadingPrev}
      onPress={this._onLoadPrevious}
    />
    : null
  );
  _renderFooter = () => (
    this.state.sections.length ?
    <Footer
      hide={(!this.state.afterDate && this.state.sections.length === 1)}
      hasMore={this.state.afterDate}
      onPress={this._onEndReached}
      loading={this.state.loadingMore}
    />
    : null
  );
  _renderEmptyList = () => <Empty
    error={this.props.error && !this.state.events.length}
    loading={this.props.loading}
    onRefresh={this.props.onRefresh}
  />;
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({ section }) => <SectionHeader onPress={this._onPressSectionHeader} section={section} />;
  _renderSectionFooter = ({ section }) => <SectionFooter section={section} />;
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _navigateToScheduleEvents = (id) => {
    let screen = 'Schedule';
    if (this.props.listType === 'schedule') screen = 'ScheduleInfo';
    this.props.navigation.navigate(screen, { id, cacheFirst: true });
  };
  _onPressSectionHeader = (targetDate) => {
    if (!isPast(targetDate)) {
      this.props.navigation.navigate('NewEvent', {
        targetDate
      });
    }
  };
  
  loadPreviousEvents = (events) => {
    if (this.state.beforeDate) {
      this.setState({ loadingPrev: true });
      const prevSections = generatePreviousEvents(events, this.state.beforeDate, DAYS_PER_PAGE);
      const sectionLength = prevSections.length;
      const beforeDate = (sectionLength === DAYS_PER_PAGE) && moment(prevSections[0].title).format();
      const afterDate = (sectionLength) && moment(prevSections[sectionLength - 1].title).format();

      if (sectionLength) {
        this.setState({
          sections: prevSections,
          beforeDate,
          afterDate,
          loadingPrev: false
        });
      } else {
        this.setState({
          beforeDate: false,
          loadingPrev: false
        });
      }
    }
  };

  loadMoreEvents = (events=[]) => {  
    if (this.state.afterDate) {
      this.setState({ loadingMore: true });
      const moreSections = generateNextEvents(events, this.state.afterDate, DAYS_PER_PAGE);
      const sectionLength = moreSections.length;
      const afterDate = (sectionLength === DAYS_PER_PAGE) && moment(moreSections[sectionLength - 1].title).format();

      this.setState(state => {
        return ({
          sections: [...state.sections, ...moreSections],
          afterDate,
          loadingMore: false
        })
      });
    }
  };

  _processEvents = (events) => {
    if (events) {
      const today = moment().startOf('day').format();
      const yesterday = moment().subtract(1, 'day').startOf('day').format();
      let sections = generateNextEvents(events, yesterday, DAYS_PER_PAGE);
      if (!sections.length && events.length) {
        sections = [{ data: [], title: today }];
      }
      const sectionLength = sections.length;
      const afterDate = (sectionLength === DAYS_PER_PAGE) && moment(sections[sectionLength - 1].title).format();
      const beforeDate = sectionLength && moment(sections[0].title).format();
      
      this.setState({
        sections,
        afterDate,
        beforeDate,
        events,
      });
    }
  };
  
  throttleFetchMore = throttle((skipBaseQuery) => skipBaseQuery && this.props.fetchMore(), 60000);

  _onRefresh = () => {
    this._processEvents(this.state.events);
  };
  
  _onEndReached = () => {
    this.loadMoreEvents(this.state.events);
  };

  _onLoadPrevious = () => {
    this.loadPreviousEvents(this.state.events);
  };

  static getDerivedStateFromProps(props, state) {
    if (eventsChanged(state.events, props.events)) {
      const events = props.events;
      const today = moment().startOf('day').format();
      const yesterday = moment().subtract(1, 'day').startOf('day').format();
      let sections = generateNextEvents(events, yesterday, DAYS_PER_PAGE);
      if (!sections.length && events.length) {
        sections = [{ data: [], title: today }];
      }
      const sectionLength = sections.length;
      const afterDate = (sectionLength === DAYS_PER_PAGE) && moment(sections[sectionLength - 1].title).format();
      const beforeDate = sectionLength && moment(sections[0].title).format();

      return {
        sections,
        afterDate,
        beforeDate,
        events
      };
    }
    return null;
  }
  
  componentDidMount = () => {
    this._processEvents(this.props.events);
  };

  
  // shouldComponentUpdate = (nextProps, nextState) => {
  //   return (
  //     Boolean(nextProps.loading) !== Boolean(this.props.loading) ||
  //     this.state.sections !== nextState.sections
  //   );
  // };

  _onScroll = (event) => {
    this.props.handleScroll && this.props.handleScroll(event.nativeEvent.contentOffset.y)
  };

  scrollToTop = () => {
    if (this.state.sections.length) {
      this.listRef.current.scrollToLocation({
        itemIndex: 0,
        sectionIndex: 0,
        viewPosition: SECTION_HEADER_HEIGHT
      });
    }
  };

  _renderItem = ({ item: {
    id,
    title,
    category,
    isCancelled,
    cancelledDates = [],
    startAt,
    endAt,
    recurrence,
    venue,
    schedule,
    allDay,
    isBookmarked,
    bookmarksCount,
    isOwner,
  }}) => (<Item
    id={id}
    title={title}
    startAt={startAt}
    endAt={endAt}
    allDay={allDay}
    category={getCategory(category)}
    recurrence={parseRepeat(recurrence)}
    time={getTime({ allDay, startAt, endAt })}
    status={getStatus({
      isCancelled,
      cancelledDates: cancelledDates || [],
      startAt,
      endAt
    })}
    isValid={isEventValid({
      isCancelled,
      endAt,
      startAt,
      cancelledDates: cancelledDates || []
    })}
    address={venue}
    isMuted={
      this.props.stores.appState.mutedList.includes(id) ||
      (
        !this.props.stores.appState.allowedList.includes(id) &&
        this.props.stores.appState.mutedList.includes(schedule.id)
      )
    }
    eventScheduleId={schedule && schedule.id}
    isBookmarked={isBookmarked}
    bookmarksCount={bookmarksCount}
    isOwner={isOwner}
    duration={getDuration(startAt, endAt, allDay)}
    onPressItem={this._onPressItem}
    onPressCommentButton={this._onPressCommentItem}
    navigateToScheduleEvents={this._navigateToScheduleEvents}
  />);


  _getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => ITEM_HEIGHT,
    getSeparatorHeight: () => SEPARATOR_HEIGHT,
    getSectionHeaderHeight: () => SECTION_HEADER_HEIGHT,
    getSectionFooterHeight: () => SECTION_FOOTER_HEIGHT,
    listHeaderHeight: HEADER_HEIGHT,
    listFooterHeight: FOOTER_HEIGHT
  });

  render() {
    const { loading, stores } = this.props;
    const { sections } = this.state;
  
    return (
      <SectionList
        ref={this.listRef}
        initialNumToRender={0}
        getItemLayout={this._getItemLayout}
        contentContainerStyle={stores.appStyles.eventsList.contentContainer}
        style={stores.appStyles.eventsList.list}
        stickySectionHeadersEnabled
        sections={sections}
        extraData={
          stores.appState.allowedList.length + stores.appState.mutedList.length
        }
        ListHeaderComponent={this._renderHeader}
        ListEmptyComponent={this._renderEmptyList}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={loading}
        onRefresh={this._onRefresh}
        refreshControl={
          <RefreshControl
            onRefresh={this._onRefresh}
            refreshing={loading}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
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

export default inject("stores")(observer(List));
