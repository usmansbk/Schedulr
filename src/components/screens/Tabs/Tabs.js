import React from 'react';
import { Icon } from 'native-base';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import GroupsTab from '../../Groups';
import EventsTab from '../../AllEvents';
import NotificationsTab from '../../Notifications';
import styles from './styles';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
}

export default class Tabs extends React.PureComponent {
  state = {
    index: 0,
    routes: [
      { key: 'events', icon: 'calendar' },
      { key: 'groups', icon: 'users' },
      { key: 'notifications', icon: 'bell' },
    ],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });

  _renderIcon = ({ route }) => (
    <Icon
      type="Feather"
      name={route.icon}
      fontSize={22}
      color="white"
      style={styles.icon}
    />
  );

  _renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      renderIcon={this._renderIcon}
      style={styles.tabbar}
    />
  );

  _renderScene = SceneMap({
    events: EventsTab,
    groups: GroupsTab,
    notifications: NotificationsTab
  })

  render() {
    return (
      <TabView
        lazy={true}
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        initialLayout={initialLayout}
        useNativeDriver
      />
    )
  }
}
