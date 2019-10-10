import React from 'react';
import { Appbar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Notifications';
import Filter from 'components/actionsheet/NotificationFilter';

export default class Notifications extends React.Component {

  _onPressFilterButton = () => {
    this.Filter &&
      this.Filter.showActionSheet();
  };

  shouldComponentUpdate = () => this.props.navigation.isFocused();
 
  render() {
    const { stores, navigation, onRefresh, loading } = this.props;
    stores.notificationsStore.resetCounter(0);

    return (
      <>
      <Appbar.Header style={stores.appStyles.styles.header} collapsable>
        <Appbar.Content
          title={I18n.get("NOTIFICATIONS_title")}
          titleStyle={stores.appStyles.styles.headerColor}
        />
        <Appbar.Action
          onPress={this._onPressFilterButton}
          disabled={false && !stores.notificationsStore.allNotifications.length}
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
        onRefresh={onRefresh}
        loading={loading}
      />
      <Filter
        ref={ref => this.Filter = ref}
      />
      </>
    )
  }
}
