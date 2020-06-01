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
  ({ loading, onPress, stores, count }) => {
    return (
      <TouchableRipple 
        disabled={!count || loading}
        onPress={onPress}
        style={stores.appStyles.eventsList.loadPrevHeaderContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          {
            loading ? (
              <ActivityIndicator
                animating
                size={12}
                color={stores.themeStore.colors.primary}
              />
            ) : (
              <Caption style={stores.appStyles.eventsList.footerText}>
                {
                  count ? I18n.get("SCHEDULES_loadPastEvents")(count) : I18n.get("SCHEDULES_noMoreEvents")
                }
              </Caption>
            )
          }
        </View>
      </TouchableRipple>
    )
  }
));