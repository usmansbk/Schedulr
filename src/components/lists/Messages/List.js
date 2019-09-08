import React from 'react';
import { FlatList } from 'react-navigation';
import moment from 'moment';
import Empty from './Empty';
import Footer from './Footer';
import Separator from './Separator';
import Item from './Item';
import { notifications_list } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

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
  _navigateToComments = (id) => this.props.navigation.navigate('Comments', { id });
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _renderItem = ({ item: {
    id,
    subject,
    message,
    image,
    timestamp,
    topic,
    entityId,
    extraData,
    type
  }}) => <Item
    id={id}
    entityId={entityId}
    subject={subject}
    message={message}
    topic={topic}
    type={type}
    extraData={extraData}
    pictureUrl={image && getImageUrl(image)}
    date={moment.unix(timestamp).fromNow()}
    navigateToComments={this._navigateToComments}
  />;

  render() {
    const { styles, updates } = this.props;
    
    return (
      <FlatList
        data={updates}
        style={styles}
        extraData={moment().format('mm')}
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