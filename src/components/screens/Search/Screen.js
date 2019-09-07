import React from 'react';
import { Searchbar } from 'react-native-paper';
import { MaterialTopTabBar } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Dimensions } from 'react-native';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';
import Events from './Events';
import Schedules from './Schedules';
import People from './People';

const Tabs = createMaterialTopTabNavigator(
  {
    Schedules,
    Events,
    People
  },
  {
    initialRouteName: 'Schedules',
    initialLayout: { height: 0, width: Dimensions.get('window').width },
    animationEnabled: true,
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: {
      upperCaseLabel: false,
      labelStyle: {
        fontWeight: 'bold'
      }
    },
    navigationOptions: ({ navigation }) => {
      return ({
        header: <SearchBar navigation={navigation} />
      })
    },
    lazy: true,
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


const SearchBar = inject('stores')(observer(
  ({ navigation, stores }) => (
    <Searchbar
      icon={({ size, color }) => <Icon
        name="arrow-left"
        size={size}
        color={color}
      />}
      clearIcon={({size, color }) => <Icon name="x" size={size} color={color}  />}
      onIconPress={() => navigation.goBack()}
      autoFocus
      placeholder={I18n.get("SEARCH_inputPlaceholder")}
      placeholderTextColor={stores.themeStore.colors.placeholder}
      value={stores.appState.searchText}
      onChangeText={(value) => stores.appState.onChangeText(value)}
      style={{
        elevation: 0,
        backgroundColor: stores.themeStore.colors.bg,
        borderRadius: 0
      }}
    />
  )
));

export default Tabs;
