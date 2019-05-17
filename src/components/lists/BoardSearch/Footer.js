import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ visible, stores }) => visible ? (
    <View style={stores.appStyles.boardSearch.footer}>
      <Text style={stores.appStyles.boardSearch.footerText}>No more calendars</Text>
    </View>
  ) : null
));
