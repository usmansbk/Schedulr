import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ visible, stores }) => visible ? (
    <View style={stores.appStyles.notifications.footer}>
      <Caption style={stores.appStyles.notifications.footerText}>You're all caught up!</Caption>
    </View>
  ) : null
));
