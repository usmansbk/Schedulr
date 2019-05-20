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
} from 'lib/parseItem';
import { decapitalize } from 'lib/capitalizr';
import {
  generatePreviousEvents,
  generateNextEvents,
} from 'lib/calendr';
import { events } from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPERATOR_HEIGHT,
  SECTION_HEADER_HEIGHT,
  SECTION_FOOTER_HEIGHT,
  HEADER_HEIGHT,
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
      hasPrev={this.state.beforeDate}
      loading={this.state.loadingPrev}
      onPress={this.loadPreviousEvents}
    />
    : null
  );
  _renderFooter = () => (
    this.state.sections.length ?
    <Footer
      hasMore={this.state.afterDate}
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
  
  loadPreviousEvents = () => {
    const { events } = this.props;
    if (this.state.beforeDate) {
      this.setState({ loadingPrev: true });
      const prevSections = generatePreviousEvents(events, this.state.beforeDate, DAYS_PER_PAGE);
      const sectionLength = prevSections.length;
      const beforeDate = (sectionLength === DAYS_PER_PAGE) && moment(prevSections[0].title);

      this.setState(state => {
        return ({
          sections: [...prevSections, ...state.sections],
          beforeDate,
          loadingPrev: false,
        });
      });
    }
  };

  loadMoreEvents = (events=[]) => {    
    if (this.state.afterDate) {
      this.setState({ loadingMore: true });
      const moreSections = generateNextEvents(events, this.state.afterDate, DAYS_PER_PAGE);
      const sectionLength = moreSections.length;
      const afterDate = (sectionLength === 3) && moment(moreSections[sectionLength - 1].title);

      this.setState(state => {
        return ({
          sections: [...state.sections, ...moreSections],
          afterDate,
          loadingMore: false,
        })
      });
    }
  };

  _bootstrap = (events) => {
    if (events) {
      const yesterday = moment().endOf('D').add(-1, 'd');
      const sections = generateNextEvents(events, yesterday, DAYS_PER_PAGE);

      const sectionLength = sections.length;
      const afterDate = (sectionLength === DAYS_PER_PAGE) && moment(sections[sectionLength - 1].title);
      const beforeDate = sectionLength && moment(sections[0].title);
      
      this.setState({
        sections,
        afterDate,
        beforeDate,
      });
    }
  };

  _onRefresh = () => {
    this._bootstrap(this.props.events);
    this.props.onRefresh();
  };
  
  _onEndReached = () => {
    this.loadMoreEvents(this.props.events);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.events.length !== this.props.events.length) {
      this._bootstrap(nextProps.events);
    }
  };

  componentDidMount = () => {
    this._bootstrap(this.props.events);
  };

  onScroll = (handler) => {
    this.listRef.current.onScroll(handler);
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
    board,
    allDay,
  }}) => (<Item
    id={id}
    title={title}
    startAt={startAt}
    endAt={endAt}
    eventType={decapitalize(eventType)}
    repeat={parseRepeat(repeat)}
    time={getTime({ allDay, startAt, endAt })}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt})}
    boardId={board.id}
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
    const { sections } = this.state;
    const styles = stores.appStyles.eventsList;
    
    return (
      <SectionList
        ref={this.listRef}
        initialNumToRender={0}
        // getItemLayout={this._getItemLayout}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        stickySectionHeadersEnabled
        sections={sections}
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
