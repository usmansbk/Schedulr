import React from 'react';
import {
  TouchableRipple,
  ActivityIndicator,
  Caption
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';

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
      <Caption style={stores.appStyles.eventsList.footerText}>
        {
          hasPrev ? "Load previous" : "No previous events"
        }
      </Caption>
    </TouchableRipple>
  )
));
