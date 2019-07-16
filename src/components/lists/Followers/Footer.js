import React from 'react';
import {
  TouchableRipple,
  Caption,
  ActivityIndicator
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ hide, loading, onPress, stores, hasMore }) => {
    if (hide) return null;
    return (
      <TouchableRipple
        disabled={!hasMore || loading}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          { 
            loading ? <ActivityIndicator animating size="small" /> : (
              hasMore && (
                <Caption style={stores.appStyles.eventsList.footerText}>
                  Load more
                </Caption>
              )
            )
          }
        </View>
      </TouchableRipple>
    )
  }
))
