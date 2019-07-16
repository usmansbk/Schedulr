import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ error, loading, stores }) =>{
    if (loading) return null;
    return (
      <View style={stores.appStyles.boardEvents.empty}>
        <Headline style={stores.appStyles.boardEvents.emptyTitle}>
        {
          error ? 'Network error' : 'No upcoming events'
        }
        </Headline>
        {
          error && (
            <Paragraph style={stores.appStyles.boardEvents.paragraph}>
              Check your internet connection. Pull to refresh.
            </Paragraph>
          )
        }
      </View>
    );  
  }
))