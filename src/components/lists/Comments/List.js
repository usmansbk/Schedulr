import React from 'react';
import moment from 'moment';
import { FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Item from './Item';
import Separator from './Separator';
import styles from './styles';

class List extends React.Component {
  static defaultProps = {
    comments: [],
    loading: false,
    onRefresh: () => null
  };
  _keyExtractor = (item) => String(item.id);
  shouldComponentUpdate = (nextProps) => nextProps.isFocused;
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id }); 
  _renderItem = ({ item: {
      id,
      content,
      author,
      replying,
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
        replyingId={replying && replying.id}
        replyingName={replying && replying.author.name}
        replyingContent={replying && replying.content}
        isAuthor={isAuthor}
        content={content}
        timeAgo={moment(createdAt).fromNow()}
        navigateToProfile={this._navigateToProfile}
        handleDeleteComment={this.props.handleDelete}
        handleReplyComment={this.props.handleReply}
      />
    );
  }
  _renderSeparator = () => <Separator />;
  render() {
    const {
      loading,
      comments,
      onRefresh
    } = this.props;
    return (
      <FlatList
        style={styles.list}
        data={comments}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    )
  }
}

export default withNavigationFocus(List);