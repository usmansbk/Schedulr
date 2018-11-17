import React from 'react';
import {
  ScrollView
} from 'react-native';
import {
  DrawerItems,
  SafeAreaView
} from 'react-navigation';
import ShareButton from '../ShareButton';
import UserInfo from '../../../containers/UserInfo';

const DrawerContentComponent = (props) => {
  return (
    <ScrollView>
      <SafeAreaView>
        <UserInfo { ...props } />
        <DrawerItems {...props} />
        <ShareButton />
      </SafeAreaView>
    </ScrollView>
  )
};

export default DrawerContentComponent;