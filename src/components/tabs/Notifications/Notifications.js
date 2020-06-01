import React from 'react';
import { Appbar } from 'react-native-paper';
import Icon from 'components/common/Icon';
import { I18n } from 'aws-amplify';
import { withNavigationFocus } from 'react-navigation';
import List from 'components/lists/Notifications';
import Filter from 'components/actionsheet/NotificationFilter';

class Notifications extends React.Component {
  state = {
    isFocused: false
  };

  static getDerivedStateFromProps = (props) => {
    if (!props.isFocused) {
      return {
        isFocused: false
      };
    } else {
      return {
        isFocused: true
      };
    }
  };

  _onRefresh = () => this.props.fetchUpdates();

  _onPressFilterButton = () => {
    this.Filter &&
      this.Filter.showActionSheet();
  };

  componentDidMount = () => {
    this.props.fetchUpdates();
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.isFocused && !this.props.isFocused) {
      if (this.props.hasNotification) {
        this.props.clearIndicator();
      }
    }
    if (!prevState.isFocused && this.props.isConnected && this.props.isFocused) {
      this.props.fetchUpdates();
    }
  };

  render() {
    const {
      navigation,
      title,
      styles,
      color,
      allNotifications
    } = this.props;

    return (
      <>
      <Appbar.Header style={styles.header} collapsable>
        <Appbar.Content
          title={I18n.get("NOTIFICATIONS_title")(title)}
          titleStyle={styles.headerColor}
        />
        <Appbar.Action
          onPress={this._onPressFilterButton}
          disabled={!allNotifications.length}
          color={color}
          size={24}
          icon={({ size, color }) => <Icon
            name="filter"
            color={color}
            size={size}
          />}
        />
      </Appbar.Header>
      <List
        navigation={navigation}
        onRefresh={this._onRefresh}
       />
      <Filter ref={ref => this.Filter = ref} />
      </>
    )
  }
}

export default withNavigationFocus(Notifications);