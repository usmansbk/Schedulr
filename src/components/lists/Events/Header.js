import React from 'react';
import {
  TouchableRipple,
  ActivityIndicator,
  Caption
} from 'react-native-paper';
import moment from 'moment';
import 'twix';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ onPress, loading, stores, hasPrev, hide }) => {
    const headerText = moment(hasPrev).twix(hasPrev, { allDay: true }).format();
    if (hide) return null;
    
    return loading ? (
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
            hasPrev ? `Before ${headerText}` : "No previous events"
          }
        </Caption>
      </TouchableRipple>
    )
  }
));
