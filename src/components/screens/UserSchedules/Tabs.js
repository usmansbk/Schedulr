import React from 'react';
import { Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'components/common/Icon';
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
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: {
      upperCaseLabel: false,
      labelStyle: {
        fontWeight: 'bold'
      }
    },
    navigationOptions: ({ navigation }) => ({
      header: () => <HeaderComponent
        title={navigation.getParam('name')}
        goBack={() => navigation.goBack()}
      />
    })
  }
);

export const HeaderComponent = inject('stores')(observer(
  ({ stores, title, goBack }) => (
    <Appbar.Header style={stores.appStyles.styles.header}>
      <Appbar.Action
        onPress={goBack}
        icon={() => <Icon
          name="arrow-left"
          color={stores.themeStore.colors.primary}
          size={24}
        />}
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
    indicatorStyle={props.stores.appStyles.userSchedulesTab.indicatorStyle}
    style={props.stores.appStyles.userSchedulesTab.barStyle}
    {...props}
  />
));

export default Tabs;