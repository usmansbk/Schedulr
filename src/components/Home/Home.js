import React from 'react';
import { View } from 'react-native';
import { Appbar, BottomNavigation, Text } from 'react-native-paper';
import moment from 'moment';
import styles from './styles';

const MusicRoute = () => <Text>Events</Text>;

const AlbumsRoute = () => <Text>Groups</Text>;

const RecentsRoute = () => <Text>Starred</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

export default class Home extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'events', title: 'Events', icon: 'date-range'},
      { key: 'groups', title: 'Groups', icon: 'group-work' },
      { key: 'starred', title: 'Starred', icon: 'star-border'},
      { key: 'notifications', title: 'Notifications', icon: 'notifications-none' }
    ],
  };

  _getTitle = () => moment().format('dddd, Do');

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    events: MusicRoute,
    groups: AlbumsRoute,
    starred: RecentsRoute,
    notifications: NotificationsRoute
  });

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Action icon="menu" />
          <Appbar.Content title={this._getTitle()}/>
          <Appbar.Action icon="today" />
          <Appbar.Action icon="search" />
        </Appbar.Header>
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </View>
    )
  }
}