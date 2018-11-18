import React from 'react';
import { View } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import moment from 'moment';
import EventsRoute from '../../routes/Events';
import GroupsRoute from '../../routes/Groups';
import AccountRoute from '../../routes/Account';
import StarredRoute from '../../routes/Starred';
import styles, { activeColor } from './styles';


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
    events: EventsRoute,
    groups: GroupsRoute,
    starred: StarredRoute,
    account: AccountRoute
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