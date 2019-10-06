import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import LocalNotifications from 'react-native-push-notification';
import SimpleToast from 'react-native-simple-toast';
import { Linking, Platform, PushNotificationIOS } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { inject, observer } from 'mobx-react';
import NavigationService from 'config/navigation';
import { processLocalNotification, processRemoteNotification } from 'helpers/notification';
import env from 'config/env';
import Events from './Hoc';

/**
 * This component handles Local Notifications
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
      senderID: env.FCM_SENDER_ID,
      onRegister: this.props.stores.notificationsStore.updatePushToken, 
      onNotification: notification => {
        console.log(notification);
        const { userInteraction, data } = notification;
        if (data && data.notificationType === 'local') {
          processLocalNotification(notification);
        } else {
          console.log(notification);
          if (userInteraction) {
            processRemoteNotification(notification);
          }
        }
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
      isConnected={stores.appState.isConnected}
    />
  }
}

export default inject("stores")(observer(Container));