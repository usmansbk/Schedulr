import React from 'react';
import {
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { BULLET } from 'lib/constants';

export default inject('stores')(observer(
  ({ loading, onPress, stores, hasMore }) => loading ? null : (
      <TouchableRipple
        disabled={!hasMore}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}
      >
        <View style={stores.appStyles.eventsList.footerContent}>
          <Text style={stores.appStyles.eventsList.footerText}>
            {
              hasMore ? "Load more" : BULLET
            }
          </Text>
        </View>
      </TouchableRipple>
    )
))
