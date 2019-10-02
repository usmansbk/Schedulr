import React from 'react';
import { View, Image } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.discover.empty}>
      <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/map.png')} />
      <Headline style={stores.appStyles.discover.emptyTitle}>
        {I18n.get("DISCOVER_emptyList")}
      </Headline>
      <Caption style={stores.appStyles.discover.paragraph}>
        {I18n.get("DISCOVER_emptyListCaption")}
      </Caption>
    </View>
  )
));
