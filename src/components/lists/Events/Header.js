import React from 'react';
import {
  TouchableRipple,
  ActivityIndicator,
  Caption
} from 'react-native-paper';
import moment from 'moment';
import 'twix';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ onPress, loading, stores, hasPrev, hide }) => {
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
             I18n.get(`EVENTS_SECTIONLIST_${hasPrev ? 'before' : 'noPrevEvents'}`)(moment(hasPrev).twix(hasPrev, { allDay: true }).format())
          }
        </Caption>
      </TouchableRipple>
    )
  }
));
