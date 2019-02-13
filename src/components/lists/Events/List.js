import React from 'react';
import memoize from 'memoize-one';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, SectionList } from 'react-navigation';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import Header from './Header';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import SectionHeader from './SectionHeader';
import Item from './Item';
import {
  isStarted,
  getDuration,
  getStatus,
  getTime
} from '../../../lib/parseItem';
import { formatDate } from '../../../lib/time';
import sectionize, { sortBy } from '../../../lib/sectionizr';
import { decapitalize } from '../../../lib/capitalizr';
import styles, {
  ITEM_HEIGHT,
  SEPERATOR_HEIGHT,
  SECTION_HEADER_HEIGHT,
  HEADER_HEIGHT,
  primary
} from './styles';

class List extends React.Component {
  static defaultProps = {
    loading: false,
    hasPreviousEvents: false,
    events: [],
    onRefresh: () => null,
  };
  _loadPrevious = () => console.log('Load previous events');
  _keyExtractor = (item) => item.id;
  _renderHeader = () => <Header onPress={this._loadPrevious} visible={this.props.hasPreviousEvents} />;
  _renderFooter = () => <Footer visible={this.props.events.length}/>;
  _renderEmptyList = () => {
    const { loading, events, error } = this.props;
    if (loading && (events.length === 0)) return null;
    return <Empty error={error} />
  };
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({section}) => <SectionHeader section={section} />;
  _onPressItem = (id) => this.props.navigation.navigate('EventDetails', { id });
  _onPressCommentItem = (id) => this.props.navigation.navigate('Comments', { id });
  _navigateToBoardEvents = (id) => {
    let screen = 'BoardEvents';
    if (this.props.listType === 'board') screen = 'BoardInfo';
    this.props.navigation.navigate(screen, { id })
  };

  _renderItem = ({ item: {
    id,
    title,
    location,
    eventType,
    isCancelled,
    cancelledDates,
    commentsCount,
    starsCount,
    isStarred,
    startAt,
    endAt,
    repeat,
    board,
    allDay,
  }}) => (<Item
    id={id}
    title={title}
    address={location && location.address}
    longitude={location && location.longitude}
    latitude={location && location.latitude}
    eventType={decapitalize(eventType)}
    repeat={repeat === 'NEVER' ? null : decapitalize(repeat)}
    time={getTime({ allDay, startAt, endAt })}
    date={formatDate(startAt, endAt, allDay)}
    isStarted={isStarted({ startAt, endAt, isCancelled })}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt})}
    commentsCount={commentsCount}
    starsCount={starsCount}
    isStarred={isStarred} 
    boardId={board.id}
    boardName={board.name}
    duration={getDuration(startAt, endAt, eventType)}
    onPressItem={this._onPressItem}
    onPressCommentButton={this._onPressCommentItem}
    navigateToBoardEvents={this._navigateToBoardEvents}
    animated={this.props.animated}
  />);
  _getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => ITEM_HEIGHT,
    getSeparatorHeight: () => SEPERATOR_HEIGHT,
    getSectionHeaderHeight: () => SECTION_HEADER_HEIGHT,
    listHeaderHeight: HEADER_HEIGHT,
  });
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;

  _sectionize = memoize((events) => sortBy(sectionize(events), 'title'));

  render() {
    const {
      loading,
      events,
      onRefresh,
    } = this.props;
    const sections = this._sectionize(events);
    
    return (
      <SectionList
        initialNumToRender={0}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        stickySectionHeadersEnabled
        getItemLayout={this._getItemLayout}
        sections={sections}
        extraData={events.length}
        ListHeaderComponent={this._renderHeader}
        ListEmptyComponent={this._renderEmptyList}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={loading}
        onRefresh={onRefresh}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={loading} colors={[primary]} />}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        keyExtractor={this._keyExtractor}
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}

export default withNavigationFocus(List);