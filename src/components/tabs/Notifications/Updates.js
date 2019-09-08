import React from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Updates';
import Fab from 'components/common/Fab';

class Updates extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("NOTIFICATIONS_updatesTabLabel")
    };
  }

  _clearNotifications = () => {
    const { stores } = this.props;
    Alert.alert(I18n.get("ALERT_clearNotifications"), "", [
        { text: I18n.get("BUTTON_dismiss"), onPress: () => null },
        { text: I18n.get("BUTTON_ok"), onPress: stores.notificationsStore.clearNotifications }
     ]);
  };

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();
  
  render() {
    const { stores, navigation } = this.props;
    stores.notificationsStore.setNotificationIndicator(false);
    
    return (
      <>
        <List
          updates={stores.notificationsStore.updates}
          styles={stores.appStyles.notifications}
          navigation={navigation}
        />
        {
          !!stores.notificationsStore.updates.length && (
            <Fab
              onPress={this._clearNotifications}
              icon="x"
              small
            />
          )
        }
      </>
    )
  }
}

const withStores = inject("stores")(observer(Updates));

export default withNavigationFocus(withStores);