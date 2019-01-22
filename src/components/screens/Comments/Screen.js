import React from 'react';
import Comments from './Comments';
import DeleteCommentDialog from '../../dialogs/DeleteComment';

export default class Screen extends React.Component {
  state = {
    visibleDialog: null,
    id: null,
    toCommentId: null,
    targetName: null,
  }
  _goBack = () => this.props.navigation.goBack();
  _onDelete = (id) => this._openDialog(id, 'delete');
  _onReply = (toCommentId, targetName) => this.setState({ toCommentId, targetName }, this._focusCommentInput);
  _cancelReply = () => this.setState({ toCommentId: null, targetName: null }, this._blurCommentInput);
  _openDialog = (id, visibleDialog) => this.setState({
    visibleDialog,
    id,
    targetName: null,
    toCommentId: null
  });
  _hideDialog = () => this.setState({ visibleDialog: null, id: null });
  _focusCommentInput = () => {
    this._commentsRef && this._commentsRef.focusCommentInput();
  };
  _blurCommentInput = () => {
    this._commentsRef && this._commentsRef.blurCommentInput();
  };
  _onSubmit = async (message) => {
    const input = {
      content: message,
      toCommentId: this.state.toCommentId,
      eventId: this.props.eventId
    };
    await this.props.onSubmit(input);
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
      me,
      onRefresh,
      error
    } = this.props;
    // if (error) {
    //   alert(error);
    // }
    return (
      <React.Fragment>
      <Comments
        loading={loading}
        me={me}
        comments={comments}
        ref={commentsRef => this._commentsRef = commentsRef}
        targetName={targetName}
        goBack={this._goBack}
        handleDelete={this._onDelete}
        handleReply={this._onReply}
        cancelReply={this._cancelReply}
        onSubmit={this._onSubmit}
        onRefresh={onRefresh}
        navigateToProfile={this._navigateToProfile}
      />
      <DeleteCommentDialog
        id={this.state.id}
        eventId={this.props.eventId}
        visible={visibleDialog === 'delete'}
        handleDismiss={this._hideDialog}
      />
      </React.Fragment>
    )
  }
}