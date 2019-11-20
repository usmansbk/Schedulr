import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import Banner from 'components/ads/Banner';

export default inject("stores")(observer(({ stores }) => {
 return (
   <View style={stores.appStyles.eventsList.mediumRect}>
     <Banner medium_rect/>
   </View>
 ) 
}));