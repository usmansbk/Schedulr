import React from 'react';
import { TouchableRipple, Text } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ onPress, loading, stores, hasPrev }) => (
    <TouchableRipple
      disabled={loading || !hasPrev}
      onPress={onPress}
      style={stores.appStyles.eventsList.header}
    >
      <Text style={stores.appStyles.eventsList.headerText}>
        {
          hasPrev ? "Load past few days" : "No previous events"
        }
      </Text>
    </TouchableRipple>
  )
));
