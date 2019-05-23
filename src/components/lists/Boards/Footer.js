import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ visible, stores }) => visible ? (
    <View style={stores.appStyles.boardsList.footer}>
      <Caption style={stores.appStyles.boardsList.footerText}>No more calendars</Caption>
    </View>
  ) : null
));
