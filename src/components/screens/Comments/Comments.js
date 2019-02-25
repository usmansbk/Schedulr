import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Comments';
import CommentForm from '../../forms/Comment';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default class Comments extends React.Component {

  state = {
    id: null
  }

  focusCommentInput = () => this._inputRef && this._inputRef.focusInput();

  blurCommentInput = () => this._inputRef && this._inputRef.blurInput();

  scrollDown = () => this._commentsListRef && this._commentsListRef.scrollDown();

  _handleSubmit = (message) => {
    if (this.props.onSubmit) this.props.onSubmit(message);
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
      date,
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
            subtitle={date}
            titleStyle={styles.headerColor}
          />
        </Appbar.Header>
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
        />
        <CommentForm
          name={me.name}
          pictureUrl={me.pictureUrl}
          ref={inputRef => this._inputRef = inputRef}
          handleSubmit={this._handleSubmit}
          targetName={targetName}
          cancelReply={cancelReply}
        />
      </React.Fragment>
    );
  }
}