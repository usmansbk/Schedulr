import React from 'react';
import { Linking, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import SimpleToast from 'react-native-simple-toast';
import LocalNotifications from 'react-native-push-notification';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Events';
import FAB from 'components/common/Fab';
import NavigationService from 'config/navigation';
import schdlAll from 'helpers/setReminders';

@inject('stores')
@observer
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
        const { data: { id } } = notification;

        NavigationService.navigate('EventDetails', { id });
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      }
    });
  }
  
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
      await changeNavigationBarColor(navColor, isDark);
    } catch (error) {
      SimpleToast.show(error.message, SimpleToast.SHORT);
    }
  }
  
  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();
  
  componentDidUpdate = () => {
    const { events, stores } = this.props;
    schdlAll(
      events,
      stores.appState.mutedList,
      stores.appState.allowedList
    );
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

  render() {
    const {
      loading,
      events,
      nextToken,
      error,
      onRefresh,
      stores
    } = this.props;

    return (
      <>
        <List
          loading={loading}
          events={events}
          navigation={this.props.navigation}
          hasPreviousEvents={Boolean(nextToken)}
          onRefresh={onRefresh}
          error={error}
        />
        <FAB
          icon="edit"
          onPress={() => this.props.navigation.navigate('NewEvent')}
        />
      </>
    )
  }
}

