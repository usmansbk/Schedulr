import React from 'react';
import { RefreshControl } from 'react-native';
import { withNavigationFocus, FlatList } from 'react-navigation';
import Item from './Item';
import Separator from './Separator';
import Footer from './Footer';
import Empty from './Empty';
import { decapitalize } from '../../../lib/capitalizr';
import { getNextDate } from '../../../lib/time';
import styles, {
  primary,
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT,
} from './styles';

class List extends React.Component {
  static defaultProps = {
    events: [],
    loading: false,
    hasMore: false,
    onRefresh: () => null,
  };
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  shouldComponentUpdate = nextProps => nextProps.isFocused;
  _onPressItem = (id) => this.props.navigation.navigate('EventDetails', { id });
  _navigateToBoard = (id) => this.props.navigation.navigate('BoardEvents', { id });
  _keyExtractor = item => String(item.id);
  _renderItem = ({
    item: {
      id,
      title,
      startAt,
      endAt,
      allDay,
      starsCount,
      commentsCount,
      isCancelled,
      repeat,
      type,
      board,
    }
  }) => <Item
    id={id}
    title={title}
    date={this._getDate({ startAt, allDay, repeat, endAt })}
    details={this._getDetails({ repeat, type })}
    boardId={board.id}
    boardName={board.name}
    pictureUrl={board.pictureUrl}
    starsCount={starsCount}
    commentsCount={commentsCount}
    isCancelled={isCancelled}
    type={type}
    onPressItem={this._onPressItem}
    navigateToBoard={this._navigateToBoard}
  />;
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={!this.props.nextToken && this.props.events.length} />;
  _renderEmpty = () => <Empty trend={this.props.trend} />;
  _getDate = (event) => getNextDate(event);
  _getDetails = ({
    repeat,
    type,
  }) => {
    let details = repeat === 'NEVER' ? '' : (decapitalize(repeat) + ' ');
    return details + decapitalize(type);
  }

  render() {
    const {
      events,
      loading,
      onRefresh,
    } = this.props;
    return (
      <FlatList
        data={events}
        refreshing={loading}
        refreshControl={<RefreshControl refreshing={loading} colors={[primary]} />}
        onRefresh={onRefresh}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        getItemLayout={this._getItemLayout}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        ListFooterComponent={this._renderFooter}
        ListEmptyComponent={this._renderEmpty}
      />
    );
  }
}

export default withNavigationFocus(List);