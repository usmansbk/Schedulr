import React from 'react';
import { View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

export default inject('stores')(observer(
  ({ error, loading, stores, isAuth }) =>{
    if (loading) return <Loading />;
    if (error) return <Error />;

    return (
      <View style={stores.appStyles.scheduleEvents.empty}>
        <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/calendar.png')} />
        <Headline style={stores.appStyles.scheduleEvents.emptyTitle}>
        { I18n.get(isAuth ? 'SCHEDULES_noUpcomingEvents' : 'PROFILE_notVisibleToPublic')}
        </Headline>
      </View>
    );  
  }
))