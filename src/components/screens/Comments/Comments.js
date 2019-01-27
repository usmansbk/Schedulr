import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Comments';
import CommentForm from '../../forms/Comment';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default class Comments extends React.Component {

  state = {
    showOptions: false,
    id: null
  }

  focusCommentInput = () => this._inputRef && this._inputRef.focusInput();

  blurCommentInput = () => this._inputRef && this._inputRef.blurInput();

  scrollDown = () => this._commentsListRef && this._commentsListRef.scrollDown();

  _handleSubmit = (message) => {
    this.props.onSubmit && this.props.onSubmit(message);
  };

  _handleDelete = () => {
    this.props.handleDelete(this.state.id);
    this._dismissActions();
  }

  _onLongPress = (id) => {
    this.setState(prev => ({ showOptions: !prev.showOptions, id: prev.id ? null : id }));
  };

  _dismissActions = () => this.setState({ showOptions: false, id: null });

  render() {
    const {
      loading,
      targetName,
      comments,
      me,
      error,
      onRefresh,
      goBack,
      title,
      handleReply,
      cancelReply,
      navigateToProfile
    } = this.props;

    return (
      <React.Fragment>
        <Appbar.Header style={styles.elevatedHeader}>
          <Appbar.BackAction onPress={goBack} color={colors.gray} />
          <Appbar.Content
            title={title || 'Comments'}
            titleStyle={styles.headerColor}
          />
          {
            this.state.showOptions && (
              <Appbar.Action
                icon="delete"
                onPress={this._handleDelete}
                color={colors.gray}
              />
            )
          }
        </Appbar.Header>
        <List
          ref={commentsRef => this._commentsListRef = commentsRef}
          error={error}
          loading={loading}
          comments={comments}
          onRefresh={onRefresh}
          handleReply={handleReply}
          handleDelete={this._handleDelete}
          navigateToProfile={navigateToProfile}
          onLongPressItem={this._onLongPress}
          onPressItem={this._dismissActions}
        />
        <CommentForm
          name={me && me.name || undefined}
          pictureUrl={me && me.pictureUrl || undefined}
          ref={inputRef => this._inputRef = inputRef}
          handleSubmit={this._handleSubmit}
          targetName={targetName}
          cancelReply={cancelReply}
        />
      </React.Fragment>
    );
  }
}