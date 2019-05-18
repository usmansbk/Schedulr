import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import { withCollapsibleForTab } from 'react-navigation-collapsible';
import { inject, observer } from 'mobx-react/native';
import Following from './Following';
import Created from './Created';
import colors from 'config/colors';

const styles = StyleSheet.create({
  barStyle: {
    elevation: 4,
    backgroundColor: colors.bg,
    borderTopWidth: 0
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  }
});

const Tabs = createMaterialTopTabNavigator(
  {
    Following,
    Created,
  },
  {
    initialLayout: { height: 0, width: Dimensions.get('window').width }, 
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('name', 'Boards'),
      headerTransparent: false,
      headerTitleStyle: { color: colors.gray },
      headerTintColor: colors.gray,
      headerStyle: {
        backgroundColor: colors.bg
      }
    }),
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: {
      upperCaseLabel: false,
    },
  }
);

const TabBarComponent = inject('stores')(observer(
  (props) => <MaterialTopTabBar
    activeTintColor={props.stores.themeStore.colors.primary}
    inactiveTintColor={props.stores.themeStore.colors.tint}
    indicatorStyle={props.stores.appStyles.userBoardsTab.indicatorStyle}
    style={props.stores.appStyles.userBoardsTab.barStyle}
    {...props}
  />
));

export default withCollapsibleForTab(Tabs, { iOSCollapsedColor: '#032' });