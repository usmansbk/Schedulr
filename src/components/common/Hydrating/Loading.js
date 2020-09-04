import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import colors from 'config/colors';

export default class Loading extends React.Component {
  render() {
    const style = this.props.dark ? styles.dark : styles.light;
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  light: {
    backgroundColor: colors.white,
  },
  dark: {
    backgroundColor: colors.black,
  },
});
