import React from 'react';
import Comments from './Comments';
import DeleteCommentDialog from '../../dialogs/DeleteComment';

export default class Screen extends React.Component {
  state = {
    visibleDialog: null,
    id: null,
    replying: null,
    targetName: null,
  }
  _goBack = () => this.props.navigation.goBack();
  _onDelete = (id) => this._openDialog(id, 'delete');
  _onReply = (replying, targetName) => this.setState({ replying, targetName }, this._focusCommentInput);
  _cancelReply = () => this.setState({ replying: null, targetName: null });
  _openDialog = (id, visibleDialog) => this.setState({
    visibleDialog,
    id,
    targetName: null,
    replying: null
  });
  _hideDialog = () => this.setState({ visibleDialog: null, id: null });
  _focusCommentInput = () => {
    this._commentsRef && this._commentsRef.focusCommentInput();
  }

  render() {
    return (
      <React.Fragment>
      <Comments
        ref={commentsRef => this._commentsRef = commentsRef}
        id={this.state.replying}
        targetName={this.state.targetName}
        goBack={this._goBack}
        handleDelete={this._onDelete}
        handleReply={this._onReply}
        cancelReply={this._cancelReply}
      />
      <DeleteCommentDialog
        id={this.state.id}
        visible={this.state.visibleDialog === 'delete'}
        handleDismiss={this._hideDialog}
      />
      </React.Fragment>
    )
  }
}