import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Updates';

class Updates extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("NOTIFICATIONS_updatesTabLabel")
    };
  }

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();
  
  render() {
    const { stores, navigation } = this.props;
    stores.notificationsStore.setNotificationIndicator(false);
    
    return (
      <List
        updates={stores.notificationsStore.updates}
        styles={stores.appStyles.notifications}
        navigation={navigation}
      />
    )
  }
}

const withStores = inject("stores")(observer(Updates));

export default withNavigationFocus(withStores);