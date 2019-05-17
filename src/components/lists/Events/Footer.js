import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ loading, onPress, stores }) => {
    if (loading) return (
      <ActivityIndicator
        animating={loading}
        hideWhenStopped
        size="small"
      />
    );
    return (
      <TouchableRipple onPress={onPress} style={stores.appStyles.eventsList.footerContainer}>
        <View style={stores.appStyles.eventsList.footerContent}>
          <Text style={stores.appStyles.eventsList.footerText}>Load next few days</Text>
        </View>
      </TouchableRipple>
    )
  }
))
