import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { inject, observer} from 'mobx-react';

export default inject('stores')(observer(
  ({ section, stores }) => {
    if (section.data.length) return null;
    return (
      <View style={stores.appStyles.eventsList.sectionFooter}>
        <Text style={stores.appStyles.eventsList.footerText}>No events</Text>
      </View>
    );
  }
))
