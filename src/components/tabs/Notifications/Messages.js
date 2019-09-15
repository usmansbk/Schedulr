import React from 'react';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Messages';

class Messages extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("NOTIFICATIONS_messagesTabLabel")
    };
  }

  render() {
    const { stores } = this.props;
    stores.notificationsStore.clearCommentsCounter();

    return (
      <List
        updates={stores.notificationsStore.comments}
        styles={stores.appStyles.notifications}
        navigation={this.props.navigation}
      />
    )
  }
}

export default inject("stores")(observer(Messages));