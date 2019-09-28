import React from 'react';
import { View } from 'react-native';
import { I18n } from 'aws-amplify';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import ErrorScreen from 'components/common/Error';

export default inject('stores')(observer(
  ({ error, loading, stores, onRefresh, isAuth }) =>{
    if (loading) return null;
    if (error) return <ErrorScreen
      onRefresh={onRefresh}
      loading={loading}
    />;
    return (
      <View style={stores.appStyles.eventsList.empty}>
        <Headline style={stores.appStyles.eventsList.emptyTitle}>
          {I18n.get(isAuth ? "EVENTS_emptyList" : 'PROFILE_notVisibleToPublic')}
        </Headline>
        {
          error && (
            <Paragraph style={stores.appStyles.eventsList.paragraph}>
              {I18n.get("ERROR_noInternetConnection")}
            </Paragraph>
          )
        }
      </View>
    );  
  }
))