import React from 'react';
import { withApollo } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Updates';
import { listNotifications } from 'api/fragments';

class Updates extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("NOTIFICATIONS_updatesTabLabel")
    };
  }

  get updates() {
    const { client, stores } = this.props;
    let notifications = [];
    try {
      user = client.readFragment({
        fragment: listNotifications,
        id: `User:${stores.appState.userId}`
      });
      notifications = user.notifications;
      stores.appState.setNotificationsIndicator(false);
    } catch(error) {
      console.log(error);
    }
    return notifications;
  }

  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };
  
  render() {
    const { stores, navigation } = this.props;

    return (
      <List
        updates={this.updates}
        styles={stores.appStyles.notifications}
        navigation={navigation}
      />
    )
  }
}

const withClient = withApollo(Updates);

const withStores = inject("stores")(observer(withClient));

export default withNavigationFocus(withStores);