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
  state = {
    loading: false
  };

  static getDerivedStateFromProps = (props) => {
    if (!props.navigation.isFocused()) {
      props.stores.notificationsStore.resetCounter(0);
      props.stores.notificationsStore.markAsSeen();
      OneSignal.clearOneSignalNotifications();
      return {
        loading: false 
      };
    } else {
      props.stores.notificationsStore.fetchNotifications();
      props.stores.appState.deltaSync();
    };
    return null;
  };

  _onRefresh = () => this.setState({ loading: true });

  _onPressFilterButton = () => {
    this.Filter &&
      this.Filter.showActionSheet();
  };

  shouldComponentUpdate = () => this.props.navigation.isFocused();

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
      <List
        navigation={navigation}
        refreshing={this.state.loading}
        onRefresh={this._onRefresh}
       />
      <Filter ref={ref => this.Filter = ref} />
      </>
    )
  }
}

export default inject("stores")(observer(withNavigationFocus(Notifications)))