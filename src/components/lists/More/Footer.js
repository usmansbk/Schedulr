import React from 'react';
import { List } from 'react-native-paper';
import { observer, inject } from 'mobx-react';
import Icon from 'components/common/Icon';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ openDialog, stores }) => (
    <List.Item
      left={() => <List.Icon
        icon={() => <Icon
          color={stores.themeStore.colors.light_red}
          size={24}
          name="logout"
        />}
      />}
      title={I18n.get("BUTTON_signout")}
      style={stores.appStyles.moreList.footer}
      onPress={openDialog}
    />
  )
));