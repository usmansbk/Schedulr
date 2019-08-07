import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.notifications.empty}>
      <Headline style={stores.appStyles.notifications.emptyTitle}>No messages</Headline>
    </View>
  )
));
