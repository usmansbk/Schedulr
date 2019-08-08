import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Messages';

class Messages extends React.Component {

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("NOTIFICATIONS_messagesTabLabel")
    };
  }

  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };

  render() {
    const { stores } = this.props;

    return (
      <>
      <List
        styles={stores.appStyles.notifications}
        navigation={this.props.navigation}
      />
      </>
    )
  }
}

const withStores = inject("stores")(observer(Messages));

export default withNavigationFocus(withStores);