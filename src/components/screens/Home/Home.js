import React from 'react';
import {Dimensions, StatusBar} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import MoreRoute from 'components/tabs/More';
import DiscoverTab from 'components/tabs/Discover';
import HomeRoute from 'components/tabs/Home';
import NotificationRoute from 'components/tabs/Notifications';
import NotificationsIcon from 'components/common/NotificationIcon';

const FONT_SIZE = 25;

const Home = createBottomTabNavigator(
  {
    Home: {
      screen: HomeRoute,
    },
    Discover: {screen: DiscoverTab},
    Notifications: {
      screen: NotificationRoute,
      path: 'notif',
    },
    More: {screen: MoreRoute},
  },
  {
    initialRouteName: 'Home',
    initialLayout: {height: 0, width: Dimensions.get('window').width},
    tabBarComponent: (props) => <TabBarComponent {...props} />,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
    },
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor, focused}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Discover') {
          iconName = 'search';
        } else if (routeName === 'More') {
          iconName = 'user';
        } else if (routeName === 'Notifications') {
          return (
            <NotificationsIcon
              focused={focused}
              size={FONT_SIZE}
              color={tintColor}
              name="notification"
            />
          );
        }
        return <Icon name={iconName} size={FONT_SIZE} color={tintColor} />;
      },
    }),
  },
);

const TabBarComponent = inject('stores')(
  observer((props) => (
    <>
      <StatusBar
        backgroundColor={props.stores.theme.colors.light_gray_2}
        barStyle={props.stores.settings.dark ? 'light-content' : 'dark-content'}
      />
      <BottomTabBar
        inactiveTintColor={props.stores.theme.colors.tint}
        activeTintColor={props.stores.theme.colors.primary}
        style={props.stores.styles.bottomTab.barStyle}
        {...props}
      />
    </>
  )),
);

export default Home;
