import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ stores }) => {
    return (
      <View style={stores.appStyles.boardSearch.empty}>
        <Headline style={stores.appStyles.boardSearch.emptyTitle}>Not found</Headline>
      </View>
    );
  }
));
