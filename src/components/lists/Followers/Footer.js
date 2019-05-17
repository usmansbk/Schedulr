import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';
import { BULLET } from 'lib/constants';

export default inject('stores')(observer(
  ({ visible, stores }) => visible ? (
    <View style={stores.appStyles.followersList.footer}>
      <Text style={stores.appStyles.followersList.footerText}>{BULLET}</Text>
    </View>
  ) : null
));
