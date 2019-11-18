import React from 'react';
import { Appbar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import OneSignal from 'react-native-onesignal';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import { withNavigationFocus } from 'react-navigation';
import List from 'components/lists/Notifications';
import Filter from 'components/actionsheet/NotificationFilter';

class Notifications extends React.Component {

  _onPressFilterButton = () => {
    this.Filter &&
      this.Filter.showActionSheet();
  };

  shouldComponentUpdate = () => this.props.navigation.isFocused();

  componentDidUpdate = () => OneSignal.clearOneSignalNotifications();
  
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (!nextProps.navigation.isFocused()) {
      nextProps.stores.notificationsStore.resetCounter(0);
      nextProps.stores.notificationsStore.markAsSeen();
    }
    if (nextProps.navigation.isFocused()) {
      nextProps.stores.notificationsStore.fetchNotifications();
      nextProps.stores.appState.deltaSync();
    }
  };

  render() {
    const {
      stores,
      navigation,
    } = this.props;

    return (
      <>
      <Appbar.Header style={stores.appStyles.styles.header} collapsable>
        <Appbar.Content
          title={I18n.get("NOTIFICATIONS_title")}
          titleStyle={stores.appStyles.styles.headerColor}
        />
        <Appbar.Action
          onPress={this._onPressFilterButton}
          disabled={!stores.notificationsStore.allNotifications.length}
          icon={() => <Icon
            name="sliders"
            color={stores.themeStore.colors.gray}
            size={24}
          />}
        />
      </Appbar.Header>
      <Divider />
      <List navigation={navigation} />
      <Filter ref={ref => this.Filter = ref} />
      </>
    )
  }
}

export default inject("stores")(observer(withNavigationFocus(Notifications)))