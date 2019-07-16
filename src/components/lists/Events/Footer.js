import React from 'react';
import {
  TouchableRipple,
  Caption,
  ActivityIndicator
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import 'twix';

export default inject('stores')(observer(
  ({ loading, onPress, stores, hasMore, hide }) => {
    if (hide) return null;
    return loading ? (
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
              hasMore ? `After ${moment(hasMore).twix(hasPrev, { allDay: true }).format()}` : "No more events"
            }
          </Caption>
        </View>
      </TouchableRipple>
    )
  }
))
