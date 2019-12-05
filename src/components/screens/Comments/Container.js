import React from 'react';
import uuidv5 from 'uuid/v5';
import shortid from 'shortid';
import Screen from './Screen';
import DeleteCommentDialog from 'components/dialogs/DeleteComment';

export default class Container extends React.Component {
  state = {
    visibleDialog: null,
    id: null,
    commentToId: null,
    at: null,
    targetName: null,
  }
  _goBack = () => this.props.navigation.goBack();
  _onDelete = (id) => this._openDialog(id, 'delete');
  _onReply = (commentToId, targetName, at) => this.setState({ commentToId, targetName, at }, this._focusCommentInput);
  _cancelReply = () => this.setState({ commentToId: null, targetName: null }, this._blurCommentInput);
  _openDialog = (id, visibleDialog) => this.setState({
    visibleDialog,
    id,
    at: null,
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
    const hash = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    const sort = shortid.generate();
    const id = `${hash}-${sort}`;
    const input = {
      id,
      content: message,
      commentEventId: this.props.commentEventId,
      commentScheduleId: this.props.commentScheduleId
    };
    
    if (this.state.commentToId) {
      input.commentToId = this.state.commentToId;
      input.commentAtId = this.state.at;
    }
    this.props.onSubmit && this.props.onSubmit(input);
    this._cancelReply();
  };
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id });
  _navigateToThread = (eventId, commentToId) => this.props.navigation.navigate('Thread', {
    id: eventId,
    commentToId,
    title: 'Replies',
  });

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      this.props.comments.length !== nextProps.comments.length ||
      this.props.loading !== nextProps.loading ||
      this.state.visibleDialog !== nextState.visibleDialog ||
      this.state.commentToId !== nextState.commentToId
    );
  }

  render() {
    const {
      visibleDialog,
      targetName
    } = this.state;
    
    const {
      loading,
      onRefresh,
      error,
      fetchMore,
      nextToken,
      user,
      comments,
      noReply,
    } = this.props;

    const uri = user.avatar ? getImageUrl(user.avatar) : user.pictureUrl;
    
    return (
      <>
      <Screen
        noReply={noReply}
        loading={loading}
        title={this.props.navigation.getParam('title')}
        error={Boolean(error)}
        comments={comments.sort((a, b) => -(Date.parse(a.createdAt) - Date.parse(b.createdAt)))}
        userName={user.name}
        userPictureUrl={uri}
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
        navigateToThread={this._navigateToThread}
        fetchMoreComments={fetchMore}
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
