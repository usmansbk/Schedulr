import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.notifications.empty}>
      <Headline style={stores.appStyles.notifications.emptyTitle}>{I18n.get("NOTIFICATIONS_emptyUpdatesList")}</Headline>
      <Caption style={stores.appStyles.notifications.paragraph}>{I18n.get("NOTIFICATIONS_emptyUpdatesListCaption")}</Caption>
    </View>
  )
));
