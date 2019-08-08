import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ error, loading, stores }) =>{
    if (loading) return null;
    return (
      <View style={stores.appStyles.bookmarkedEventsList.empty}>
        <Headline style={stores.appStyles.bookmarkedEventsList.emptyTitle}>
          You haven't saved any events yet
        </Headline>
      </View>
    );  
  }
))