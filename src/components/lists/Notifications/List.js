import React from 'react';
import { FlatList } from 'react-navigation';
import moment from 'moment';
import Empty from './Empty';
import Footer from './Footer';
import Separator from './Separator';
import Item from './Item';
import capitalizr from 'lib/capitalizr';

export default class List extends React.Component {
  static defaultProps = {
    notifications: []
  };

  _renderEmpty = () => <Empty />;
  _renderSeparator = () => <Separator />;
  _keyExtractor = (item) => item.id + item.date;
  _renderFooter = () => <Footer visible={this.props.notifications.length}/>;
  _navigateToEvent = (id) => this.props.navigation.navigate('EventDetails', { id });
  _navigateToBoard = (id) => this.props.navigation.navigate('BoardInfo', { id });
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
    const { styles, notifications } = this.props;
    
    return (
      <FlatList
        data={notifications}
        style={styles.list}
        extraData={moment().valueOf()}
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