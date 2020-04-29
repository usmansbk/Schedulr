import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { inject, observer } from 'mobx-react';
import Item from './Item';
import Footer from './Footer';
import Empty from './Empty';
import Header from './Header';
import Separator from './Separator';
import getImageUrl from 'helpers/getImageUrl';

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
      attachment,
      author,
      event,
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
        authorPictureUrl={author.avatar ? getImageUrl(author.avatar) : author.pictureUrl}
        isOwner={isOwner}
        content={content}
        attachment={attachment}
        createdAt={createdAt}
        commentEventId={event.id}
        toCommentId={to && to.id}
        toCommentAuthorName={to && to.author.name}
        toCommentContent={to && to.content}
        toAttachment={to && to.attachment}
        navigateToProfile={this.props.navigateToProfile}
        navigateToThread={this.props.navigateToThread}
        navigateToViewEmbed={this.props.navigateToViewEmbed}
        onDelete={this.props.onDelete}
        handleReplyComment={this.props.handleReply}
      />
    );
  }
  _renderHeader = () => <Header 
    navigateToProfile={this.props.navigateToProfile}
    navigateToThread={this.props.navigateToThread}
    navigateToViewEmbed={this.props.navigateToViewEmbed}
    onDelete={this.props.onDelete}
    handleReply={this.props.handleReply}
    threadId={this.props.threadId} />;
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
  };
  scrollTop = () => {
    if (this.props.comments.length) {
      this._listRef && this._listRef.scrollToIndex({
        index: 0,
        viewPosition: 0
      });
    }
  };
  
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
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        ListEmptyComponent={this._renderEmpty}
        ItemSeparatorComponent={this._renderSeparator}
        initialNumToRender={1}
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
        keyboardShouldPersistTaps="always"
      />
    )
  }
}

export default inject("stores")(observer(List));