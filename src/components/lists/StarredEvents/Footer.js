import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ visible, stores }) => visible ? (
    <View style={stores.appStyles.starredEventsList.footer}>
      <Caption style={stores.appStyles.starredEventsList.footerText}>No more events</Caption>
    </View>
  ) : null
));
