import React from 'react';
import { RefreshControl } from 'react-native';
import { SectionList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import uuidv5 from 'uuid/v5';
import sectionListGetItemLayout from 'sectionlist-get-itemlayout';
import Header from './Header';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import SectionHeader from './SectionHeader';
import SectionFooter from './SectionFooter';
import Item from './Item';
import {
  getStatus,
  parseRepeat,
  getCategory,
  isEventValid
} from 'lib/parseItem';
import {
  getDuration,
  getTime,
  isPast
} from 'lib/time';
import { eventsChanged } from 'lib/utils';
import {
  generatePreviousEvents,
  generateNextEvents,
} from 'lib/calendr';
import { events } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

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

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      this.props.loading !== nextProps.loading ||
      this.props.updateListEveryMinute !== nextProps.updateListEveryMinute ||
      this.state.sections !== nextState.sections ||
      this.state.afterDate !== nextState.afterDate ||
      this.state.beforeDate !== nextState.beforeDate ||
      this.state.loadingMore !== nextState.loadingMore ||
      this.state.loadingPrev !== nextState.loadingPrev
    );
  };

  _keyExtractor = (item) => item.id + item.ref_date;
  _renderHeader = () => (
    (this.state.sections.length && this.props.isAuth) ?
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
    isAuth={this.props.isAuth}
  />;
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({ section }) => <SectionHeader onPress={this._onPressSectionHeader} section={section} />;
  _renderSectionFooter = ({ section }) => <SectionFooter section={section} />;
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', { id });
  _navigateToCalendarEvent = (id) => this.props.navigation.navigate('CalendarEvent', { id });
  _onPressSectionHeader = (targetDate) => {
    let id = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    if (this.props.isOwner && this.props.id) {
      id = this.props.id;
    } 
    if (!isPast(targetDate)) {
      this.props.navigation.navigate('NewEvent', {
        targetDate,
        eventScheduleId : id
      });
    }
  };
  
  loadPreviousEvents = (events) => {
    if (this.state.beforeDate) {
      this.setState({ loadingPrev: true });
      setTimeout(() => {
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
      }, 0);
    }
  };

  loadMoreEvents = (events=[]) => {  
    if (this.state.afterDate) {
      this.setState({ loadingMore: true });
      setTimeout(() => {
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
      }, 0);
    }
  };

  _processEvents = (events) => {
    if (events) {
      const today = moment().startOf('day').toISOString();
      const yesterday = moment().subtract(1, 'day').startOf('day').toISOString();
      let sections = generateNextEvents(events, yesterday, DAYS_PER_PAGE);
      const todaysSection = sections.find(section => section.title === today);
      if (!todaysSection) {
        sections = [{ data: [], title: today }, ...sections];
      }
      const afterDate = moment(sections[sections.length - 1].title).toISOString();
      const beforeDate = moment(sections[0].title).toISOString();
      
      this.setState({
        sections,
        afterDate,
        beforeDate,
        events,
      });
    }
  };
  
  _onRefresh = () => {
    this._processEvents(this.state.events);
    this.props.fetchMore && this.props.fetchMore();
  };
  
  _onEndReached = () => {
    this.loadMoreEvents(this.state.events);
  };

  _onLoadPrevious = () => {
    this.loadPreviousEvents(this.state.events);
  };

  static getDerivedStateFromProps(props, state) {
    let events = props.events;
    if (eventsChanged(state.events, events)) {
      const today = moment().startOf('day').toISOString();
      const yesterday = moment().subtract(1, 'day').endOf('day').toISOString();
      let sections = generateNextEvents(events, yesterday, DAYS_PER_PAGE);
      const todaysSection = sections.find(section => section.title === today);
      if (!todaysSection) {
        sections = [{ data: [], title: today }, ...sections];
      }
      const afterDate = moment(sections[sections.length- 1].title).toISOString();
      const beforeDate = moment(sections[0].title).toISOString();

      return {
        sections,
        afterDate,
        beforeDate,
        events
      };
    }
    return null;
  }

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
    __typename,
    id,
    title,
    category,
    isCancelled,
    cancelledDates,
    startAt,
    endAt,
    recurrence,
    banner,
    venue,
    schedule,
    allDay,
    isBookmarked,
    bookmarksCount,
    isOwner,
    isOffline,
    ref_date,
    isExtended
  }}) => (<Item
    id={id}
    title={title}
    startAt={startAt}
    endAt={endAt}
    ref_date={ref_date}
    isExtended={isExtended}
    allDay={allDay}
    pictureUrl={banner && getImageUrl(banner)}
    category={getCategory(category)}
    recurrence={parseRepeat(recurrence)}
    time={getTime({
      isExtended,
      allDay,
      startAt,
      endAt
    })}
    status={getStatus({
      isCancelled,
      cancelledDates,
      startAt,
      endAt
    })}
    isValid={isEventValid({
      isCancelled,
      endAt,
      startAt,
      cancelledDates
    })}
    address={venue}
    isMuted={this.props.stores.appState.isEventMuted(id, schedule.id)}
    eventScheduleId={schedule && schedule.id}
    isBookmarked={isBookmarked}
    bookmarksCount={bookmarksCount}
    isOwner={isOwner}
    isOffline={isOffline}
    duration={getDuration(startAt, endAt, allDay)}
    onPressItem={this._onPressItem}
    onPressCommentButton={this._onPressCommentItem}
    navigateToBanner={this._navigateToBanner}
    navigateToCalendarEvent={this._navigateToCalendarEvent}
    __typename={__typename}
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
    const { stores, loading } = this.props;
    const { sections } = this.state;

    return (
      <SectionList
        ref={this.listRef}
        initialNumToRender={1}
        getItemLayout={this._getItemLayout}
        contentContainerStyle={stores.appStyles.eventsList.contentContainer}
        style={stores.appStyles.eventsList.list}
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
