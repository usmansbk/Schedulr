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
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ loading, onPress, stores, hasMore, hide }) => {
    const nextMoment = hasMore ? moment(hasMore) : moment();
    if (hide) return null;
    return (
      <TouchableRipple
        disabled={!hasMore || loading}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          {
            loading ? (
              <ActivityIndicator
                animating
                size={20}
                color={stores.themeStore.colors.primary}
                style={{
                  margin: 4
                }}
              />
            ) : (
              <Caption style={stores.appStyles.eventsList.footerText}>
                {
                I18n.get(`EVENTS_SECTIONLIST_${hasMore ? 'after' : 'noMoreEvents'}`)(nextMoment.twix(nextMoment, { allDay: true }).format())
                }
              </Caption>
            )
          }
        </View>
      </TouchableRipple>
    );
  }
))
