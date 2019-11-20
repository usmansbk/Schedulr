import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import HeaderBanner from 'components/ads/HeaderBanner';

export default inject("stores")(observer(({ stores }) => {
 return (
   <View style={stores.appStyles.schedulesList.header}>
     <HeaderBanner />
   </View>
 ) 
}));