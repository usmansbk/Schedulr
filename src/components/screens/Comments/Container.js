import React from 'react';
import Comments from './Comments';
import DeleteCommentDialog from 'components/dialogs/DeleteComment';

export default class Container extends React.Component {
  state = {
    visibleDialog: null,
    id: null,
    commentToId: null,
    targetName: null,
  }
  _goBack = () => this.props.navigation.goBack();
  _onDelete = (id) => this._openDialog(id, 'delete');
  _onReply = (commentToId, targetName) => this.setState({ commentToId, targetName }, this._focusCommentInput);
  _cancelReply = () => this.setState({ commentToId: null, targetName: null }, this._blurCommentInput);
  _openDialog = (id, visibleDialog) => this.setState({
    visibleDialog,
    id,
    targetName: null,
    commentToId: null
  });
  _hideDialog = () => this.setState({ visibleDialog: null, id: null });
  _focusCommentInput = () => {
    this._commentsRef && this._commentsRef.focusCommentInput();
  };
  _blurCommentInput = () => {
    this._commentsRef && this._commentsRef.blurCommentInput();
  };
  _scrollDown = () => {
    this._commentsRef && this._commentsRef.scrollDown();
  }
  _onSubmit = (message) => {
    const input = {
      content: message,
      commentEventId: this.props.commentEventId
    };
    
    if (this.state.commentToId) input.commentToId = this.state.commentToId;
    this.props.onSubmit && this.props.onSubmit(input);
    this._cancelReply();
  };
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id });

  render() {
    const {
      visibleDialog,
      targetName
    } = this.state;
    const {
      loading,
      comments,
      data,
      onRefresh,
      error,
      fetchMoreComments,
      nextToken,
      user
    } = this.props;

    console.log(data);
    
    return (
      <>
      <Comments
        loading={loading}
        title={this.props.navigation.getParam('title')}
        error={Boolean(error)}
        comments={comments}
        userName={user.name}
        userPictureUrl={user.pictureUrl}
        userId={user.id}
        ref={commentsRef => this._commentsRef = commentsRef}
        targetName={targetName}
        goBack={this._goBack}
        handleDelete={this._onDelete}
        handleReply={this._onReply}
        cancelReply={this._cancelReply}
        onSubmit={this._onSubmit}
        onRefresh={onRefresh}
        navigateToProfile={this._navigateToProfile}
        fetchMoreComments={fetchMoreComments}
        nextToken={nextToken}
      />
      <DeleteCommentDialog
        id={this.state.id}
        commentEventId={this.props.commentEventId}
        visible={visibleDialog === 'delete'}
        handleDismiss={this._hideDialog}
      />
      </>
    )
  }
}
