import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import List from './ListHoc';

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