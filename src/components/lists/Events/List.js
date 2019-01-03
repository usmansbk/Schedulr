import React from 'react';
import { SectionList, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import Header from './Header';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import SectionHeader from './SectionHeader';
import Item from './Item';
import {
  parseDetails,
  startTime,
  endTime,
  isStarted
} from '../../../lib/parseItem';
import { formatDate } from '../../../lib/time';
import sectionize, { sortBy } from '../../../lib/sectionizr';
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
    const { listType, loading, events } = this.props;
    if (loading && (events.length === 0)) return null;
    let message;
    if (listType === 'starred') {
      message = 'No important event - yet'
    } else {
      message = 'No upcoming Events or Reminders!';
    }
    return <Empty message={message} />
  };
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({section}) => <SectionHeader section={section} />;
  _onPressItem = (id) => this.props.navigation.navigate('EventDetails', { id });
  _onPressCommentItem = (id) => this.props.navigation.navigate('Comments', { id });
  _navigateToBoardEvents = (id) => this.props.navigation.navigate('BoardEvents', { id });

  _renderItem = ({ item: {
    id,
    title,
    location,
    eventType,
    isCancelled,
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
    location={location && location.address}
    eventType={eventType}
    details={parseDetails({ startAt, endAt, allDay, eventType, repeat })}
    startTime={startTime({ allDay, startAt })}
    endTime={endTime({ endAt, startAt })}
    date={formatDate(startAt, endAt, allDay)}
    isStarted={isStarted({ startAt, endAt, isCancelled })}
    isCancelled={isCancelled}
    commentsCount={commentsCount}
    starsCount={starsCount}
    isStarred={isStarred} 
    boardId={board.id}
    boardName={board.name}
    allDay={allDay}
    onPressItem={this._onPressItem}
    onPressCommentButton={this._onPressCommentItem}
    navigateToBoardEvents={this._navigateToBoardEvents}
  />);
  _getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => ITEM_HEIGHT,
    getSeparatorHeight: () => SEPERATOR_HEIGHT,
    getSectionHeaderHeight: () => SECTION_HEADER_HEIGHT,
    listHeaderHeight: HEADER_HEIGHT,
  });
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;

  render() {
    const {
      loading,
      events,
      onRefresh,
    } = this.props;
    const sections = sortBy(sectionize(events), 'title');

    return (
      <SectionList
        initialNumToRender={0}
        style={styles.list}
        stickySectionHeadersEnabled
        getItemLayout={this._getItemLayout}
        sections={sections}
        extraData={this.props.isFocused}
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