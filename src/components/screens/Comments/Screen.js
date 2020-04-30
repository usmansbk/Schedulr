import React from 'react';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Comments';
import CommentForm from 'components/forms/Comment';

class Screen extends React.Component {

  focusCommentInput = () => this._inputRef && this._inputRef.focusInput();

  blurCommentInput = () => this._inputRef && this._inputRef.blurInput();

  scrollDown = () => this._commentsListRef && this._commentsListRef.scrollDown();

  scrollTop = () => this._commentsListRef && this._commentsListRef.scrollTop();

  _handleSubmit = async (message, uploads) => {
    await this.props.onSubmit(message, uploads);
    this.scrollDown();
  };

  _handleDelete = (id, keys) => {
    this.props.handleDelete(id, keys);
  };

  render() {
    const {
      id,
      loading,
      targetName,
      comments,
      nextToken,
      error,
      onRefresh,
      goBack,
      title,
      handleReply,
      cancelReply,
      navigateToProfile,
      navigateToThread,
      navigateToViewEmbed,
      stores,
      fetchMoreComments,
      threadId,
      isOwner
    } = this.props;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;

    return (
      <>
        <Appbar.Header style={styles.header}>
          <Appbar.Action
            size={24}
            color={colors.primary}
            icon={({ size, color }) => <Icon
              color={color}
              size={size}
              name="arrow-left"
            />}
            onPress={goBack}
          />
          <Appbar.Content
            title={title || I18n.get('COMMENTS')}
            titleStyle={styles.headerColor}
          />
        </Appbar.Header>
        <List
          ref={commentsRef => this._commentsListRef = commentsRef}
          error={error}
          id={id}
          threadId={threadId}
          loading={loading}
          comments={comments.reverse()}
          nextToken={nextToken}
          onRefresh={onRefresh}
          handleReply={handleReply}
          onDelete={this._handleDelete}
          navigateToProfile={navigateToProfile}
          navigateToThread={navigateToThread}
          navigateToViewEmbed={navigateToViewEmbed}
          fetchMoreComments={fetchMoreComments}
        />
        <CommentForm
          id={id}
          isOwner={isOwner}
          ref={inputRef => this._inputRef = inputRef}
          handleSubmit={this._handleSubmit}
          targetName={targetName}
          cancelReply={cancelReply}
          disabled={!comments.length && (loading || error)}
        />
      </>
    );
  }
}

export default inject("stores")(observer(Screen));