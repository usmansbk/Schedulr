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
    let size = BannerAdSize.BANNER;
    let unitId = env.BANNER;
    let source = require('../../assets/camp.png');
    let style = {
      height: 50,
      width: 320
    };
    if (large) {
      source = require('../../assets/sunset.png');
      size = BannerAdSize.LARGE_BANNER;
      unitId = env.LARGE_BANNER;
      style = {
        width: 320,
        height: 100
      };
    } else if (medium_rect) {
      source = require('../../assets/beach.png');
      size = BannerAdSize.MEDIUM_RECTANGLE;
      unitId = env.MEDIUM_RECT_BANNER;
      style = {
        width: 300,
        height: 250
      };
    }
    if (__DEV__) {
      source = {
        uri:`https://source.unsplash.com/random/${style.width}x${style.height}`,
      };
    }

    return (
      <ImageBackground
        source={source}
        style={style}
       >
      <BannerAd
        unitId={unitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
          location: this.props.stores.locationStore.adLocation,
          keywords: [
            'scholarship',
            'laptop',
            'phone',
            'fashion',
            'clothing',
            'student',
            'job',
            'bet'
          ]
        }}
        onAdLoaded={this._onLoad}
        onAdFailedToLoad={this._onError}
      />
      </ImageBackground>
    )
  }
}

export default inject("stores")(observer(Banner));