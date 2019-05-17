import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.loading.container}>
      <ActivityIndicator size="large" color={stores.themeStore.colors.primary} />
    </View>
  )
));
