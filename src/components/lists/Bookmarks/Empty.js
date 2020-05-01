import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import { I18n } from 'aws-amplify';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

export default inject('stores')(observer(
  ({ error, loading, stores }) =>{
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
        {I18n.get("BOOKMARKS_emptyList")}
        </Headline>
      </View>
    );  
  }
))