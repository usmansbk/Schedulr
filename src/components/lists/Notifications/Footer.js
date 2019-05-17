import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ visible, stores }) => visible ? (
    <View style={stores.appStyles.notifications.footer}>
      <Text style={stores.appStyles.notifications.footerText}>You've caught up!</Text>
    </View>
  ) : null
));
