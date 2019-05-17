import React from 'react';
import { View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.eventSearch.empty}>
      <Headline style={stores.appStyles.eventSearch.emptyTitle}>
        Find an event
      </Headline>
    </View>
  )
));
