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
  getEventType,
  isEventValid
} from 'lib/parseItem';
import { eventsDiff } from 'lib/utils';
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

@inject('stores')
@observer
export default class List extends React.Component {

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
  _navigateToBoardEvents = (id) => {
    let screen = 'Board';
    if (this.props.listType === 'board') screen = 'BoardInfo';
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

  _bootstrap = (events) => {
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
    this._bootstrap(this.state.events);
    this.props.fetchMore && !this.props.loading &&
      this.throttleFetchMore(this.props.stores.deltaSync.skipBaseQuery);
  };
  
  _onEndReached = () => {
    this.loadMoreEvents(this.state.events);
  };

  _onLoadPrevious = () => {
    this.loadPreviousEvents(this.state.events);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.events.length !== this.props.events.length ||
      (eventsDiff(this.props.events, nextProps.events).length)) {
      this._bootstrap(nextProps.events);
    }
  };

  componentDidMount = () => {
    this._bootstrap(this.props.events);
  };

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
    eventType,
    isCancelled,
    cancelledDates,
    startAt,
    endAt,
    repeat,
    venue,
    board,
    allDay,
    isStarred,
    starsCount,
    isAuthor
  }}) => (<Item
    id={id}
    title={title}
    startAt={startAt}
    endAt={endAt}
    allDay={allDay}
    eventType={getEventType(eventType)}
    repeat={parseRepeat(repeat)}
    time={getTime({ allDay, startAt, endAt })}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt})}
    isValid={isEventValid({ isCancelled, endAt, startAt, cancelledDates })}
    address={venue}
    boardId={board && board.id}
    isStarred={isStarred}
    starsCount={starsCount}
    isAuthor={isAuthor}
    isMuted={
      this.props.stores.appState.mutedList.includes(id) ||
      (board && this.props.stores.appState.mutedList.includes(board.id)) &&
      !this.props.stores.appState.allowedList.includes(id)
    }
    duration={getDuration(startAt, endAt, allDay)}
    onPressItem={this._onPressItem}
    onPressCommentButton={this._onPressCommentItem}
    navigateToBoardEvents={this._navigateToBoardEvents}
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
    const styles = stores.appStyles.eventsList;

    const mutedList = stores.appState.mutedList;
    const allowedList = stores.appState.allowedList;

    const extraData = mutedList.length - allowedList.length;

    return (
      <SectionList
        ref={this.listRef}
        initialNumToRender={0}
        getItemLayout={this._getItemLayout}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        stickySectionHeadersEnabled
        sections={sections}
        extraData={extraData}
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
