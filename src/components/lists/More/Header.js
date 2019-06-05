import React from 'react';
import { View } from 'react-native';
import { observer, inject } from 'mobx-react';
import AccountAvatar from 'components/common/AccountAvatar';

export default inject('stores')(observer(({ stores }) => (
  <View style={stores.appStyles.moreList.header}>
    <AccountAvatar />
  </View>
)));