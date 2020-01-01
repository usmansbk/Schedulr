import React from 'react';
import { ImageBackground } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { inject, observer } from 'mobx-react';
import env from 'config/env';
import { getSeason } from 'lib/utils';

class Banner extends React.Component {
  shouldComponentUpdate = () => false;

  _onLoad = () => {

  };
  
  _onError = (error) => {
    console.log('Advert failed to load: ', error);
  };

  render() {
    const season = getSeason();
    const { large, medium_rect } = this.props;
    let Unit = __DEV__ ? TestIds : env;
    let size = BannerAdSize.BANNER;
    let unitId = Unit.BANNER;
    let style = {
      height: 50,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    };
    
    if (large) {
      size = BannerAdSize.LARGE_BANNER;
      unitId = Unit.BANNER;
      style = {
        height: 100,
        width: '100%',
        alignItems: 'center',
      };
    } else if (medium_rect) {
      size = BannerAdSize.MEDIUM_RECTANGLE;
      unitId = Unit.BANNER;
      style = {
        width: 300,
        height: 250
      };
    }
    if (season === 'winter') {
      source = require('../../assets/winter.jpeg');
    } else if (season === 'autumn') {
      source = require('../../assets/autumn.jpeg');
    } else if (season === 'spring') {
      source = require('../../assets/spring.jpeg');
    } else {
      source = require('../../assets/sunset.png');
    }

    return (
      <ImageBackground
        source={source}
        style={style}
       >
         {
           false && (
            <BannerAd
              unitId={unitId}
              size={size}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                location: this.props.stores.locationStore.adLocation,
                keywords: [
                  'scholarship',
                  'fashion',
                  'clothing',
                  'student',
                  'job',
                  'news',
                  'transport',
                  'ride'
                ]
              }}
              onAdLoaded={this._onLoad}
              onAdFailedToLoad={this._onError}
            />
           )
         }
      </ImageBackground>
    )
  }
}

export default inject("stores")(observer(Banner));