import React from 'react';
import { RefreshControl } from 'react-native';
import { SectionList } from 'react-navigation';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { inject, observer } from 'mobx-react/native';
import moment from 'moment';
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
  isEventValid
} from 'lib/parseItem';
import { eventsDiff } from 'lib/utils';
import { decapitalize } from 'lib/capitalizr';
import {
  getNextEvents,
  getPreviousEvents,
  hasPreviousEvents,
  hasMoreEvents
} from 'lib/calendr';
import { events } from 'lib/constants';

const DAYS_PER_PAGE = 3;

const {
  ITEM_HEIGHT,
  SEPERATOR_HEIGHT,
  SECTION_HEADER_HEIGHT,
  SECTION_FOOTER_HEIGHT,
  HEADER_HEIGHT,
} = events;

@inject('stores')
@observer
export default class List extends React.Component {

  state = {
    events: [],
    previousDate: null,
    beforeDate: null,
    afterDate: null,
    loadingMore: false,
    loadingPrev: false,
    hasMore: null,
    hasPrev: null,
    sections: [],
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
      hasPrev={this.state.hasPrev}
      loading={this.state.loadingPrev}
      onPress={this._onLoadPrevious}
    />
    : null
  );
  _renderFooter = () => (
    this.state.sections.length ?
    <Footer
      hasMore={this.state.hasMore}
      onPress={this._onEndReached}
      loading={this.state.loadingMore}
    />
    : null
  );
  _renderEmptyList = () => <Empty error={this.props.error} loading={this.props.loading} />;
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({ section }) => <SectionHeader onPress={this._onPressSectionHeader} section={section} />;
  _renderSectionFooter = ({ section }) => <SectionFooter section={section} />;
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _navigateToBoardEvents = (id) => {
    let screen = 'BoardEvents';
    if (this.props.listType === 'board') screen = 'BoardInfo';
    this.props.navigation.navigate(screen, { id, cacheFirst: true })
  };
  _onPressSectionHeader = (targetDate) => {
    if (!isPast(targetDate)) {
      this.props.navigation.navigate('NewEvent', {
        targetDate
      });
    }
  };
  
  _refreshList = (events) => {
    if (this.state.previousDate) {
      const nextDate = moment(this.state.previousDate).subtract(DAYS_PER_PAGE + 1, 'days').toISOString();
      const sections = getNextEvents(events, nextDate, DAYS_PER_PAGE);
      const sectionLength = sections.length;
      const afterDate = (sectionLength === DAYS_PER_PAGE) && moment(sections[sectionLength - 1].title).format();
      const beforeDate = (sectionLength) && moment(sections[0].title).format();
      
      this.setState({
        sections,
        afterDate,
        beforeDate,
        hasPrev: hasPreviousEvents(events, beforeDate),
        hasMore: hasMoreEvents(events, afterDate),
        events
      });
    } else {
      this._bootstrap(events);
    }
  }
  
  loadPreviousEvents = (events) => {
    if (this.state.hasPrev) {
      this.setState({ loadingPrev: true });
      const previousDate = this.state.beforeDate;
      const prevSections = getPreviousEvents(events, this.state.beforeDate, DAYS_PER_PAGE);
      if (prevSections.length) {
        const beforeDate = prevSections[0].title;
        const afterDate = prevSections[DAYS_PER_PAGE - 1].title;
        
        this.setState({
          sections: prevSections,
          beforeDate,
          afterDate,
          loadingPrev: false,
          hasPrev: hasPreviousEvents(events, beforeDate),
          hasMore: hasMoreEvents(events, afterDate),
          previousDate
        });
      } else {
        this.setState({
          loadingPrev: false,
          hasPrev: false
        });
      }
    }
  };

  loadMoreEvents = (events=[]) => {
    if (this.state.hasMore) {
      this.setState({ loadingMore: true });
      const previousDate = this.state.afterDate;
      const moreSections = getNextEvents(events, this.state.afterDate, DAYS_PER_PAGE);
      const afterDate = moreSections[DAYS_PER_PAGE - 1].title;
      this.setState({
        sections: [...this.state.sections, ...moreSections],
        afterDate,
        loadingMore: false,
        hasMore: hasMoreEvents(events, afterDate),
        previousDate
      });
    }
  };

  _bootstrap = (events) => {
    if (events) {
      const yesterday = moment().subtract(1, 'day').startOf('day').format();
      const today = moment().startOf('day').format();
      const sections = getNextEvents(events, yesterday, DAYS_PER_PAGE);
      if (sections.length) {
        const beforeDate = today;
        const afterDate = sections[sections.length - 1].title;
        this.setState({
          events,
          sections,
          afterDate,
          beforeDate,
          hasPrev: hasPreviousEvents(events, beforeDate),
          hasMore: hasMoreEvents(events, afterDate)
        });
      }
    }  
  };

  _onRefresh = () => {
    this._bootstrap(this.state.events);
    this.props.onRefresh();
  };

  _onLoadPrevious = () => {
    this.loadPreviousEvents(this.state.events);
  }
  
  _onEndReached = () => {
    this.loadMoreEvents(this.state.events);
  };

  componentWillReceiveProps = (nextProps) => {
    if ((nextProps.events.length !== this.props.events.length) ||
        (eventsDiff(this.props.events, nextProps.events).length)) {
      this._bootstrap(nextProps.events);
    }
  };

  componentDidMount = () => {
    this._bootstrap(this.props.events);
  };

  _renderItem = ({ item: {
    id,
    title,
    eventType,
    isCancelled,
    cancelledDates,
    venue,
    startAt,
    endAt,
    repeat,
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
    eventType={decapitalize(eventType)}
    repeat={parseRepeat(repeat)}
    time={getTime({ allDay, startAt, endAt })}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt})}
    isValid={isEventValid({ isCancelled, endAt, startAt, cancelledDates })}
    isStarred={isStarred}
    starsCount={starsCount}
    isAuthor={isAuthor}
    isMuted={
      this.props.stores.appState.mutedList.includes(id) ||
      this.props.stores.appState.mutedList.includes(board.id) &&
      !this.props.stores.appState.allowedList.includes(id)
    }
    boardId={board.id}
    address={venue && venue.address}
    duration={getDuration(startAt, endAt, allDay)}
    onPressItem={this._onPressItem}
    onPressCommentButton={this._onPressCommentItem}
    navigateToBoardEvents={this._navigateToBoardEvents}
  />);

  _getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => ITEM_HEIGHT,
    getSeparatorHeight: () => SEPERATOR_HEIGHT,
    getSectionHeaderHeight: () => SECTION_HEADER_HEIGHT,
    getSectionFooterHeight: () => SECTION_FOOTER_HEIGHT,
    listHeaderHeight: () => HEADER_HEIGHT,
  });

  render() {
    const { loading, stores } = this.props;
    const { sections, loadingMore, loadingPrev } = this.state;
    const styles = stores.appStyles.eventsList;

    const mutedList = stores.appState.mutedList;
    const allowedList = stores.appState.allowedList;

    const extraData = mutedList.length - allowedList.length;

    return (
      <SectionList
        initialNumToRender={0}
        // getItemLayout={this._getItemLayout}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        stickySectionHeadersEnabled
        sections={sections}
        extraData={extraData}
        ListHeaderComponent={this._renderHeader}
        ListEmptyComponent={this._renderEmptyList}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={loading || loadingMore || loadingPrev}
        onRefresh={this._onRefresh}
        refreshControl={
          <RefreshControl
            onRefresh={this._onRefresh}
            refreshing={loading || loadingMore || loadingPrev}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
          />
        }
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
