import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';
import List from './ListHoc';
import styles from 'config/styles';
import colors from 'config/colors';

export default inject('stores')(observer(
  ({
    id,
    goBack,
    isAuthor,
    stores
  }) => (
    <>
      <Appbar.Header style={stores.appStyles.styles.elevatedHeader}>
        <Appbar.BackAction onPress={goBack} color={stores.themeStore.colors.gray} />
        <Appbar.Content
          title="Followers"
          titleStyle={stores.appStyles.styles.headerColor}
        />
      </Appbar.Header>
      <List
        id={id}
        isAuthor={isAuthor}
      />
    </>
  )
));