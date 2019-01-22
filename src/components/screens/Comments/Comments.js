import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Comments';
import CommentForm from '../../forms/Comment';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default class Comments extends React.Component {

  focusCommentInput = () => {
    this._inputRef && this._inputRef.focusInput();
  };

  blurCommentInput = () => {
    this._inputRef && this._inputRef.blurInput();
  };

  _handleSubmit = async (message) => {
    await this.props.onSubmit(message);
    this._commentsListRef && this._commentsListRef.scrollDown();
  };

  render() {
    const {
      loading,
      targetName,
      comments,
      onRefresh,
      goBack,
      title,
      handleReply,
      handleDelete,
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
        </Appbar.Header>
        <List
          ref={commentsRef => this._commentsListRef = commentsRef}
          loading={loading}
          comments={comments}
          onRefresh={onRefresh}
          handleReply={handleReply}
          handleDelete={handleDelete}
          navigateToProfile={navigateToProfile}
        />
        <CommentForm
          ref={inputRef => this._inputRef = inputRef}
          handleSubmit={this._handleSubmit}
          targetName={targetName}
          cancelReply={cancelReply}
        />
      </React.Fragment>
    );
  }
}