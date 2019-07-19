import React from 'react';
import { FlatList } from 'react-navigation';
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
  _keyExtractor = (item) => item.id;
  _renderFooter = () => <Footer visible={this.props.notifications.length}/>;
  _renderItem = ({ item: {
    id,
    title,
    message,
    pictureUrl,
    date,
    count,
    target,
  }}) => <Item
    id={id}
    title={title}
    message={message}
    count={count}
    pictureUrl={pictureUrl}
    date={capitalizr(date)}
    target={capitalizr(target)}
  />;

  render() {
    const { styles, notifications } = this.props;
    
    return (
      <FlatList
        data={notifications}
        style={styles.list}
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