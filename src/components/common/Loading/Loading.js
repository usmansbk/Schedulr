import React from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import Image from 'react-native-fast-image';
import { inject, observer } from 'mobx-react';

class Loading extends React.Component {
   
  render() {
    const { stores, loading } = this.props;

    return (
      <View style={stores.appStyles.loading.container}>
        <StatusBar
          backgroundColor={stores.themeStore.colors.light_gray_2}
          barStyle={stores.settingsStore.dark ? "light-content" : "dark-content"}
        />
        { loading && <ActivityIndicator size="large" color={stores.themeStore.colors.primary} /> }
        <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/food-delivery.png')} />
      </View>
    )
  }
}

export default inject("stores")(observer(Loading));
