import React from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { inject, observer } from 'mobx-react/native';

@inject('stores')
@observer
export default class Loading extends React.Component {
   
  componentDidMount = async () => {
    const { stores } = this.props;
    const colors = stores.themeStore.colors;
    try {
      await changeNavigationBarColor(colors.bg, !stores.settingsStore.dark);
    } catch (error) {}
  };

  render() {
    const { stores } = this.props;

    return (
      <View style={stores.appStyles.loading.container}>
        <StatusBar
          backgroundColor={stores.themeStore.colors.light_gray_2}
          barStyle={stores.settingsStore.dark ? "light-content" : "dark-content"}
        />
        <ActivityIndicator size="large" color={stores.themeStore.colors.primary} />
      </View>
    )
  }
}