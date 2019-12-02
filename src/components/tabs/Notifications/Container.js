import React from 'react';
import { inject, observer } from 'mobx-react';
import OneSignal from 'react-native-onesignal';
import Notifications from './Notifications';

class Container extends React.Component {
  componentDidUpdate = () => {
    OneSignal.clearOneSignalNotifications();
  };

  _fetchUpdates = () => {
    this.props.stores.notificationsStore.fetchNotifications();
    this.props.stores.appState.deltaSync();
  };

  _clearIndicator = () => {
    this.props.stores.notificationsStore.resetCounter(0);
    this.props.stores.notificationsStore.markSeen();
  };

  render() {
    const { stores } = this.props;
    const title = stores.notificationsStore.filter;
    const styles = stores.appStyles.styles;
    const color = stores.themeStore.colors.primary;
    const allNotifications = stores.notificationsStore.allNotifications;
    const isConnected = stores.appState.isConnected;
    const hasNotification = stores.notificationsStore.count;

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

export default inject("stores")(observer(Container));