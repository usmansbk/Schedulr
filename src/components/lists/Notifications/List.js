import React from 'react';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Empty from './Empty';
import Footer from './Footer';
import Separator from './Separator';
import Item from './Item';

@inject('stores')
@observer
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
    tag
  }}) => <Item
    id={id}
    title={title}
    message={message}
    pictureUrl={pictureUrl}
    date={date}
    tag={tag}
  />;

  render() {
    const { stores, notifications } = this.props;

    const styles = stores.appStyles.notifications;
    
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