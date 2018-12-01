import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  TabView,
  TabBar,
} from 'react-native-tab-view';
import Events from './Events';
import Groups from './Groups';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  container: {flex: 1},
  barStyle: {
    backgroundColor: 'white',
    elevation: 2
  },
  indicatorStyle: {
    backgroundColor: colors.primary_light
  },
  label: {
    color: colors.black
  }
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class Tab extends React.Component {
  static title = "Search bar";
  static backgroundColor = colors.primary_light;
  static appbarElevation = 2;

  state = {
    index: 0,
    routes: [
      { key: 'groups', title: 'Groups' },
      { key: 'events', title: 'Events' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });
  _renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.barStyle}
      labelStyle={styles.label}
    />
  );
  _renderScene = ({ route }) => {
    const { query } = this.props;
    switch(route.key) {
      case 'groups':
        return <Groups query={query} />;
      case 'events':
        return <Events query={query} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        style={[styles.container]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    )
  }
}
