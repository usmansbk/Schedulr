import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ error, loading, search, stores }) =>{
    if (loading) return null;
    return (
      <View style={stores.appStyles.starredEventsList.empty}>
        <Headline style={stores.appStyles.starredEventsList.emptyTitle}>
        {
          error ? 'Network error' : `${search ? "No event found" : "You haven't starred any event yet"}`
        }
        </Headline>
        {
          error && (
            <Paragraph style={stores.appStyles.starredEventsList.paragraph}>
              Check your internet connection. Pull to refresh.
            </Paragraph>
          )
        }
      </View>
    );  
  }
))