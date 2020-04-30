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
  ({ hide, loading, onPress, stores, hasMore }) => {
    // if (hide) return null;
    return (
      // <TouchableRipple
      //   disabled={!hasMore || loading}
      //   onPress={onPress}
      //   style={stores.appStyles.eventsList.footerContainer}
      // >
        <View style={stores.appStyles.eventsList.footerContainer}>
        {/* {
          loading ? <ActivityIndicator  size={12} /> : (
            <Caption style={stores.appStyles.eventsList.footerText}>
              {
                hasMore ? I18n.get("COMMENTS_loadMore") : I18n.get("COMMENTS_noMoreComments")
              }
            </Caption>
          )
        } */}
        </View>
      // </TouchableRipple>
    );
  }
))
