import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import moment from 'moment';
import Item from './Item';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import styles, { primary } from './styles';

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
      isReply,
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
        isToCommentDeleted={isReply && !toComment}
        toCommentAuthorName={toComment && toComment.author.name}
        toCommentContent={toComment && toComment.content}
        timeAgo={moment(createdAt).fromNow(true) + ' ago'}
        navigateToProfile={this.props.navigateToProfile}
        handleDeleteComment={this.props.handleDelete}
        handleReplyComment={this.props.handleReply}
        onLongPress={this.props.onLongPressItem}
        onPress={this.props.onPressItem}
      />
    );
  }
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer />;
  _renderEmpty = () => <Empty error={this.props.error} />;
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
        ListEmptyComponent={this._renderEmpty}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={loading}
        onRefresh={onRefresh}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} colors={[primary]} />}
      />
    )
  }
}