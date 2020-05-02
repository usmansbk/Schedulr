import React from 'react';
import { I18n } from 'aws-amplify';
import uuidv5 from 'uuid/v5';
import shortid from 'shortid';
import Screen from './Screen';
import DeleteCommentDialog from 'components/dialogs/DeleteComment';
import Suspense from 'components/common/Suspense';

export default class Container extends React.Component {
  state = {
    visibleDialog: null,
    id: null,
    commentToId: null,
    at: null,
    targetName: null,
    meta: null,
    display: false
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
  };

  _goBack = () => this.props.navigation.goBack();
  _onDelete = (id, keys) => this._openDialog(id, 'delete', keys);
  _onReply = (commentToId, targetName, at) => {
    this._cancelReply();
    this.setState({ commentToId, targetName, at }, this._focusCommentInput);
  };
  _cancelReply = () => this.setState({ commentToId: null, targetName: null }, this._blurCommentInput);
  _openDialog = (id, visibleDialog, meta) => this.setState({
    visibleDialog,
    id,
    at: null,
    targetName: null,
    commentToId: null,
    meta
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
  };
  _onSubmit = async (message, attachment) => {
    const hash = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    const sort = shortid.generate();
    const id = `${hash}-${sort}`;
    const input = {
      id,
      content: message,
      commentEventId: this.props.commentEventId,
      commentScheduleId: this.props.commentScheduleId,
    };
    if (attachment) {
      input.attachment = attachment;
    }
    
    if (this.state.commentToId) {
      input.commentToId = this.state.commentToId;
      input.commentAtId = this.state.at;
    }
    this.props.onSubmit && this.props.onSubmit(input);
    this.setState({
      targetName: null,
      commentToId: null,
      commentAtId: null,
      at: null,
      meta: null
    });
  };
  _navigateToViewEmbed = ({ subtitle, uri, s3Object }) => this.props.navigation.navigate('ViewEmbed', {
    subtitle,
    uri,
    s3Object
  });
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id });
  // _navigateToThread = (eventId, commentToId) => this.props.navigation.navigate('Thread', {
  //   id: eventId,
  //   commentToId,
  //   title: I18n.get('Thread'),
  // });

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      this.state.display !== nextState.display ||
      this.props.comments.length !== nextProps.comments.length ||
      this.props.loading !== nextProps.loading ||
      this.state.visibleDialog !== nextState.visibleDialog ||
      this.state.commentToId !== nextState.commentToId
    );
  };

  render() {
    const {
      visibleDialog,
      targetName,
      display
    } = this.state;
    
    if (!display) return <Suspense />;
    
    const {
      loading,
      onRefresh,
      error,
      fetchMore,
      nextToken,
      user,
      comments,
      threadId,
      isOwner,
      commentEventId,
      notFound
    } = this.props;

    return (
      <>
      <Screen
        notFound={notFound}
        id={commentEventId}
        threadId={threadId}
        isOwner={isOwner}
        loading={loading}
        title={this.props.navigation.getParam('title')}
        error={Boolean(error)}
        comments={comments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))}
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
        navigateToViewEmbed={this._navigateToViewEmbed}
        fetchMoreComments={fetchMore}
        nextToken={nextToken}
      />
      <DeleteCommentDialog
        id={this.state.id}
        commentEventId={this.props.commentEventId}
        visible={visibleDialog === 'delete'}
        handleDismiss={this._hideDialog}
        attachment={this.state.meta}
      />
      </>
    );
  }
}
