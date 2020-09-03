import React from 'react';
import {View} from 'react-native';
import {inject, observer} from 'mobx-react';

export default inject('stores')(
  observer(({stores}) => {
    return <View style={stores.styles.schedulesList.header}></View>;
  }),
);
