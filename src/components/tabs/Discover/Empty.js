import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.discover.empty}>
      <Headline style={stores.appStyles.discover.emptyTitle}>
        {I18n.get("EXPLORE_emptyList")}
      </Headline>
      <Caption style={stores.appStyles.discover.paragraph}>
        {I18n.get("EXPLORE_emptyListCaption")}
      </Caption>
    </View>
  )
));
