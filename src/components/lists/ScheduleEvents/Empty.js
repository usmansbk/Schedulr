import React from 'react';
import { View, Image } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ error, loading, stores, isAuth }) =>{
    if (loading) return null;
    return (
      <View style={stores.appStyles.scheduleEvents.empty}>
        <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/calendar.png')} />
        <Headline style={stores.appStyles.scheduleEvents.emptyTitle}>
        {
          error ? I18n.get("ERROR_networkError") : I18n.get(isAuth ? 'SCHEDULES_noUpcomingEvents' : 'PROFILE_notVisibleToPublic')
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