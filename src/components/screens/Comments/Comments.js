import React from 'react';
import Toast from 'react-native-simple-toast';
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
    try {
      await this.props.onSubmit(message);
      this._commentsListRef && this._commentsListRef.scrollDown();
    } catch (e) {
      Toast.show('Failed to post comment', Toast.SHORT);
      console.log(e);
    }
  };

  render() {
    const {
      loading,
      targetName,
      comments,
      me,
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
          name={me && me.name}
          pictureUrl={me && me.pictureUrl}
          ref={inputRef => this._inputRef = inputRef}
          handleSubmit={this._handleSubmit}
          targetName={targetName}
          cancelReply={cancelReply}
        />
      </React.Fragment>
    );
  }
}