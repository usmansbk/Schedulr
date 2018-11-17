import React, { PureComponent } from 'react';
import {
  Linking,
  Platform,
  View
} from 'react-native';
import moment from 'moment';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import PushNotification from 'react-native-push-notification';
import {
  Header,
  Body,
  Right,
  Left,
  Title,
} from 'native-base';
import Firebase from 'react-native-firebase';
import Tabs from '../Tabs';
import {
  updateServerSubscription
} from '../../../lib/updateSubscriptionStatus';
import IconButton from '../../common/IconButton';
import client from '../../../config/apolloClient';
import SETTINGS from '../../../graphql/localState/query/Settings';
import {
  MESSAGE_POSTED,
  EVENT_CREATED,
  EVENT_CANCELLED,
  EVENT_RESCHEDULED,
  EVENT_TYPE_CHANGED,
  EVENT_LOCATION_CHANGED
} from '../../../lib/pushActions';
import styles from './styles';

export default class Home extends PureComponent {

  componentDidMount = () => {
    Firebase.analytics().setCurrentScreen('home');
  }

  componentWillMount = () => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(this.navigate);
    }
    this._setup();
  }

  _setup = () => {
    const { settings: { pushNotification } } = client.readQuery({ query: SETTINGS });
    const { vibrate, sound, push } = pushNotification;
    OneSignal.init(Config.ONE_SIGNAL_ID);
    OneSignal.enableVibrate(vibrate);
    OneSignal.enableSound(sound);
    OneSignal.inFocusDisplaying(2);
    OneSignal.getPermissionSubscriptionState(updateServerSubscription);
    OneSignal.setSubscription(push);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('received', this.onReceived);
    PushNotification.configure({ onNotification: this.handlePushNotification });
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.onOpened);
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  handlePushNotification = (notification) => {
    const { data } = notification;
    const { id } = data;
    this.props.navigation.navigate('EventCard', { id });
  }

  onOpened = ({ notification }) => {
    const { payload } = notification;
    const { additionalData } = payload;
    const { id, action } = additionalData;
    this.pushNavigation(action, id);
  }

  _handleOpenURL = (event) => {
    this.navigate(event.url);
  }

  navigate = (url) => {
    const { navigate } = this.props.navigation;
    if (url) {
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('/')[1];
      switch(routeName) {
        case 'event':
          navigate('EventCard', { id });
          break;
        case 'group':
          navigate('GroupScreen', { id });
          break;
        default:
          break;
      }
    }
  }

  pushNavigation = (action, id) => {
    const { navigate } = this.props.navigation;
    switch(action) {
      case MESSAGE_POSTED:
      case EVENT_CREATED:
      case EVENT_CANCELLED:
      case EVENT_RESCHEDULED:
      case EVENT_TYPE_CHANGED:
      case EVENT_LOCATION_CHANGED:
        navigate('EventCard', { id });
        break;
      default:
        break;
    }
  }

  toggleDrawer = () => this.props.navigation.toggleDrawer();

  toggleSearch = () => this.props.navigation.navigate('Search');

  _getTitle = () => moment().format('dddd Do');

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Header hasTabs>
          <Left>
            <IconButton
              name="menu"
              type="Feather"
              onPress={this.toggleDrawer}
            />
          </Left>
          <Body>
            <Title>{this._getTitle()}</Title>
          </Body>
          <Right>
            <IconButton
              onPress={this.toggleSearch}
              name="search"
              type="Feather"
            />
          </Right>
        </Header>
        <Tabs />
      </View>
    )
  }
}