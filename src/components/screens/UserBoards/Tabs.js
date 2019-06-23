import React from 'react';
import { Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import { inject, observer } from 'mobx-react';
import Following from './Following';
import Created from './Created';

const Tabs = createMaterialTopTabNavigator(
  {
    Following,
    Created,
  },
  {
    initialLayout: { height: 0, width: Dimensions.get('window').width },
    navigationOptions: ({ navigation }) => ({
      header: <HeaderComponent
        title={navigation.getParam('name', 'Boards')}
        goBack={() => navigation.goBack()}
      />
    }),
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: {
      upperCaseLabel: false,
    },
  }
);

const HeaderComponent = inject('stores')(observer(
  ({ stores, title, goBack }) => (
    <Appbar.Header style={stores.appStyles.styles.header}>
      <Appbar.BackAction
        onPress={goBack}
        color={stores.themeStore.colors.gray} 
      />
      <Appbar.Content
        title={title}
        titleStyle={stores.appStyles.styles.headerColor}
      />
    </Appbar.Header>
  )
));

const TabBarComponent = inject('stores')(observer(
  (props) => <MaterialTopTabBar
    activeTintColor={props.stores.themeStore.colors.primary}
    inactiveTintColor={props.stores.themeStore.colors.tint}
    indicatorStyle={props.stores.appStyles.userBoardsTab.indicatorStyle}
    style={props.stores.appStyles.userBoardsTab.barStyle}
    {...props}
  />
));

// export default withCollapsibleForTab(Tabs, collapsibleParams);

export default Tabs;