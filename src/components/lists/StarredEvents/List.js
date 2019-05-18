import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import {
  getDuration,
  getHumanTime,
  parseRepeat,
  getStatus
} from 'lib/parseItem';
import { sortStarredEvents } from 'lib/utils';
import { decapitalize } from 'lib/capitalizr';
import { getEvents } from 'lib/calendr';
import { starredEvents } from 'lib/constants';

const { ITEM_HEIGHT, SEPARATOR_HEIGHT } = starredEvents;

@inject('stores')
@observer
class List extends Component {
  static defaultProps = {
    events: [],
    loading: false,
    onRefresh: () => null
  };
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  shouldComponentUpdate = (nextProps) => { 
    return (nextProps.navigation.isFocused &&
      (
        nextProps.events.length !== this.props.events.length ||
        nextProps.loading !== this.props.loading
      )
    );
  };
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });
  _keyExtractor = (item) => String(item.id); 

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
    starsCount,
    commentsCount,
    isStarred
  }}) => (<Item
    id={id}
    title={title}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt})}
    startAt={startAt}
    endAt={endAt}
    starsCount={starsCount}
    commentsCount={commentsCount}
    isStarred={isStarred}
    eventType={decapitalize(eventType)}
    repeat={parseRepeat(repeat)}
    time={getHumanTime({ allDay, startAt, endAt })}
    boardId={board.id}
    duration={getDuration(startAt, endAt, allDay)}
    address={venue && venue.address}
    onPressItem={this._onPressItem}
    onPressComment={this._navigateToComments}
  />);

  _renderEmptyList = () => <Empty search={this.props.search} error={this.props.error} loading={this.props.loading} />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.events.length} />;

  render() {
    const {
      events,
      loading,
      onRefresh,
      stores
    } = this.props;

    const styles = stores.appStyles.starredEventsList;
    const colors = stores.themeStore.colors;

    return (
      <FlatList
        refreshing={loading}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[colors.primary]}
          />
        }
        onRefresh={onRefresh}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={5}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={sortStarredEvents(getEvents(events))}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

export default withNavigationFocus(List);