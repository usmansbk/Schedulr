import React from 'react';
import { TouchableRipple, Text, ActivityIndicator } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ onPress, loading, stores, hasPrev }) => loading ? (
    <ActivityIndicator
      size="small"
      animating
      color={stores.themeStore.colors.primary_light}
    /> ) : (
    <TouchableRipple
      disabled={!hasPrev}
      onPress={onPress}
      style={stores.appStyles.eventsList.header}
    >
      <Text style={stores.appStyles.eventsList.headerText}>
        {
          hasPrev ? "Load previous events" : "No previous events"
        }
      </Text>
    </TouchableRipple>
  )
));
