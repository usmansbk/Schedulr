import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { inject, observer } from 'mobx-react';
import Item from './Item';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import { timeAgo } from 'lib/time';

@inject('stores')
@observer
export default class List extends React.Component {
  state = {
    fetchingMore: false
  }
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
        timeAgo={timeAgo(createdAt)}
        navigateToProfile={this.props.navigateToProfile}
        onDelete={this.props.onDelete}
        handleReplyComment={this.props.handleReply}
      />
    );
  }
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer
    hide={!this.props.comments.length}
    loading={this.props.fetchingMore}
    hasMore={this.props.nextToken}
    onPress={this._onEndReached}/>;
  _renderEmpty = () => <Empty error={this.props.error} loading={this.props.loading} />;
  scrollDown = () => {
    if (this.props.comments.length) {
      this._listRef && this._listRef.scrollToEnd();
    }
  }
  scrollTop = () => {
    if (this.props.comments.length) {
      this._listRef && this._listRef.scrollToIndex({
        index: 0,
        viewPosition: 0
      });
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.comments !== this.props.comments ||
    nextState.fetchingMore !== this.state.fetchingMore ||
    nextProps.loading !== this.props.loading
  );
  _onEndReached = async () => {
    const { nextToken, fetchMoreComments, loading } = this.props;
    this.setState({ fetchingMore: true });
    if (nextToken && !loading) await fetchMoreComments(nextToken);
    this.setState({ fetchMore: false });
  }

  render() {
    const {
      loading,
      comments,
      onRefresh,
      stores
    } = this.props;

    const styles = stores.appStyles.commentsList;

    return (
      <FlatList
        ref={ref => this._listRef = ref}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={comments}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListFooterComponent={this._renderFooter}
        ListEmptyComponent={this._renderEmpty}
        ItemSeparatorComponent={this._renderSeparator}
        refreshing={loading}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={this._onEndReached}
      />
    )
  }
}