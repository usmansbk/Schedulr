import React from 'react';
import { Searchbar } from 'react-native-paper';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar
} from 'react-navigation-tabs';
import { Dimensions } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import Events from './Events';
import Calendars from './Boards';

const Tabs = createMaterialTopTabNavigator(
  {
    Calendars,
    Events
  },
  {
    initialRouteName: 'Calendars',
    initialLayout: { height: 0, width: Dimensions.get('window').width },
    animationEnabled: true,
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: {
      upperCaseLabel: false,
    },
    navigationOptions: ({ navigation }) => {
      return ({
        header: <SearchBar navigation={navigation} />
      })
    },
    lazy: true
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


const SearchBar = inject('stores')(observer(
  ({ navigation, stores }) => (
    <Searchbar
      icon="arrow-back"
      onIconPress={() => navigation.goBack()}
      placeholder="Search for..."
      placeholderTextColor={stores.themeStore.colors.placeholder}
      value={stores.appState.query}
      onChangeText={(query) => stores.appState.onChangeText(query)}
      style={{
        elevation: 0,
        backgroundColor: stores.themeStore.colors.bg,
        borderRadius: 0
      }}
    />
  )
));

export default Tabs;
