import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ visible, stores }) => visible ? (
    <View style={stores.appStyles.schedulesList.footer}/>
  ) : null
));
