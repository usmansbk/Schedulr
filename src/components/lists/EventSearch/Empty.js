import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ error, loading, stores }) =>{
    if (loading) return null;
    return (
      <View style={stores.appStyles.bookmarkedEventsList.empty}>
        <Headline style={stores.appStyles.bookmarkedEventsList.emptyTitle}>
          { I18n.get("SEARCH_emptyList")}
        </Headline>
        {
          error && (
            <Paragraph style={stores.appStyles.bookmarkedEventsList.paragraph}>
              { I18n.get("ERROR_noInternetConnection")}
            </Paragraph>
          )
        }
      </View>
    );  
  }
))