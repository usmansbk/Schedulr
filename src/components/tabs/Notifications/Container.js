import React from 'react';
import {inject, observer} from 'mobx-react';
import OneSignal from 'react-native-onesignal';
import Notifications from './Notifications';
import logger from 'config/logger';

class Container extends React.Component {
  componentDidMount = () => logger.log('notifications_screen');

  componentDidUpdate = () => {
    OneSignal.clearOneSignalNotifications();
  };

  _fetchUpdates = () => {
    this.props.stores.notifications.fetchNotifications();
    this.props.stores.appState.deltaSync();
  };

  _clearIndicator = () => {
    this.props.stores.notifications.resetCounter(0);
    this.props.stores.notifications.markSeen();
  };

  render() {
    const {stores} = this.props;
    const title = stores.notifications.filter;
    const styles = stores.styles.appStyles;
    const color = stores.theme.colors.primary;
    const allNotifications = stores.notifications.allNotifications;
    const isConnected = stores.appState.isConnected;
    const hasNotification = stores.notifications.count;

    return (
      <Notifications
        title={title}
        styles={styles}
        color={color}
        isConnected={isConnected}
        allNotifications={allNotifications}
        fetchUpdates={this._fetchUpdates}
        clearIndicator={this._clearIndicator}
        hasNotification={hasNotification}
      />
    );
  }
}

export default inject('stores')(observer(Container));
