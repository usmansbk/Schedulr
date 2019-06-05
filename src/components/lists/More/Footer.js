import React from 'react';
import { List } from 'react-native-paper';
import { observer, inject } from 'mobx-react';

export default inject('stores')(observer(
  ({ openDialog, stores }) => (
    <List.Item
      left={() => <List.Icon color={stores.themeStore.colors.black} icon="exit-to-app" />}
      title="Sign out"
      style={stores.appStyles.moreList.footer}
      onPress={openDialog}
    />
  )
));