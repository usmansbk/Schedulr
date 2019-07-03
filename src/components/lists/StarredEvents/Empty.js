import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ error, loading, stores }) =>{
    if (loading) return null;
    return (
      <View style={stores.appStyles.starredEventsList.empty}>
        <Headline style={stores.appStyles.starredEventsList.emptyTitle}>
          You haven't saved any event yet
        </Headline>
      </View>
    );  
  }
))