import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Comments';
import CommentForm from '../../forms/Comment';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default ({
  id,
  targetName,
  goBack,
  title,
  handleReply,
  handleDelete,
  cancelReply,
}) => (
  <React.Fragment>
    <Appbar.Header style={styles.header}>
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
      replying={id}
      targetName={targetName}
      cancelReply={cancelReply}
    />
  </React.Fragment>
);