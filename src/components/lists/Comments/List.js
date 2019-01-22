import React from 'react';
import moment from 'moment';
import { FlatList } from 'react-native';
import Item from './Item';
import Footer from './Footer';
import Separator from './Separator';
import styles from './styles';

export default class List extends React.Component {
  static defaultProps = {
    comments: [],
    loading: false,
    onRefresh: () => null
  };
  _keyExtractor = (item) => String(item.id);
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id }); 
  _renderItem = ({ item: {
      id,
      content,
      author,
      toComment,
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
        replyingId={toComment && toComment.id}
        replyingName={toComment && toComment.author && toComment.author.name}
        replyingContent={toComment && toComment.content}
        isAuthor={isAuthor}
        content={content}
        timeAgo={moment(createdAt).fromNow(true)}
        navigateToProfile={this._navigateToProfile}
        handleDeleteComment={this.props.handleDelete}
        handleReplyComment={this.props.handleReply}
      />
    );
  }
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer />;
  scrollDown = () => {
    this._listRef && this._listRef.scrollToEnd();
  }

  render() {
    const {
      loading,
      comments,
      onRefresh
    } = this.props;
    return (
      <FlatList
        ref={ref => this._listRef = ref}
        style={styles.list}
        data={comments}
        extraData={comments.length}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListFooterComponent={this._renderFooter}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    )
  }
}