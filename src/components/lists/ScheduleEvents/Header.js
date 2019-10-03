import React from 'react';
import {
  TouchableRipple,
  Caption,
  ActivityIndicator
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ loading, onPress, stores, hasPrev, hide }) => {
    if (hide) return null;
    return (
      <TouchableRipple 
        disabled={!hasPrev || loading}
        onPress={onPress}
        style={stores.appStyles.eventsList.loadPrevHeaderContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          {
            loading ? (
              <ActivityIndicator
                animating
                size={12}
                color={stores.themeStore.colors.primary_light}
              />
            ) : (
              <Caption style={stores.appStyles.eventsList.footerText}>
                {
                  hasPrev ? I18n.get("SCHEDULES_loadPastEvents")(hasPrev) : I18n.get("SCHEDULES_noMoreEvents")
                }
              </Caption>
            )
          }
        </View>
      </TouchableRipple>
    )
  }
))
