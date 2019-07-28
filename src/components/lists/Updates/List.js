import React from 'react';
import { FlatList } from 'react-navigation';
import moment from 'moment';
import Empty from './Empty';
import Footer from './Footer';
import Separator from './Separator';
import Item from './Item';
import capitalizr from 'lib/capitalizr';
import { notifications_list } from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = notifications_list;

export default class List extends React.Component {
  static defaultProps = {
    updates: []
  };

  _renderEmpty = () => <Empty />;
  _renderSeparator = () => <Separator />;
  _keyExtractor = (item, index) => item.id + item.date + index;
  _renderFooter = () => <Footer visible={this.props.updates.length}/>;
  _navigateToEvent = (id) => this.props.navigation.navigate('EventDetails', { id });
  _navigateToBoard = (id) => this.props.navigation.navigate('BoardInfo', { id });
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _renderItem = ({ item: {
    id,
    title,
    message,
    pictureUrl,
    date,
    count,
    target,
    type
  }}) => <Item
    id={id}
    title={title}
    message={message}
    count={count}
    type={type}
    pictureUrl={pictureUrl}
    date={capitalizr(`${moment(date).fromNow()}`)}
    target={target && capitalizr(moment(target).toDate().toDateString())}
    navigateToBoard={this._navigateToBoard}
    navigateToEvent={this._navigateToEvent}
  />;

  render() {
    const { styles, updates } = this.props;
    
    return (
      <FlatList
        data={updates}
        style={styles}
        extraData={moment().valueOf()}
        getItemLayout={this._getItemLayout}
        contentContainerStyle={styles.contentContainer}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmpty}
        ListFooterComponent={this._renderFooter}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}