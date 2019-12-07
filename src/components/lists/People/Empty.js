import React from 'react';
import { View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Error from 'components/common/Error';
import Loading from 'components/common/Loading';

export default inject('stores')(observer(
  ({ error, loading, stores, search, isBookmarks }) =>{
    if (error) return <Error />;
    if (loading) return <Loading />;
    return (
      <View style={stores.appStyles.eventsList.empty}>
        {
          search ? <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/error-404.png')} /> : (
            <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/hiker-man.png')} />
          )
        }
        <Headline style={stores.appStyles.eventsList.emptyTitle}>
          { I18n.get(search ? "SEARCH_emptyList" : ( isBookmarks ? 'BOOKMARKS_BY_emptyList' : "FOLLOWERS_emptyList"))}
        </Headline>
      </View>
    );  
  }
))