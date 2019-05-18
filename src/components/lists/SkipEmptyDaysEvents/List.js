import React from 'react';
import { RefreshControl, InteractionManager } from 'react-native';
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
  getNextEvents,
  getPreviousEvents,
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

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }
  state = {
    loadingMore: false,
    loadingPrev: false,
    sections: [],
    hasNext: true,
    hasPrev: true,
    after: moment().toISOString(),
    before: moment().toISOString()
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
    <Header
      loading={this.state.loadingPrev}
      onPress={this.loadPreviousEvents}
    />
    : null
  );
  _renderFooter = () => (
    this.state.sections.length ?
    <Footer
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
    this.setState({ loadingPrev: true });

    // get previous available day
    // get events of day
    // set state

    this.setState({ loadingPrev: false });
  }

  loadMoreEvents = (events=[]) => {
    
    this.setState({ loadingMore: true });

    // get next available day
    // get events of day
    // set state

    this.setState({ loadingMore: false });
  }

  _bootstrap = (events) => {
    if (events) {
      const today = moment().toISOString();

      this.setState({
        // sections: generateNextEvents(events, today, EVENTS_PER_PAGE),
        afterDate: today,
        beforeDate: today
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
    if (nextProps.events.length !== this.props.events.length) {
      this._bootstrap(nextProps.events);
    }
  };

  componentDidMount = () => {
    this._bootstrap(this.props.events);
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
    const { sections, loadingPrev } = this.state;
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
        refreshing={loading || loadingPrev}
        onRefresh={this._onRefresh}
        refreshControl={
          <RefreshControl
            onRefresh={this._onRefresh}
            refreshing={loading || loadingPrev}
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
