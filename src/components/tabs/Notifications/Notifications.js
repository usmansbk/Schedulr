import React from 'react';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Notifications';

class Notifications extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("NOTIFICATIONS_updatesTabLabel")
    };
  }
  
  render() {
    const { stores, navigation } = this.props;
   
    stores.notificationsStore.resetCounter();

    return (
      <List
        updates={stores.notificationsStore.updates}
        styles={stores.appStyles.notifications}
        navigation={navigation}
      />
    )
  }
}

export default inject("stores")(observer(Notifications));
