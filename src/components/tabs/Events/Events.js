import React from 'react';
import { PushNotificationIOS } from 'react-native';
import Toast from 'react-native-simple-toast';
import PushNotification from 'react-native-push-notification';
import List from '../../lists/Events';
import FAB from '../../common/Fab';

export default class Events extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return ((nextProps.loading) !== this.props.loading) || (
      nextProps.events !== this.props.events
    );
  }

  componentDidMount = () => {
    PushNotification.configure({
      onNotification: notification => {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: false
    });
  }
  
  render() {
    if (this.props.error) {
      Toast.show(this.props.error.name, Toast.LONG);
    }
    return (
      <React.Fragment>
        <List
          loading={this.props.loading}
          events={this.props.events}
          hasPreviousEvents={Boolean(this.props.nextToken)}
          onRefresh={this.props.onRefresh}
        />
        <FAB
          icon="edit"
          onPress={() => this.props.navigation.navigate('NewEvent')}
        />
      </React.Fragment>
    )
  }
}

