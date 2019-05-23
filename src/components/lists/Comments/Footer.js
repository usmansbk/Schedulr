import React from 'react';
import {
  TouchableRipple,
  Caption,
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ hide, loading, onPress, stores, hasMore }) => (hide || loading) ? null : (
      <TouchableRipple
        disabled={!hasMore}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          <Caption style={stores.appStyles.eventsList.footerText}>
            {
              hasMore ? "Load more" : "No more comments"
            }
          </Caption>
        </View>
      </TouchableRipple>
    )
))
