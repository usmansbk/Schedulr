import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { inject, observer } from 'mobx-react';
import env from 'config/env';

class Banner extends React.Component {
  shouldComponentUpdate = () => false;

  render() {
    const { large } = this.props;
    return <BannerAd
      unitId={TestIds.BANNER}
      size={large ? BannerAdSize.LARGE_BANNER : BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
        location: this.props.stores.locationStore.adLocation
      }}
      onAdLoaded={() => console.log('Advert loaded')}
      onAdFailedToLoad={(error) => console.log('Advert failed to load: ', error)}
    />
  }
}

export default inject("stores")(observer(Banner));