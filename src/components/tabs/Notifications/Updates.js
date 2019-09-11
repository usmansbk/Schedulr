import React from 'react';
import Alert from 'components/dialogs/Alert';
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

  state = {
    showClearWarning: false
  };

  _hideDialog = () => this.setState({ showClearWarning: false });

  _clearNotifications = () => this.setState({ showClearWarning: true });

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
        <Alert
          title={I18n.get("ALERT_clearNotifications")}
          visible={this.state.showClearWarning}
          handleDismiss={this._hideDialog}
          confirmText={I18n.get("BUTTON_ok")}
          onConfirm={stores.notificationsStore.clearNotifications}
        />
      </>
    )
  }
}

const withStores = inject("stores")(observer(Updates));

export default withNavigationFocus(withStores);