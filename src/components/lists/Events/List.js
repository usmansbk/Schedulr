import React from 'react';
import { RefreshControl } from 'react-native';
import { SectionList } from 'react-navigation';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
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
  getNextEvents,
  getPreviousEvents,
} from 'lib/calendr';
import styles, {
  ITEM_HEIGHT,
  SEPERATOR_HEIGHT,
  SECTION_HEADER_HEIGHT,
  SECTION_FOOTER_HEIGHT,
  HEADER_HEIGHT,
  primary
} from './styles';

const DAYS_PER_PAGE = 3;
const INITIAL_BEFOREDAYS = 1;
const INITIAL_AFTERDAYS = 0;

export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }
  state = {
    loadingMore: false,
    loadingPrev: false,
    sections: [],
    afterDays: INITIAL_AFTERDAYS,
    beforeDays: INITIAL_BEFOREDAYS
  };

  static defaultProps = {
    loading: false,
    hasPreviousEvents: false,
    events: [],
    onRefresh: () => null,
  };

  _keyExtractor = (item) => item.id + item.startAt;
  _renderHeader = () => (
    this.state.sections.length ?
    <Header onPress={this.loadPreviousEvents} loading={this.state.loadingPrev} />
    : null
  );
  _renderFooter = () => (
    this.state.sections.length ?
    <Footer onPress={this._onEndReached} loading={this.state.loadingMore} />
    : null
  );
  _renderEmptyList = () => <Empty error={this.props.error} loading={this.props.loading} />;
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({ section }) => <SectionHeader onPress={this._onPressSectionHeader} section={section} />;
  _renderSectionFooter = ({ section }) => <SectionFooter section={section} />;
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.push('EventDetails', { id, refStartAt, refEndAt });
  _navigateToBoardEvents = (id) => {
    let screen = 'BoardEvents';
    if (this.props.listType === 'board') screen = 'BoardInfo';
    this.props.navigation.navigate(screen, { id })
  };
  _onPressSectionHeader = (targetDate) => {
    if (!isPast(targetDate)) {
      this.props.navigation.navigate('NewEvent', {
        targetDate
      });
    }
  }
  
  loadPreviousEvents = () => {
    const { events } = this.props;
    this.setState({ loadingPrev: true }, () => {
      this.setState(state => {
        const beforeDays = state.beforeDays;
        const prevSections = getPreviousEvents(events, beforeDays, DAYS_PER_PAGE);
        return ({
          sections: [...prevSections, ...state.sections],
          beforeDays: beforeDays + DAYS_PER_PAGE,
          loadingPrev: false
        })
      })
    })
  }

  loadMoreEvents = (events=[]) => {
    this.setState({ loadingMore: true }, () => {
      this.setState(state => {
        const afterDays = state.afterDays + DAYS_PER_PAGE;
        const moreSections = getNextEvents(events, afterDays, DAYS_PER_PAGE);
        return ({
          sections: [...state.sections, ...moreSections],
          afterDays,
          loadingMore: false
        })
      });
    });
  }

  _bootstrap = (events) => {
    if (events) {
      this.setState({
        sections: getNextEvents(events, INITIAL_AFTERDAYS, DAYS_PER_PAGE),
        afterDays: INITIAL_AFTERDAYS,
        beforeDays: INITIAL_BEFOREDAYS
      });
    }  
  }

  _onRefresh = () => {
    this._bootstrap(this.props.events);
    this.props.onRefresh();
  };
  
  _onEndReached = () => {
    this.loadMoreEvents(this.props.events);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.events !== this.props.events) {
      this._bootstrap(nextProps.events);
    }
  };

  componentDidMount = () => {
    this._bootstrap(this.props.events);
  };

  scrollToTop = () => {
    this.listRef.current.scrollToLocation({
      itemIndex: 0,
      sectionIndex: 0,
      viewPosition: SECTION_HEADER_HEIGHT
    });
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
    duration={getDuration(startAt, endAt, eventType)}
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
    const { loading } = this.props;
    const { sections } = this.state;
    
    return (
      <SectionList
        ref={this.listRef}
        initialNumToRender={0}
        getItemLayout={this._getItemLayout}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        stickySectionHeadersEnabled
        sections={sections}
        extraData={sections.length}
        ListHeaderComponent={this._renderHeader}
        ListEmptyComponent={this._renderEmptyList}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={loading}
        onRefresh={this._onRefresh}
        refreshControl={
          <RefreshControl
            onRefresh={this._onRefresh}
            refreshing={loading}
            colors={[primary]}
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
