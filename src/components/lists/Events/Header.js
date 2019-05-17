import React from 'react';
import { TouchableRipple, ActivityIndicator, Text } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ onPress, loading, stores }) => (
    <TouchableRipple disabled={loading} onPress={onPress} style={stores.appStyles.eventsList.header}>
      <Text style={stores.appStyles.eventsList.headerText}>Load past few days</Text>
    </TouchableRipple>
  )
));
