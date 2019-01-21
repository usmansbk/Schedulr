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

  _handleSubmit = (message) => {
    this.props.onSubmit(message);
  };

  render() {
    const {
      id,
      targetName,
      goBack,
      title,
      handleReply,
      handleDelete,
      cancelReply
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
          handleReply={handleReply}
          handleDelete={handleDelete}
        />
        <CommentForm
          ref={inputRef => this._inputRef = inputRef}
          handleSubmit={this._handleSubmit}
          replying={id}
          targetName={targetName}
          cancelReply={cancelReply}
        />
      </React.Fragment>
    );
  }
}