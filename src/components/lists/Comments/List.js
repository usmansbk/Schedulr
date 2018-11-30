import React from 'react';
import moment from 'moment';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Item from './Item';
import styles from './styles';
import data from './dummy';

class List extends React.Component {
  _keyExtractor = (item) => String(item.id);
  _renderItem = ({ item: {
      id,
      content,
      author,
      createdAt
    }
  }) => {
    return (
      <Item
        id={id}
        authorId={author.id}
        authorName={author.name}
        authorPictureUrl={author.pictureUrl}
        content={content}
        timeAgo={moment(createdAt).fromNow()}
      />
    );
  }
  render() {
    return (
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}

export default withNavigationFocus(List);