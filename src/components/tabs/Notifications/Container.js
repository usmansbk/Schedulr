import React from 'react';
import {inject, observer } from 'mobx-react';
import Notifications from './Notifications';

class Container extends React.Component {
  render() {
    const styles = this.props.stores.appStyles.styles;
    return (
      <Notifications
        stores={this.props.stores}
        styles={styles}
        title={this.props.stores.notificationsStore.filter}
        hasNotifications={this.props.stores.notificationsStore.allNotifications.length}
      />
    );
  }
}

export default inject("stores")(observer(Container));