import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ visible, stores }) => visible ? (
    <View style={stores.appStyles.boardEvents.footer}>
      <Caption style={stores.appStyles.boardEvents.footerText}>No more events</Caption>
    </View>
  ) : null
));
