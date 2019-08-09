import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ error, loading, stores }) =>{
    if (loading) return null;
    return (
      <View style={stores.appStyles.scheduleEvents.empty}>
        <Headline style={stores.appStyles.scheduleEvents.emptyTitle}>
        {
          error ? I18n.get("ERROR_networkError") : I18n.get("SCHEDULES_noUpcomingEvents")
        }
        </Headline>
        {
          error && (
            <Paragraph style={stores.appStyles.scheduleEvents.paragraph}>
              { I18n.get("ERROR_noInternetConnection")}
            </Paragraph>
          )
        }
      </View>
    );  
  }
))