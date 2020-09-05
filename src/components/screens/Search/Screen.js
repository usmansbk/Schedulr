import React from 'react';
import {Searchbar} from 'react-native-paper';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {Dimensions} from 'react-native';
import {inject, observer} from 'mobx-react';
import Icon from 'components/common/Icon';
import {I18n} from 'aws-amplify';
import Events from './Events';
import Schedules from './Schedules';

const Tabs = createMaterialTopTabNavigator(
  {
    Schedules,
    Events,
  },
  {
    initialRouteName: 'Schedules',
    initialLayout: {height: 0, width: Dimensions.get('window').width},
    animationEnabled: true,
    tabBarComponent: (props) => <TabBarComponent {...props} />,
    tabBarOptions: {
      upperCaseLabel: false,
      labelStyle: {
        fontWeight: 'bold',
      },
    },
    lazy: true,
    navigationOptions: ({navigation}) => ({
      header: () => <SearchBar navigation={navigation} />,
    }),
  },
);
const TabBarComponent = inject('stores')(
  observer((props) => (
    <MaterialTopTabBar
      activeTintColor={props.stores.theme.colors.primary}
      inactiveTintColor={props.stores.theme.colors.tint}
      indicatorStyle={props.stores.styles.userSchedulesTab.indicatorStyle}
      style={props.stores.styles.userSchedulesTab.barStyle}
      {...props}
    />
  )),
);

export const SearchBar = inject('stores')(
  observer(({navigation, stores}) => (
    <Searchbar
      icon={({size, color}) => (
        <Icon name="arrow-left" size={size} color={color} />
      )}
      iconColor={stores.theme.colors.primary}
      selectionColor={stores.theme.colors.primary_light}
      clearIcon={({size, color}) => <Icon name="x" size={size} color={color} />}
      onIconPress={() => navigation.goBack()}
      autoFocus
      placeholder={I18n.get('SEARCH_inputPlaceholder')(
        stores.location.searchLocation,
      )}
      placeholderTextColor={stores.theme.colors.placeholder}
      value={stores.appState.searchText}
      onChangeText={(value) => stores.appState.onChangeText(value)}
      style={{
        elevation: 0,
        backgroundColor: stores.theme.colors.bg,
        borderRadius: 0,
      }}
      numberOfLines={1}
    />
  )),
);

export default Tabs;
