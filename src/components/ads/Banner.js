import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { inject, observer } from 'mobx-react';
import env from 'config/env';

class Banner extends React.Component {
  shouldComponentUpdate = () => false;

  _onLoad = () => {

  };
  
  _onError = (error) => {
    console.log('Advert failed to load: ', error);
  };

  render() {
    const { large, medium_rect } = this.props;
    let size = BannerAdSize.SMART_BANNER;
    if (large) size = BannerAdSize.LARGE_BANNER;
    else if (medium_rect) size = BannerAdSize.MEDIUM_RECTANGLE;

    return <BannerAd
      unitId={TestIds.BANNER}
      size={size}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
        location: this.props.stores.locationStore.adLocation
      }}
      onAdLoaded={this._onLoad}
      onAdFailedToLoad={this._onError}
    />
  }
}

export default inject("stores")(observer(Banner));