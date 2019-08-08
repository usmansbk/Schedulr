import React from 'react';
import { View } from 'react-native';
import { I18n } from 'aws-amplify';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import ErrorScreen from 'components/common/Error';

export default inject('stores')(observer(
  ({ error, loading, stores, onRefresh }) =>{
    if (loading) return null;
    if (error) return <ErrorScreen
      onRefresh={onRefresh}
      loading={loading}
    />;
    return (
      <View style={stores.appStyles.eventsList.empty}>
        <Headline style={stores.appStyles.eventsList.emptyTitle}>
          {I18n.get("EVENTS_emptyList")}
        </Headline>
        {
          error && (
            <Paragraph style={stores.appStyles.eventsList.paragraph}>
              Check your internet connection. Pull to refresh.
            </Paragraph>
          )
        }
      </View>
    );  
  }
))