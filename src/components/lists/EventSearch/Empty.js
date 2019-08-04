import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ error, loading, stores }) =>{
    if (loading) return null;
    return (
      <View style={stores.appStyles.bookmarkedEventsList.empty}>
        <Headline style={stores.appStyles.bookmarkedEventsList.emptyTitle}>
          No nearby events
        </Headline>
        {
          error && (
            <Paragraph style={stores.appStyles.bookmarkedEventsList.paragraph}>
              Check your internet connection. Pull to refresh.
            </Paragraph>
          )
        }
      </View>
    );  
  }
))