import React from 'react';
import {
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { StyleSheet, Dimensions } from 'react-native';
import { withCollapsibleForTab } from 'react-navigation-collapsible';
import UserProfile from './HeaderHoc';
import Created from './Created';
import Following from './Following';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  barStyle: {
    elevation: 2,
    backgroundColor: '#fff',
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  }
});

const Tabs = createMaterialTopTabNavigator(
  {
    Following,
    Created
  },
  {
    animationEnabled: true,
    // initialLayout: { height: 0, width: Dimensions.get('window').width },
    navigationOptions: {
      title: 'More'
    },
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray,
      upperCaseLabel: false,
      indicatorStyle: styles.indicatorStyle,
      style: styles.barStyle
    },
  }
);

const ProfileHeader = ({ navigation, collapsible }) => {
  const { translateY, translateOpacity, translateProgress } = collapsible;
  const id = navigation.getParam('id');
  return (
    <UserProfile
      id={id}
      translateY={translateY}
      translateOpacity={translateOpacity}
      translateProgress={translateProgress}
    />
  );
};

const collapsibleParams = {
  collapsibleComponent: ProfileHeader,
  collapsibleBackgroundStyle: {
    height: 280,
    disableFadeoutInnerComponent: true
  }
};

export default withCollapsibleForTab(Tabs, collapsibleParams);
