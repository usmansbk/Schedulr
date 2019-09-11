import React from 'react';
import { Dimensions, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
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
    lazy: true,
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
    renderBadge={({ route }) => {
      const { routeName } = route;
      if (routeName === 'Messages') return (
        <View style={props.stores.appStyles.notifications.counter}>
          <Badge>{props.stores.notificationsStore.newCommentsCount}</Badge>
        </View>
      );
      return null;
    }}
    {...props}
  />
));

export default Tabs;