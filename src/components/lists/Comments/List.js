import React from 'react';
import moment from 'moment';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Item from './Item';
import Separator from './Separator';
import styles from './styles';
import data from './dummy';

class List extends React.Component {
  _keyExtractor = (item) => String(item.id);
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id }); 
  _renderItem = ({ item: {
      id,
      content,
      author,
      isAuthor,
      createdAt
    }
  }) => {
    return (
      <Item
        id={id}
        authorId={author.id}
        authorName={author.name}
        authorPictureUrl={author.pictureUrl}
        isAuthor={isAuthor}
        content={content}
        timeAgo={moment(createdAt).fromNow()}
        navigateToProfile={this._navigateToProfile}
        handleDeleteComment={this.props.handleDelete}
        handleReplyComment={this.props.handleReply}
        handleEditComment={this.props.handleEdit}
      />
    );
  }
  _renderSeparator = () => <Separator />;
  render() {
    return (
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
      />
    )
  }
}

export default withNavigationFocus(List);