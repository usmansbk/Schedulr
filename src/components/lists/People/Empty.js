import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import ErrorScreen from 'components/common/Error';

export default inject('stores')(observer(
  ({ error, loading, stores, onRefresh, search }) =>{
    if (loading) return null;
    if (error) return <ErrorScreen
      onRefresh={onRefresh}
      loading={loading}
    />;
    return (
      <View style={stores.appStyles.eventsList.empty}>
        <Headline style={stores.appStyles.eventsList.emptyTitle}>
          { I18n.get(search ? "SEARCH_emptyList" : "FOLLOWERS_emptyList")}
        </Headline>
      </View>
    );  
  }
))