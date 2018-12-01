import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Comments';
import CommentInput from '../../common/CommentInput';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default ({
  goBack,
  title,
  handleReply,
  handleDelete,
  handleEdit
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
      handleEdit={handleEdit}
    />
    <CommentInput />
  </React.Fragment>
);