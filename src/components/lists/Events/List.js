import React from 'react';
import moment from 'moment';
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
  getTime
} from '../../../lib/parseItem';
import { decapitalize } from '../../../lib/capitalizr';
import { getNextDayEvents } from '../../../lib/calendr';
import styles, {
  ITEM_HEIGHT,
  SEPERATOR_HEIGHT,
  SECTION_HEADER_HEIGHT,
  SECTION_FOOTER_HEIGHT,
  HEADER_HEIGHT,
  primary
} from './styles';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sections: [],
      nextDate: moment().toISOString()
    }
  }

  static defaultProps = {
    loading: false,
    hasPreviousEvents: false,
    events: [],
    onRefresh: () => null,
  };
  _loadPrevious = () => console.log('Load previous events');
  _keyExtractor = (item) => item.id + item.startAt;
  _renderHeader = () => <Header onPress={this._loadPrevious} visible={this.props.hasPreviousEvents} />;
  _renderFooter = () => <Footer loading={this.state.loading} />;
  _renderEmptyList = () => <Empty error={this.props.error} loading={this.props.loading} />;
  _renderSeparator = () => <Separator />;
  _renderSectionHeader = ({ section }) => <SectionHeader section={section} />;
  _renderSectionFooter = ({ section }) => <SectionFooter section={section} />;
  _onPressItem = (id, refStartDate, refEndDate) => this.props.navigation.push('EventDetails', { id, refStartDate, refEndDate });
  _navigateToBoardEvents = (id) => {
    let screen = 'BoardEvents';
    if (this.props.listType === 'board') screen = 'BoardInfo';
    this.props.navigation.navigate(screen, { id })
  };

  loadSections = (events) => {
    this.setState({ loading: true });
    if (events) {
      this.setState(state => ({
        sections: [...state.sections, getNextDayEvents(events, state.nextDate)],
        nextDate: moment(state.nextDate).add(1, 'day').toISOString(),
        loading: false
      }));
    }
  }

  _bootstrap = (events) => {
    if (events) {
      this.setState({
        sections: [getNextDayEvents(events)],
        nextDate: moment().add(1, 'day').toISOString()
      });
    }  
  }
  
  _onEndReached = () => {
    this.loadSections(this.props.events);
  };

  componentDidMount = () => {
    this._bootstrap(this.props.events);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.events !== this.props.events) {
      this._bootstrap(nextProps.events);
    }
  }

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
    repeat={repeat === 'NEVER' ? null : decapitalize(repeat)}
    time={getTime({ allDay, startAt, endAt })}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt})}
    boardId={board.id}
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
    getSectionFooterHeight: () => SECTION_FOOTER_HEIGHT,
    listHeaderHeight: HEADER_HEIGHT,
  });
  
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;

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
          onRefresh={this.props.onRefresh}
          refreshing={this.props.loading}
          colors={[primary]}
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