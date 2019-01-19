import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Followers';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default ({
  goBack,
  isAuthor
}) => (
  <React.Fragment>
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={goBack} color={colors.gray} />
      <Appbar.Content
        title="Followers"
        titleStyle={styles.headerColor}
      />
    </Appbar.Header>
    <List
      isAuthor={isAuthor}
    />
  </React.Fragment>
);