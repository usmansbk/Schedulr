import React from 'react';
import {View} from 'react-native';
import {inject, observer} from 'mobx-react';

export default inject('stores')(
  observer(({stores}) => <View style={stores.styles.peopleList.separator} />),
);
