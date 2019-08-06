import React from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react';

class Loading extends React.Component {
   
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

export default inject("stores")(observer(Loading));
