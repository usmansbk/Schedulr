import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.notifications.empty}>
      <Headline style={stores.appStyles.notifications.emptyTitle}>
      {I18n.get("SEARCH_peopleEmptyList")}
      </Headline>
    </View>
  )
));
