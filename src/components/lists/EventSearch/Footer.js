import React from 'react';
import {
  TouchableRipple,
  Caption,
  ActivityIndicator
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ visible, loading, onPress, stores, hasMore }) => {
    if (!visible) return null;
    return (loading) ? <ActivityIndicator style={{ margin: 8 }} animating size={12} /> : (
      <TouchableRipple
        disabled={!hasMore}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          <Caption style={stores.appStyles.eventsList.footerText}>
            {
              hasMore ? I18n.get("SEARCH_loadMore") : I18n.get("SEARCH_noMoreResults")
            }
          </Caption>
        </View>
      </TouchableRipple>
    );
  }
))
