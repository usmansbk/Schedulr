import React from 'react';
import SimpleToast from 'react-native-simple-toast';
import { inject } from 'mobx-react/native';
import Comments from './Comments';
import DeleteCommentDialog from '../../dialogs/DeleteComment';

@inject("stores")
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
  _scrollDown = () => {
    this._commentsRef && this._commentsRef.scrollDown();
  }
  _onSubmit = (message) => {
    const input = {
      content: message,
      eventId: this.props.eventId
    };
    
    if (this.state.toCommentId) input.toCommentId = this.state.toCommentId;
    try {
      this.props.onSubmit(input);
    } catch (error) {
      SimpleToast.show(error.message, SimpleToast.SHORT);
    }
    this._cancelReply();
    this._scrollDown();
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
      stores,
      onRefresh,
      error
    } = this.props;
    
    const me = stores.me.asJs();
    return (
      <>
      <Comments
        loading={loading}
        me={me}
        title={this.props.navigation.getParam('title')}
        error={Boolean(error)}
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
      </>
    )
  }
}