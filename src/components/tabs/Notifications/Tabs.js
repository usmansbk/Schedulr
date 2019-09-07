import React from 'react';
import { Dimensions } from 'react-native';
import { MaterialTopTabBar } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { inject, observer } from 'mobx-react';
import Updates from './Updates';
import Messages from './Messages';

const Tabs = createMaterialTopTabNavigator(
  {
    Updates,
    Messages
  },
  {
    initialLayout: { height: 0, width: Dimensions.get('window').width },
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: {
      upperCaseLabel: true,
      labelStyle: {
        fontWeight: 'bold'
      }
    },
  }
);

const TabBarComponent = inject('stores')(observer(
  (props) => <MaterialTopTabBar
    activeTintColor={props.stores.themeStore.colors.primary}
    inactiveTintColor={props.stores.themeStore.colors.tint}
    indicatorStyle={props.stores.appStyles.userSchedulesTab.indicatorStyle}
    style={props.stores.appStyles.userSchedulesTab.barStyle}
    {...props}
  />
));

export default Tabs;