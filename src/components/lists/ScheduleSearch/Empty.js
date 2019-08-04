import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ stores }) => {
    return (
      <View style={stores.appStyles.scheduleSearch.empty}>
        <Headline style={stores.appStyles.scheduleSearch.emptyTitle}>No results</Headline>
      </View>
    );
  }
));
