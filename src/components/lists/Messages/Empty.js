import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.notifications.empty}>
      <Icon name="message" size={48} color={stores.themeStore.colors.gray} />
      <Headline style={stores.appStyles.notifications.emptyTitle}>No new notifications</Headline>
      <Caption style={stores.appStyles.notifications.paragraph}>All caught up!</Caption>
    </View>
  )
));
