import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import TabChild1Screen from './TabChild1Screen.js';
import ProfileHeader from './HeaderHoc';
import { withCollapsibleForTab } from 'react-navigation-collapsible';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  barStyle: {
    elevation: 2,
    backgroundColor: colors.white,
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  }
});

const TopTabNavigator = createMaterialTopTabNavigator(
  {
    Screen1: { screen: TabChild1Screen },
    Screen2: { screen: TabChild1Screen },
  },
  {
    animationEnabled: true,
    animationEnabled: true,
    initialLayout: { height: 0, width: Dimensions.get('window').width },
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray,
      upperCaseLabel: false,
      indicatorStyle: styles.indicatorStyle,
      style: styles.barStyle
    },
  }
);

// eslint-disable-next-line no-unused-vars
const GroupImageHeader = ({ navigation, collapsible }) => {
  const { translateY, translateOpacity, translateProgress } = collapsible;
  const id = navigation.getParam('id');
  return (
    <ProfileHeader
      id={id}
      translateY={translateY}
      translateOpacity={translateOpacity}
      translateProgress={translateProgress}
    />
  );
};


const collapsibleParams = {
  collapsibleComponent: GroupImageHeader,
  collapsibleBackgroundStyle: {
    height: 250,
    disableFadeoutInnerComponent: true,
    backgroundColor: colors.primary_light
  }
}

export default withCollapsibleForTab(TopTabNavigator, collapsibleParams);