import React from 'react';
import { View } from 'react-native';
import { I18n } from 'aws-amplify';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ error, loading, stores }) =>{
    if (loading) return null;
    return (
      <View style={stores.appStyles.bookmarkedEventsList.empty}>
        <Headline style={stores.appStyles.bookmarkedEventsList.emptyTitle}>
          {
            I18n.get("BOOKMARKS_emptyList")
          }
        </Headline>
      </View>
    );  
  }
))