import React from 'react';
import { List } from 'react-native-paper';
import { observer, inject } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';

export default inject('stores')(observer(
  ({ openDialog, stores }) => (
    <List.Item
      left={() => <List.Icon icon={() => <Icon color={stores.themeStore.colors.gray} size={24} name="log-out" />} />}
      title="Sign out"
      style={stores.appStyles.moreList.footer}
      onPress={openDialog}
    />
  )
));