import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Comments';
import CommentForm from 'components/forms/Comment';

@inject('stores')
@observer
export default class Comments extends React.Component {

  state = {
    id: null
  }

  focusCommentInput = () => this._inputRef && this._inputRef.wrappedInstance.focusInput();

  blurCommentInput = () => this._inputRef && this._inputRef.wrappedInstance.blurInput();

  scrollDown = () => this._commentsListRef && this._commentsListRef.wrappedInstance.scrollDown();

  scrollTop = () => this._commentsListRef && this._commentsListRef.wrappedInstance.scrollTop();

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
      me,
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

    return (
      <>
        <Appbar style={styles.elevatedHeader}>
          <Appbar.BackAction onPress={goBack} color={colors.gray} />
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