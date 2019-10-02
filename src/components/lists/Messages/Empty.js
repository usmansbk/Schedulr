import React from 'react';
import { View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.notifications.empty}>
      <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/support-woman.png')} />
      <Headline style={stores.appStyles.notifications.emptyTitle}>
      {I18n.get("NOTIFICATIONS_emptyMessagesList")}
      </Headline>
    </View>
  )
));
