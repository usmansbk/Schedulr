import React from 'react';
import { View, Image } from 'react-native';
import { I18n } from 'aws-amplify';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

export default inject('stores')(observer(
  ({ error, loading, stores, isBookmarks }) =>{
    if (loading) return <Loading />;
    if (error) return <Error />;
    return (
      <View style={stores.appStyles.bookmarkedEventsList.empty}>
        <Image
          resizeMode="contain"
          style={{ width: 200, height: 200 }}
          source={require('../../../assets/calendar.png')}
        />
        <Headline style={stores.appStyles.bookmarkedEventsList.emptyTitle}>
        { !isBookmarks && I18n.get('SCHEDULES_noUpcomingEvents')}
        { isBookmarks && I18n.get("BOOKMARKS_emptyList")}
        </Headline>
      </View>
    );  
  }
))