import React from 'react';
import {
  View,
} from 'react-native';
import {
  Headline,
  Button
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ onRefresh, loading, stores }) => (
    <View style={stores.appStyles.error.container}>
      <Headline style={stores.appStyles.error.headline}>
        Something went wrong. Please try again
      </Headline>
      {
        onRefresh && (
          <View style={stores.appStyles.error.content}>
            <Button
              icon="refresh"
              onPress={onRefresh}
              mode="outlined"
              loading={loading}
            >
            { loading ? "Loading..." : "Try again" }
            </Button>
          </View>
        )
      }
    </View>
  )
));
