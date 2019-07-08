import React from 'react';
import {
  TouchableRipple,
  Caption,
  ActivityIndicator
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ visible, loading, onPress, stores, hasMore }) => {
    if (!visible) return null;
    return (loading) ? <ActivityIndicator style={{ margin: 8 }} animating size="small" /> : (
      <TouchableRipple
        disabled={!hasMore}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          <Caption style={stores.appStyles.eventsList.footerText}>
            {
              hasMore ? "Load more" : "No more results"
            }
          </Caption>
        </View>
      </TouchableRipple>
    );
  }
))
