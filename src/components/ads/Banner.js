import React from 'react';
import { ImageBackground } from 'react-native';
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
    let source = require('../../assets/calendar.png');
    let style = {
      height: 54,
      alignItems: 'center',
      justifyContent: 'center'
    };
    if (large) {
      size = BannerAdSize.LARGE_BANNER;
      style = {
        width: 320,
        height: 100
      };
    } else if (medium_rect) {
      size = BannerAdSize.MEDIUM_RECTANGLE;
      style = {
        width: 300,
        height: 250
      };
    }

    return (
      <ImageBackground
        source={source}
        style={style}
       >
      <BannerAd
        unitId={TestIds.BANNER}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
          location: this.props.stores.locationStore.adLocation
        }}
        onAdLoaded={this._onLoad}
        onAdFailedToLoad={this._onError}
      />
      </ImageBackground>
    )
  }
}

export default inject("stores")(observer(Banner));