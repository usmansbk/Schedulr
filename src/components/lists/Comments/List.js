import React from 'react';
import { FlatList } from 'react-native';
import moment from 'moment';
import Item from './Item';
import Footer from './Footer';
import Separator from './Separator';
import timeAgo from '../../../config/timeAgo';
import styles from './styles';

export default class List extends React.Component {
  static defaultProps = {
    comments: [],
    loading: false,
    onRefresh: () => null
  };
  _keyExtractor = (item) => String(item.id);
  _renderItem = ({ item: {
      id,
      content,
      author,
      toCommentId,
      toComment,
      isAuthor,
      createdAt,
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
        isToCommentDeleted={toCommentId && !toComment}
        toCommentAuthorName={toComment && toComment.author.name}
        toCommentContent={toComment && toComment.content}
        timeAgo={timeAgo.format(moment(createdAt).toDate(), 'twitter')}
        navigateToProfile={this.props.navigateToProfile}
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