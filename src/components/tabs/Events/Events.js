import React from 'react';
import { Linking, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import SimpleToast from 'react-native-simple-toast';
import LocalNotifications from 'react-native-push-notification';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import moment from 'moment';
import memoize from 'memoize-one';
import List from 'components/lists/Events';
import FAB from 'components/common/Fab';
import NavigationService from 'config/navigation';
import schdlAll from 'helpers/setReminders';

export default class Events extends React.Component {
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
  
  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };
  
  componentDidUpdate = () => {
    const { stores, loading } = this.props;
    if (!loading) {
      schdlAll(
        this.events,
        stores.appState.mutedEvents,
        stores.appState.allowedEvents
      );
    }
  };
 
  componentDidMount = async () => {
    this._initNetInfo();
    await this._handleNavBarColor();
  };

  componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
    this.unsubscribe();
  };

  handleOpenURL = event => NavigationService.deepLinkNavigate(event.url);

  _navigateToNewEvent = () => {
    this.props.navigation.navigate('NewEvent');
  };

  _onRefresh = () => this.props.onRefresh();

  _getEvents = memoize(
    (data) => {
      let events = [];
      if (!data) return events;
    
      const { created, following, bookmarks } = data;
    
      created.items.forEach(schedule => {
        events = events.concat(schedule.events.items);
      });
      following.items.forEach(schedule => {
        events = events.concat(schedule.events.items);
      });
      return events;
    }
  );

  get events() {
    return this._getEvents(this.props.data);
  }

  render() {
    const {
      loading,
      error,
      navigation,
    } = this.props;

    return (
      <>
        <List
          loading={loading}
          events={this.events}
          navigation={navigation}
          onRefresh={this._onRefresh}
          error={error}
        />
        <FAB
          icon="edit-2"
          onPress={this._navigateToNewEvent}
        />
      </>
    )
  }
}