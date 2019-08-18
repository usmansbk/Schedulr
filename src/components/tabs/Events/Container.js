import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import LocalNotifications from 'react-native-push-notification';
import SimpleToast from 'react-native-simple-toast';
import { Linking, Platform } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import moment from 'moment';
import { withApollo } from 'react-apollo';
import { inject, observer } from 'mobx-react';
import NavigationService from 'config/navigation';
import Events from './Hoc';

/**
 * This is component abstract app functionality from 
 * graphql queries.
 */
class Container extends React.Component {
  constructor(props) {
    super(props);
    this._handleDeeplink();
    this._handleLocalNotifications();
  }
  
  _handleLocalNotifications = () => {
    // Configure notifications for local events reminder
    LocalNotifications.configure({
      onNotification: notification => {
        const { data: { id, startAt, endAt } } = notification;
        let today = moment();
        const start = moment(startAt);
        const end = moment(endAt);
        const duration = Math.abs(moment.duration(start.diff(end)));

        let refStartAt, refEndAt;

        if (start.valueOf() >= today.valueOf()) {
          const hour = start.hours();
          const min = start.minutes();
          const sec = start.seconds();
          today.hours(hour);
          today.minutes(min);
          today.seconds(sec);
          refStartAt = start.valueOf();
          refEndAt = start.clone().add(duration).valueOf();
        }
        NavigationService.navigate('EventDetails', { id, refStartAt, refEndAt });
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      }
    });
  };
  
  _handleNavBarColor = async () => {
    const { stores } = this.props;
    const colors = stores.themeStore.colors;

    try {
      const isDark = stores.settingsStore.dark;
      const navColor = isDark ? colors.light_gray_2 : colors.bg;
      await changeNavigationBarColor(navColor, !isDark);
    } catch (error) {
      SimpleToast.show(error.message, SimpleToast.SHORT);
    }
  };

  handleOpenURL = event => NavigationService.deepLinkNavigate(event.url);

  _handleDeeplink = async () => {
    try {
      const url = await Linking.getInitialURL();
      if (url) {
        NavigationService.deepLinkNavigate(url);
      }
    } catch (error) {
      SimpleToast.show(error.message, SimpleToast.SHORT);
    }
  };

  _initNetInfo = () => {
    const { stores } = this.props;
    Linking.addEventListener('url', this.handleOpenURL);
    
    this.unsubscribe = NetInfo.addEventListener(state => {
      stores.appState.toggleConnection(state.isConnected);
    });
  };

  componentDidMount = async () => {
    this._initNetInfo();
    await this._handleNavBarColor();
  };

  componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
    this.unsubscribe();
  };

  render() {
    const { stores } = this.props;
    return <Events
      id={stores.appState.userId}
      mutedEvents={stores.appState.mutedEvents}
      allowedEvents={stores.appState.allowedEvents}
    />
  }
}

export default inject("stores")(observer(withApollo(Container)));