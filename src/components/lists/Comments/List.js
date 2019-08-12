import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { inject, observer } from 'mobx-react';
import Item from './Item';
import Footer from './Footer';
import Empty from './Empty';
import Separator from './Separator';
import { timeAgo } from 'lib/time';

class List extends React.Component {
  state = {
    fetchingMore: false,
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
      to,
      isOwner,
      createdAt,
    }
  }) => {
    return (
      <Item
        id={id}
        authorId={author.id}
        authorName={author.name}
        authorPictureUrl={author.pictureUrl}
        isOwner={isOwner}
        content={content}
        toCommentAuthorName={to && to.author.name}
        toCommentContent={to && to.content}
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
    loading={this.props.loading && this.state.fetchingMore}
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
    if (nextToken && !loading) {
      this.setState({ fetchingMore: true });
      await fetchMoreComments(nextToken);
      this.setState({ fetchingMore: false });
    }
  };
  _onRefresh = async () => {
    await this.props.onRefresh();
  }

  render() {
    const {
      loading,
      comments,
      stores
    } = this.props;
    const { fetchingMore } = this.state;

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
        refreshing={loading && !fetchingMore}
        onRefresh={this._onRefresh}
        refreshControl={
          <RefreshControl
            refreshing={loading && !fetchingMore}
            onRefresh={this._onRefresh}
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

export default inject("stores")(observer(List));