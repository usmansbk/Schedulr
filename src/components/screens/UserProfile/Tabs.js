import React from 'react';
import {
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { StyleSheet, Dimensions } from 'react-native';
import { withCollapsibleForTab } from 'react-navigation-collapsible';
import ProfileHeader from './HeaderHoc';
import Created from './Created';
import Following from './Following';
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

const Tabs = createMaterialTopTabNavigator(
  {
    Following,
    Created
  },
  {
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

const Header = ({ navigation, collapsible }) => {
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
  collapsibleComponent: Header,
  collapsibleBackgroundStyle: {
    height: 250,
    disableFadeoutInnerComponent: true,
    backgroundColor: colors.primary_light
  }
};

export default withCollapsibleForTab(Tabs, collapsibleParams);
