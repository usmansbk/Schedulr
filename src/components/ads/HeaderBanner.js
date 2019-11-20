import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

export default class HeaderBanner extends React.Component {
  render() {
    return <BannerAd
      unitId={TestIds.BANNER}
      size={BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => console.log('Advert loaded')}
      onAdFailedToLoad={(error) => console.log('Advert failed to load: ', error)}
    />
  }
}