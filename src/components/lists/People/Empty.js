import React from 'react';
import { View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import ErrorScreen from 'components/common/Error';

export default inject('stores')(observer(
  ({ error, loading, stores, onRefresh, search }) =>{
    if (error) return <ErrorScreen
      onRefresh={onRefresh}
      loading={loading}
    />;
    return (
      <View style={stores.appStyles.eventsList.empty}>
        {
          loading ? <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/food-delivery.png')} /> : (
            <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/hiker-man.png')} />
          )
        }
        
        <Headline style={stores.appStyles.eventsList.emptyTitle}>
          { I18n.get(search ? "SEARCH_emptyList" : "FOLLOWERS_emptyList")}
        </Headline>
      </View>
    );  
  }
))