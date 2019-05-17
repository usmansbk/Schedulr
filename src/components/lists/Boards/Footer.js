import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ visible, stores }) => visible ? (
    <View style={stores.appStyles.boardsList.footer}>
      <Text style={stores.appStyles.boardsList.footerText}>No more calendars</Text>
    </View>
  ) : null
));
