import React from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import colors from 'config/colors';

export default class Loading extends React.Component {
   
  componentDidMount = async () => {
    changeNavigationBarColor(colors.primary_light, true);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.primary_light}
          barStyle="light-content"
        />
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary_light
  },
});