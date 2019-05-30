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
import { sortEvents } from 'lib/utils';
import { getEvents } from 'lib/calendr';
import { decapitalize } from 'lib/capitalizr';
import { board_events } from 'lib/constants';
import { eventsDiff } from 'lib/utils';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = board_events;

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
        nextProps.loading !== this.props.loading ||
        eventsDiff(this.props.events, nextProps.events).length
      )
    );
  };
  _onPressItem = (id, refStartAt, refEndAt) => this.props.navigation.navigate('EventDetails', { id, refStartAt, refEndAt });
  _keyExtractor = (item) => String(item.id);

  _renderItem = ({ item: {
    id,
    title,
    eventType,
    startAt,
    endAt,
    repeat,
    board,
    allDay,
    isConcluded,
    isCancelled,
    cancelledDates,
  }}) => (<Item
    id={id}
    title={title}
    startAt={startAt}
    endAt={endAt}
    status={getStatus({ isCancelled, cancelledDates, startAt, endAt, isConcluded})}
    eventType={decapitalize(eventType)}
    repeat={parseRepeat(repeat)}
    time={getHumanTime({ allDay, startAt, endAt })}
    boardId={board.id}
    duration={getDuration(startAt, endAt, allDay)}
    onPressItem={this._onPressItem}
  />);

  _renderEmptyList = () => <Empty error={this.props.error} loading={this.props.loading} />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.events.length} />;

  render() {
    const {
      events,
      loading,
      onRefresh,
      stores
    } = this.props;

    const colors = stores.themeStore.colors;
    const styles = stores.appStyles.boardEvents;

    return (
      <FlatList
        refreshing={loading}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[colors.primary]}
            progressBackgroundColor={colors.bg}
          />
        }
        onRefresh={onRefresh}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={5}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        data={sortEvents(getEvents(events))}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

export default withNavigationFocus(List);