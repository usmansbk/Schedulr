import React from 'react';
import { Appbar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import OneSignal from 'react-native-onesignal';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Notifications';
import Filter from 'components/actionsheet/NotificationFilter';
import { capitalize } from 'lib/utils';

class Notifications extends React.Component {
  state = {
    loading: false
  };

  static getDerivedStateFromProps = (props) => {
    if (!props.navigation.isFocused()) {
      props.stores.notificationsStore.resetCounter(0);
      props.stores.notificationsStore.markAsSeen();
      return {
        loading: false 
      };
    } else {
      if (props.stores.appState.isConnected) {
        props.stores.notificationsStore.fetchNotifications();
        props.stores.appState.deltaSync();
      }
    };
    return null;
  };

  _onRefresh = () => this.setState({ loading: true });

  _onPressFilterButton = () => {
    this.Filter &&
      this.Filter.showActionSheet();
  };

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

  componentDidUpdate = () => OneSignal.clearOneSignalNotifications();

  render() {
    const {
      stores,
      navigation,
    } = this.props;

    return (
      <>
      <Appbar.Header style={stores.appStyles.styles.header} collapsable>
        <Appbar.Content
          title={I18n.get("NOTIFICATIONS_title")(capitalize(stores.notificationsStore.filter))}
          titleStyle={stores.appStyles.styles.headerColor}
        />
        <Appbar.Action
          onPress={this._onPressFilterButton}
          disabled={!stores.notificationsStore.allNotifications.length}
          color={stores.themeStore.colors.primary}
          size={24}
          icon={({ size, color }) => <Icon
            name="sliders"
            color={color}
            size={size}
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

export default inject("stores")(observer(Notifications))