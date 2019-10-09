import React from 'react';
import { Appbar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
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
   
    stores.notificationsStore.resetCounter(0);

    return (
      <>
      <Appbar.Header style={stores.appStyles.styles.header} collapsable>
        <Appbar.Content
          title={I18n.get("NOTIFICATIONS_title")}
          titleStyle={stores.appStyles.styles.headerColor}
        />
        <Appbar.Action
          onPress={() => null}
          icon={() => <Icon
            name="sliders"
            color={stores.themeStore.colors.gray}
            size={24}
          />}
        />
      </Appbar.Header>
      <Divider />
      <List
        updates={stores.notificationsStore.updates}
        styles={stores.appStyles.notifications}
        navigation={navigation}
      />
      </>
    )
  }
}

export default inject("stores")(observer(Notifications));
