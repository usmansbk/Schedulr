import React from 'react';
import { View } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import EventsRoute from '../../routes/Events';
import GroupsRoute from '../../routes/Groups';
import AccountRoute from '../../routes/Account';
import StarredRoute from '../../routes/Starred';
import SearchRoute from '../../routes/Search';
import HomeRoute from '../../routes/Home';
import NotificationRoute from '../../routes/Notifications';
import styles, { activeColor } from './styles';

const Home = createMaterialBottomTabNavigator({
  Home: { screen: HomeRoute },
  Search: { screen: SearchRoute },
  Notifications: { screen: NotificationRoute },
  Account: { screen: AccountRoute }
}, {
  initialRouteName: 'Home',
  activeColor,
  barStyle: styles.barStyle,
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home'
      } else if (routeName === 'Search') {
        iconName = 'search';
      } else if (routeName === 'Notifications') {
        iconName = `notifications${focused ? '' : '-none'}`;
      } else if (routeName === 'Account') {
        iconName = 'menu';
      }
      return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
    }
  })
});

export default createAppContainer(Home);

// export default class Home extends React.Component {
//   state = {
//     index: 0,
//     routes: [
//       { key: 'events', title: 'Events', icon: 'date-range'},
//       { key: 'groups', title: 'Groups', icon: 'group-work' },
//       { key: 'starred', title: 'Starred', icon: 'star-border'},
//       { key: 'account', title: 'Account', icon: 'menu' }
//     ],
//   };

//   _getTitle = () => moment().format('dddd, Do');

//   _handleIndexChange = index => this.setState({ index });

//   _renderScene = BottomNavigation.SceneMap({
//     events: EventsRoute,
//     groups: GroupsRoute,
//     starred: StarredRoute,
//     account: AccountRoute
//   });

//   render() {
//     return (
//       <View style={styles.container}>
//         <Appbar.Header>
//           <Appbar.Content title={this._getTitle()}/>
//           <Appbar.Action icon="notifications-none" />
//           <Appbar.Action icon="search" />
//         </Appbar.Header>
//         <BottomNavigation
//           activeColor={activeColor}
//           barStyle={styles.barStyle}
//           navigationState={this.state}
//           onIndexChange={this._handleIndexChange}
//           renderScene={this._renderScene}
//         />
//       </View>
//     )
//   }
// }