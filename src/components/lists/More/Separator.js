import React from 'react';
import { View } from 'react-native';
import { observer, inject } from 'mobx-react/native';

export default inject('stores')(observer(({ stores }) => (
  <View style={stores.appStyles.moreList.separator} />
))); 
