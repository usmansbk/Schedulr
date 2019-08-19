import React from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ stores }) => {
    return (
      <View style={stores.appStyles.scheduleSearch.empty}>
        <Headline style={stores.appStyles.scheduleSearch.emptyTitle}>{I18n.get("SEARCH_emptyList")}</Headline>
      </View>
    );
  }
));
