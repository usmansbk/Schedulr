import React from 'react';
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

  shouldComponentUpdate = (nextProps) => {
    return nextProps.navigation.isFocused();
  };

  _onPress = () => {
    // clear notifications
  }

  render() {
    const { stores, navigation, updates=[] } = this.props;

    return (
      <>
      <List
        updates={updates}
        styles={stores.appStyles.notifications}
        navigation={navigation}
      />
      {
        Boolean(updates.length) && (
          <Fab
            small
            icon="clear-all"
            onPress={this._onPress}
          />
        )
      }
      </>
    )
  }
}

const withStores = inject("stores")(observer(Updates));

export default withNavigationFocus(withStores);