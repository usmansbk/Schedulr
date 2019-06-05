import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.explore.empty}>
      <Headline style={stores.appStyles.explore.emptyTitle}>
        Explore
      </Headline>
      <Caption style={stores.appStyles.explore.paragraph}>
        Nearby, sponsored and suggested events
      </Caption>
    </View>
  )
));
