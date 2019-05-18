import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ loading, onPress, stores, hasMore }) => {
    if (loading) return (
      <ActivityIndicator
        animating={loading}
        hideWhenStopped
        size="small"
      />
    );
    return (
      <TouchableRipple
        disabled={loading || !hasMore}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          <Text style={stores.appStyles.eventsList.footerText}>
            {
              hasMore ? "Load next few days" : "No more events"
            }
          </Text>
        </View>
      </TouchableRipple>
    )
  }
))
