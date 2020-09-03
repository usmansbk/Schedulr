import React from 'react';
import {View} from 'react-native';
import {observer, inject} from 'mobx-react';

export default inject('stores')(
  observer(({stores}) => <View style={stores.styles.moreList.separator} />),
);
