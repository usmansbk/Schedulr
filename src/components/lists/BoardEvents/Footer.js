import React from 'react';
import {
  TouchableRipple,
  Caption,
  ActivityIndicator
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ loading, onPress, stores, hasPrev, hide }) => {
    if (hide) return null;
    return (
      <TouchableRipple
        disabled={!hasPrev || loading}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          {
            loading ? (
              <ActivityIndicator
                animating
                size="small"
                color={stores.themeStore.colors.primary_light}
              />
            ) : (
              <Caption style={stores.appStyles.eventsList.footerText}>
                {
                  hasPrev ? "Load past events" : "No more events"
                }
              </Caption>
            )
          }
        </View>
      </TouchableRipple>
    )
  }
))
