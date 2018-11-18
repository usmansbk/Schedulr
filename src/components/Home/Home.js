import React from 'react';
import { View } from 'react-native';
import { Appbar, BottomNavigation, Text } from 'react-native-paper';
import Events from '../Events';
import Groups from '../Groups';
import moment from 'moment';
import styles, { activeColor } from './styles';

const RecentsRoute = () => <Text>Starred</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

export default class Home extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'events', title: 'Events', icon: 'date-range'},
      { key: 'groups', title: 'Groups', icon: 'group-work' },
      { key: 'starred', title: 'Starred', icon: 'star-border'},
      { key: 'account', title: 'Account', icon: 'menu' }
    ],
  };

  _getTitle = () => moment().format('dddd, Do');

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    events: Events,
    groups: Groups,
    starred: RecentsRoute,
    account: NotificationsRoute
  });

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title={this._getTitle()}/>
          <Appbar.Action icon="notifications-none" />
          <Appbar.Action icon="search" />
        </Appbar.Header>
        <BottomNavigation
          activeColor={activeColor}
          barStyle={styles.barStyle}
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </View>
    )
  }
}