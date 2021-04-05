import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Linking, InteractionManager} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import NavigationService from 'config/navigation';
import {processRemoteNotification} from 'helpers/notification';
import Events from './Hoc';
// import {updateUserPushToken} from 'helpers/updatePreference';
import logger from 'config/logger';
import snackbar from 'helpers/snackbar';

/**
 * This component handles Local Notifications
 */
class Container extends React.Component {
  constructor(props) {
    super(props);
    this._handleDeeplink();
    this._handlePushNotifications();
  }

  _handlePushNotifications = () => {};

  onOpened = processRemoteNotification;

  onReceived = (received) => {
    InteractionManager.runAfterInteractions(() => {
      const {
        payload: {additionalData},
      } = received.getNotification();
      this.props.stores.notifications.fetchNotifications();
      if (additionalData && additionalData.type === 'Event') {
        this.props.stores.appState.deltaSync();
      }
    });
  };

  _handleNavBarColor = async () => {
    const {stores} = this.props;
    const colors = stores.theme.colors;

    try {
      const isDark = stores.settings.dark;
      const navColor = isDark ? colors.light_gray_2 : colors.bg;
      changeNavigationBarColor(navColor, !isDark);
    } catch (error) {
      snackbar(I18n.get('ERROR_failedToApplyTheme'), true);
      logger.logError(error);
    }
  };

  handleOpenURL = (event) => NavigationService.deepLinkNavigate(event.url);

  _handleDeeplink = async () => {
    try {
      const url = await Linking.getInitialURL();
      if (url) {
        NavigationService.deepLinkNavigate(url);
      }
    } catch (error) {
      this.props.snackbar.show(I18n.get('ERROR_navigationError'), true);
      logger.logError(error);
    }
  };

  _initNetInfo = () => {
    const {stores} = this.props;
    Linking.addEventListener('url', this.handleOpenURL);

    this.unsubscribe = NetInfo.addEventListener((state) => {
      stores.appState.toggleConnection(state.isConnected);
      if (state.isConnected) {
        stores.appState.removeKeysFromStorage();
      }
    });
  };

  componentDidMount = async () => {
    this._initNetInfo();
    await this._handleNavBarColor();
    InteractionManager.runAfterInteractions(() => {
      this.props.stores.calendar.sync();
      this.props.stores.settings.updateLanguage();
    });
  };

  componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
    this.unsubscribe();
  };

  _deltaSync = () => this.props.stores.appState.deltaSync();
  _fetchNotifications = () =>
    this.props.stores.notifications.fetchNotifications();

  render() {
    const {stores} = this.props;
    return (
      <Events
        id={stores.appState.userId}
        isConnected={stores.appState.isConnected}
        schdlAll={stores.reminder.setMultiple}
        fetchingUpdates={stores.appState.loading}
        deltaSync={this._deltaSync}
        fetchNotifications={this._fetchNotifications}
        calendarSync={stores.calendar.sync}
        calendarEvents={stores.calendar.transform}
      />
    );
  }
}

export default inject('stores')(observer(Container));
