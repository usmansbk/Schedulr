import React from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, SectionList } from 'react-navigation';
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
  isToday
} from '../../../lib/parseItem';
import { decapitalize } from '../../../lib/capitalizr';
import { getNextEvents } from '../../../lib/calendr';
import styles, {
  ITEM_HEIGHT,
  SEPERATOR_HEIGHT,
  SECTION_HEADER_HEIGHT,
  SECTION_FOOTER_HEIGHT,
  HEADER_HEIGHT,
  primary_dark
} from './styles';

const DAYS_PER_PAGE = 3;
const INITIAL_AFTERDAYS = 0;

class List extends React.Component {

  state = {
    loadingMore: false,
    sections: [],
    afterDays: INITIAL_AFTERDAYS
  };

  static defaultProps = {
    loading: false,
    hasPreviousEvents: false,
    events: [],
    onRefresh: () => null,
  };

  _loadPrevious = () => console.log('Load previous events');
  _keyExtractor = (item) => item.id + item.startAt;
  _renderHeader = () => <Header onPress={this._loadPrevious} visible={this.props.hasPreviousEvents} />;
  _renderFooter = () => <Footer onPress={this._onEndReached} loading={this.state.loadingMore} />;
  _renderEmptyList = () => <Empty error={this.props.error} loading={this.props.loading} />;
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({ section }) => <SectionHeader section={section} />;
  _renderSectionFooter = ({ section }) => <SectionFooter section={section} />;
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.push('EventDetails', { id, refStartAt, refEndAt });
  _navigateToBoardEvents = (id) => {
    let screen = 'BoardEvents';
    if (this.props.listType === 'board') screen = 'BoardInfo';
    this.props.navigation.navigate(screen, { id })
  };

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
        afterDays: INITIAL_AFTERDAYS
      });
    }  
  }
  
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
  }

  shouldComponentUpdate = (nextProps) => {
    return nextProps.isFocused;
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
    repeat={repeat === 'NEVER' ? null : decapitalize(repeat, true)}
    time={getTime({ allDay, startAt, endAt })}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt})}
    boardId={board.id}
    duration={getDuration(startAt, endAt, eventType)}
    showTag={isToday({ startAt, cancelledDates, isCancelled })}
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
    const {
      loading,
      onRefresh,
    } = this.props;
    const { sections } = this.state;
    
    return (
      <SectionList
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
        onRefresh={onRefresh}
        refreshControl={<RefreshControl
          onRefresh={onRefresh}
          refreshing={loading}
          colors={[primary_dark]}
        />}
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

export default withNavigationFocus(List);