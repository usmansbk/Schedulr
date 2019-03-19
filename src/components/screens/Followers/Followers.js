import React from 'react';
import { Appbar } from 'react-native-paper';
import List from './ListHoc';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default ({
  id,
  goBack,
  isAuthor
}) => (
  <>
    <Appbar.Header style={styles.elevatedHeader}>
      <Appbar.BackAction onPress={goBack} color={colors.gray} />
      <Appbar.Content
        title="Followers"
        titleStyle={styles.headerColor}
      />
    </Appbar.Header>
    <List
      id={id}
      isAuthor={isAuthor}
    />
  </>
);