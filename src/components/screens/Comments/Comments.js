import React from 'react';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Comments';
import CommentForm from 'components/forms/Comment';

class Comments extends React.Component {

  state = {
    id: null
  }

  focusCommentInput = () => this._inputRef && this._inputRef.focusInput();

  blurCommentInput = () => this._inputRef && this._inputRef.blurInput();

  scrollDown = () => this._commentsListRef && this._commentsListRef.scrollDown();

  scrollTop = () => this._commentsListRef && this._commentsListRef.scrollTop();

  _handleSubmit = (message) => {
    if (this.props.onSubmit) this.props.onSubmit(message);
    this.scrollTop();
  };

  _handleDelete = (id) => {
    this.props.handleDelete(id);
  }

  render() {
    const {
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
      stores,
      fetchMoreComments,
    } = this.props;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;
    const me = stores.me.asJs();

    return (
      <>
        <Appbar style={styles.elevatedHeader}>
          <Appbar.Action
            icon={() => <Icon
              color={colors.gray}
              size={24}
              name="arrow-left"
            />}
            onPress={goBack}
            color={colors.gray}
          />
          <Appbar.Content
            title={title || 'Comments'}
            titleStyle={styles.headerColor}
          />
        </Appbar>
        <List
          ref={commentsRef => this._commentsListRef = commentsRef}
          error={error}
          loading={loading}
          comments={comments}
          nextToken={nextToken}
          onRefresh={onRefresh}
          handleReply={handleReply}
          onDelete={this._handleDelete}
          navigateToProfile={navigateToProfile}
          fetchMoreComments={fetchMoreComments}
        />
        <CommentForm
          name={me.name}
          pictureUrl={me.pictureUrl}
          ref={inputRef => this._inputRef = inputRef}
          handleSubmit={this._handleSubmit}
          targetName={targetName}
          cancelReply={cancelReply}
          disabled={error || (!comments.length && loading)}
        />
      </>
    );
  }
}

export default inject("stores")(observer(Comments));