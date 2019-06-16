import React from 'react';
import {
  TouchableRipple,
  Caption,
  ActivityIndicator
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ loading, onPress, stores, hasMore }) => loading ? (
    <ActivityIndicator
      animating
      size="small"
      color={stores.themeStore.colors.primary_light}
    /> ) : (
      <TouchableRipple
        disabled={!hasMore}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          <Caption style={stores.appStyles.eventsList.footerText}>
            {
              hasMore ? "Load next week" : "No more events"
            }
          </Caption>
        </View>
      </TouchableRipple>
    )
))
